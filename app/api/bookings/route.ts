import { env } from 'cloudflare:workers';
import { bookingServiceMap, isAllowedDuration } from '@/lib/booking-services';

export const runtime = 'edge';

const contactMethods = new Set(['KakaoTalk', 'Instagram', 'Facebook']);
const genders = new Set(['female', 'male', 'mixed', 'other']);

type BookingInput = {
  name?: unknown;
  contactMethod?: unknown;
  contact?: unknown;
  adults?: unknown;
  children?: unknown;
  gender?: unknown;
  preferredDate?: unknown;
  preferredTime?: unknown;
  service?: unknown;
  duration?: unknown;
  notes?: unknown;
  agreed?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function bookingCode() {
  const date = new Date().toISOString().slice(2, 10).replaceAll('-', '');
  const token = crypto.randomUUID().replaceAll('-', '').slice(0, 6).toUpperCase();
  return `HMS-${date}-${token}`;
}

function validSchedule(service: string, date: string, time: string) {
  const selected = bookingServiceMap.get(service);
  if (!selected) return false;
  if (!/^\d{2}:(00|30)$/.test(time)) return false;
  if (selected.category === 'body') return time >= '10:00' && time <= '23:00';
  const day = new Date(`${date}T12:00:00+08:00`).getUTCDay();
  return day !== 0 && time >= '10:00' && time <= '19:00';
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as BookingInput;
    const name = cleanText(input.name, 80);
    const contactMethod = cleanText(input.contactMethod, 20);
    const contact = cleanText(input.contact, 120);
    const gender = cleanText(input.gender, 20);
    const preferredDate = cleanText(input.preferredDate, 10);
    const preferredTime = cleanText(input.preferredTime, 5);
    const service = cleanText(input.service, 100);
    const duration = cleanText(input.duration, 10);
    const notes = cleanText(input.notes, 1000);
    const adults = Number(input.adults);
    const children = Number(input.children ?? 0);

    const valid =
      name.length > 0 &&
      contact.length > 0 &&
      contactMethods.has(contactMethod) &&
      genders.has(gender) &&
      bookingServiceMap.has(service) &&
      isAllowedDuration(service, duration) &&
      /^\d{4}-\d{2}-\d{2}$/.test(preferredDate) &&
      /^\d{2}:(00|30)$/.test(preferredTime) &&
      Number.isInteger(adults) &&
      adults >= 1 &&
      adults <= 20 &&
      Number.isInteger(children) &&
      children >= 0 &&
      children <= 20 &&
      validSchedule(service, preferredDate, preferredTime) &&
      input.agreed === true;

    if (!valid) {
      return Response.json(
        { ok: false, error: '入力内容をご確認のうえ、もう一度お試しください。' },
        { status: 400 },
      );
    }

    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY NOT NULL,
        booking_code TEXT NOT NULL UNIQUE,
        created_at INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        name TEXT NOT NULL,
        contact_method TEXT NOT NULL,
        contact TEXT NOT NULL,
        adults INTEGER NOT NULL,
        children INTEGER NOT NULL DEFAULT 0,
        gender TEXT NOT NULL,
        preferred_date TEXT NOT NULL,
        preferred_time TEXT NOT NULL,
        service TEXT NOT NULL,
        duration TEXT NOT NULL,
        notes TEXT
      )`,
    ).run();

    const id = crypto.randomUUID();
    const code = bookingCode();

    await env.DB.prepare(
      `INSERT INTO bookings (
        id, booking_code, created_at, status, name, contact_method, contact,
        adults, children, gender, preferred_date, preferred_time, service, duration, notes
      ) VALUES (?, ?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        id,
        code,
        Date.now(),
        name,
        contactMethod,
        contact,
        adults,
        children,
        gender,
        preferredDate,
        preferredTime,
        service,
        duration,
        notes || null,
      )
      .run();

    const notificationWebhook = (env as unknown as { BOOKING_NOTIFICATION_WEBHOOK_URL?: string }).BOOKING_NOTIFICATION_WEBHOOK_URL;
    if (notificationWebhook) {
      try {
        const selected = bookingServiceMap.get(service);
        const response = await fetch(notificationWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'booking.created',
            bookingCode: code,
            submittedAt: new Date().toISOString(),
            customer: { name, contactMethod, contact, adults, children, gender },
            reservation: {
              preferredDate,
              preferredTime,
              serviceId: service,
              serviceName: selected?.label.en ?? service,
              duration,
              notes,
            },
          }),
        });
        if (!response.ok) console.error('Booking notification webhook failed', response.status);
      } catch (notificationError) {
        console.error('Booking notification webhook failed', notificationError);
      }
    }

    return Response.json({ ok: true, code }, { status: 201 });
  } catch (error) {
    console.error('Booking submission failed', error);
    return Response.json(
      { ok: false, error: '送信できませんでした。時間をおいて、もう一度お試しください。' },
      { status: 500 },
    );
  }
}
