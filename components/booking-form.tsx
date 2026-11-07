'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { bookingServiceMap, bookingServices, type BookingLang, type ServiceCategory } from '@/lib/booking-services';

type Lang = BookingLang;
type SubmitState = { status: 'idle' } | { status: 'loading' } | { status: 'success'; code: string } | { status: 'error'; message: string };

const formCopy = {
  ja: {
    name: 'お名前', namePlaceholder: '例：山田 花子', contactMethod: 'ご連絡方法', select: '選択してください', phone: '電話番号', contact: 'LINE ID またはご連絡先', contactPlaceholder: 'ID・電話番号をご入力ください', adults: '大人', children: 'お子様', gender: '性別', female: '女性', male: '男性', mixed: '男女混合', other: 'その他', date: 'ご希望日', time: 'ご希望時間', service: 'ご希望メニュー', duration: '施術時間', request: 'ご要望・ご質問', requestPlaceholder: 'お身体の状態、送迎やお荷物についてなど', consent: '入力内容を確認し、スタッフから予約確認の連絡を受けることに同意します。', privacy: '予約対応のため、入力した個人情報の収集・利用に同意します。', notConfirmed: '送信時点では予約確定ではありません。', send: '予約リクエストを送る', sending: '送信しています', note: '当日予約可能 · 変更は12時間前まで · 3か国語対応', agreeError: '予約内容と個人情報の取り扱いに同意してください。', scheduleError: 'フェイシャル・メディカルエステは月～土曜日10:00～19:00にご予約いただけます。', submitError: '予約の送信に失敗しました。', retry: '時間をおいて、もう一度お試しください。', received: 'REQUEST RECEIVED', successTitle: 'ご予約リクエストを承りました', successBody: '空き状況を確認後、スタッフよりご連絡いたします。こちらは予約確定ではありません。', code: '受付番号', another: '別の予約を送る', consultation: '要相談', categories: { body: 'ボディ＆ウェルネス', facial: 'フェイシャル＆K-Beauty', medical: 'メディカルエステ' }, facialHours: 'フェイシャル・メディカル：月～土 10:00–19:00', bodyHours: 'ボディ：毎日 10:00–23:00',
  },
  ko: {
    name: '성함', namePlaceholder: '예: 김소피아', contactMethod: '연락 방법', select: '선택해 주세요', phone: '전화번호', contact: '카카오·LINE ID 또는 연락처', contactPlaceholder: '아이디 또는 전화번호를 입력해 주세요', adults: '성인', children: '아동', gender: '성별', female: '여성', male: '남성', mixed: '혼성', other: '기타', date: '희망 날짜', time: '희망 시간', service: '희망 프로그램', duration: '이용 시간', request: '요청 사항·문의', requestPlaceholder: '몸 상태, 픽업 또는 짐 보관 문의 등을 적어 주세요', consent: '입력 내용을 확인했으며 직원의 예약 확인 연락에 동의합니다.', privacy: '예약 응대를 위해 입력한 개인정보의 수집·이용에 동의합니다.', notConfirmed: '폼 제출만으로 예약이 확정되지는 않습니다.', send: '예약 신청 보내기', sending: '전송 중입니다', note: '당일 예약 가능 · 변경은 12시간 전까지 · 3개 국어 상담', agreeError: '예약 확인 및 개인정보 안내에 동의해 주세요.', scheduleError: '페이셜·메디컬 에스테틱은 월–토요일 10:00–19:00에 예약할 수 있습니다.', submitError: '예약 신청을 전송하지 못했습니다.', retry: '잠시 후 다시 시도해 주세요.', received: 'REQUEST RECEIVED', successTitle: '예약 신청이 접수되었습니다', successBody: '가능 시간을 확인한 후 직원이 연락드립니다. 아직 예약 확정 전입니다.', code: '접수번호', another: '다른 예약 보내기', consultation: '상담 필요', categories: { body: '바디 & 웰니스', facial: '페이셜 & K-Beauty', medical: '메디컬 에스테틱' }, facialHours: '페이셜·메디컬: 월–토 10:00–19:00', bodyHours: '바디: 매일 10:00–23:00',
  },
  en: {
    name: 'Name', namePlaceholder: 'e.g. Sophia Kim', contactMethod: 'Contact method', select: 'Please select', phone: 'Phone', contact: 'LINE ID or contact details', contactPlaceholder: 'Enter your ID or phone number', adults: 'Adults', children: 'Children', gender: 'Gender', female: 'Female', male: 'Male', mixed: 'Mixed group', other: 'Other', date: 'Preferred date', time: 'Preferred time', service: 'Preferred program', duration: 'Duration', request: 'Requests or questions', requestPlaceholder: 'Tell us about your condition, transport, or luggage needs', consent: 'I have checked my details and agree to be contacted for booking confirmation.', privacy: 'I agree to the collection and use of my details for this reservation.', notConfirmed: 'Submitting this form does not confirm your reservation.', send: 'Send reservation request', sending: 'Sending', note: 'Same-day booking · Changes 12 hours ahead · Trilingual support', agreeError: 'Please agree to the booking and privacy notice.', scheduleError: 'Facial and medical-aesthetic bookings are available Monday–Saturday, 10:00–19:00.', submitError: 'We could not send your reservation request.', retry: 'Please wait a moment and try again.', received: 'REQUEST RECEIVED', successTitle: 'We received your reservation request', successBody: 'Our team will check availability and contact you. Your reservation is not yet confirmed.', code: 'Reference', another: 'Send another request', consultation: 'Consultation', categories: { body: 'Body & Wellness', facial: 'Facial & K-Beauty', medical: 'Medical Aesthetic' }, facialHours: 'Facial & medical: Mon–Sat 10:00–19:00', bodyHours: 'Body: daily 10:00–23:00',
  },
};

const contactCopy = {
  ja: { label: 'KakaoTalk・Instagram・FacebookのIDまたは連絡先', placeholder: 'ご利用のIDまたはアカウント名をご入力ください' },
  ko: { label: '카카오톡·인스타그램·페이스북 아이디 또는 연락처', placeholder: '사용하실 아이디 또는 계정명을 입력해 주세요' },
  en: { label: 'KakaoTalk, Instagram, or Facebook ID', placeholder: 'Enter the ID or account name we should contact' },
};

const dateLocales: Record<Lang, string> = { ja: 'ja-JP', ko: 'ko-KR', en: 'en-US' };
const datePartCopy = {
  ja: { year: '年', month: '月', day: '日' },
  ko: { year: '연도', month: '월', day: '일' },
  en: { year: 'Year', month: 'Month', day: 'Day' },
};

function manilaToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

function timeSlots(start: string, end: string) {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  const slots: string[] = [];
  for (let minute = startHour * 60 + startMinute; minute <= endHour * 60 + endMinute; minute += 30) {
    slots.push(`${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`);
  }
  return slots;
}

function validFacialSchedule(date: string, time: string) {
  if (!date || !time) return true;
  const day = new Date(`${date}T12:00:00+08:00`).getUTCDay();
  return day !== 0 && time >= '10:00' && time <= '19:00';
}

export function BookingForm({ lang }: { lang: Lang }) {
  const [agreed, setAgreed] = useState(false);
  const [contactMethod, setContactMethod] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [dateYear, setDateYear] = useState('');
  const [dateMonth, setDateMonth] = useState('');
  const [dateDay, setDateDay] = useState('');
  const [time, setTime] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });
  const minDate = useMemo(manilaToday, []);
  const t = formCopy[lang];
  const selectedService = bookingServiceMap.get(serviceId);
  const categories = t.categories as Record<ServiceCategory, string>;
  const isFacialSchedule = selectedService?.category === 'facial' || selectedService?.category === 'medical';
  const availableTimes = useMemo(() => timeSlots('10:00', isFacialSchedule ? '19:00' : '23:00'), [isFacialSchedule]);
  const firstYear = Number(minDate.slice(0, 4));
  const availableYears = useMemo(() => Array.from({ length: 3 }, (_, index) => String(firstYear + index)), [firstYear]);
  const availableDays = useMemo(() => dateYear && dateMonth ? new Date(Number(dateYear), Number(dateMonth), 0).getDate() : 31, [dateYear, dateMonth]);

  useEffect(() => {
    const handleContact = (event: Event) => {
      const method = (event as CustomEvent<string>).detail;
      if (method) setContactMethod(method);
    };
    window.addEventListener('healing-select-contact', handleContact);
    return () => window.removeEventListener('healing-select-contact', handleContact);
  }, []);

  function handleServiceChange(next: string) {
    setServiceId(next);
    setDuration(bookingServiceMap.get(next)?.durations[0] ?? '');
    setTime('');
  }

  function handleDatePartChange(part: 'year' | 'month' | 'day', value: string) {
    const nextYear = part === 'year' ? value : dateYear;
    const nextMonth = part === 'month' ? value : dateMonth;
    let nextDay = part === 'day' ? value : dateDay;
    if (nextYear && nextMonth && nextDay) {
      const maximumDay = new Date(Number(nextYear), Number(nextMonth), 0).getDate();
      if (Number(nextDay) > maximumDay) nextDay = String(maximumDay);
    }
    setDateYear(nextYear);
    setDateMonth(nextMonth);
    setDateDay(nextDay);
    setDate(nextYear && nextMonth && nextDay ? `${nextYear}-${nextMonth.padStart(2, '0')}-${nextDay.padStart(2, '0')}` : '');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agreed) return setSubmitState({ status: 'error', message: t.agreeError });
    if (isFacialSchedule && !validFacialSchedule(date, time)) return setSubmitState({ status: 'error', message: t.scheduleError });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setSubmitState({ status: 'loading' });
    try {
      const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, agreed: true }) });
      const data = (await response.json()) as { ok?: boolean; code?: string; error?: string };
      if (!response.ok || !data.ok || !data.code) throw new Error(data.error || t.submitError);
      setSubmitState({ status: 'success', code: data.code });
      form.reset();
      setAgreed(false); setContactMethod(''); setServiceId(''); setDuration(''); setDate(''); setDateYear(''); setDateMonth(''); setDateDay(''); setTime('');
    } catch (error) {
      setSubmitState({ status: 'error', message: error instanceof Error ? error.message : t.retry });
    }
  }

  if (submitState.status === 'success') return <div className="flex min-h-[420px] flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center rounded-full bg-[#e2eadf] text-[#35513a]"><CheckCircle2 className="size-8" /></span><p className="mt-6 text-xs font-semibold tracking-[0.2em] text-[#9a7446]">{t.received}</p><h3 className="mt-3 font-heading text-3xl">{t.successTitle}</h3><p className="mt-4 max-w-md text-sm leading-7 text-[#746c63]">{t.successBody}</p><p className="mt-5 rounded-full bg-[#ede5d8] px-5 py-2 text-sm font-semibold tracking-wider">{t.code} {submitState.code}</p><Button type="button" variant="ghost" className="mt-6" onClick={() => setSubmitState({ status: 'idle' })}>{t.another}<ArrowRight className="ml-2 size-4" /></Button></div>;

  const inputClass = 'mt-2 h-12 border-[#d8cdbd] bg-white';
  return <form onSubmit={handleSubmit} className="mt-7 space-y-4">
    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium">{t.name} <span className="text-[#a05c4c]">*</span><Input name="name" required maxLength={80} className={inputClass} placeholder={t.namePlaceholder} /></label><label className="block text-sm font-medium">{t.contactMethod} <span className="text-[#a05c4c]">*</span><NativeSelect name="contactMethod" value={contactMethod} onChange={event => setContactMethod(event.target.value)} required className="mt-2 w-full"><NativeSelectOption value="">{t.select}</NativeSelectOption><NativeSelectOption value="KakaoTalk">KakaoTalk</NativeSelectOption><NativeSelectOption value="Instagram">Instagram</NativeSelectOption><NativeSelectOption value="Facebook">Facebook</NativeSelectOption></NativeSelect></label></div>
    <label className="block text-sm font-medium">{contactCopy[lang].label} <span className="text-[#a05c4c]">*</span><Input name="contact" required maxLength={120} className={inputClass} placeholder={contactCopy[lang].placeholder} /></label>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3"><label className="block text-sm font-medium">{t.adults} <span className="text-[#a05c4c]">*</span><Input name="adults" required type="number" min="1" max="20" defaultValue="1" className={inputClass} /></label><label className="block text-sm font-medium">{t.children}<Input name="children" type="number" min="0" max="20" defaultValue="0" className={inputClass} /></label><label className="col-span-2 block text-sm font-medium sm:col-span-1">{t.gender} <span className="text-[#a05c4c]">*</span><NativeSelect name="gender" required className="mt-2 w-full"><NativeSelectOption value="">{t.select}</NativeSelectOption><NativeSelectOption value="female">{t.female}</NativeSelectOption><NativeSelectOption value="male">{t.male}</NativeSelectOption><NativeSelectOption value="mixed">{t.mixed}</NativeSelectOption><NativeSelectOption value="other">{t.other}</NativeSelectOption></NativeSelect></label></div>
    <div className="grid gap-4 sm:grid-cols-2"><fieldset className="block text-sm font-medium"><legend>{t.date} <span className="text-[#a05c4c]">*</span></legend><input type="hidden" name="preferredDate" value={date} /><div className="mt-2 grid grid-cols-3 gap-2"><NativeSelect value={dateYear} onChange={event => handleDatePartChange('year', event.target.value)} required aria-label={datePartCopy[lang].year}><NativeSelectOption value="">{datePartCopy[lang].year}</NativeSelectOption>{availableYears.map(year => <NativeSelectOption key={year} value={year}>{lang === 'en' ? year : `${year}${lang === 'ja' ? '年' : '년'}`}</NativeSelectOption>)}</NativeSelect><NativeSelect value={dateMonth} onChange={event => handleDatePartChange('month', event.target.value)} required aria-label={datePartCopy[lang].month}><NativeSelectOption value="">{datePartCopy[lang].month}</NativeSelectOption>{Array.from({ length: 12 }, (_, index) => String(index + 1)).map(month => <NativeSelectOption key={month} value={month}>{lang === 'en' ? new Intl.DateTimeFormat(dateLocales[lang], { month: 'short' }).format(new Date(2024, Number(month) - 1, 1)) : `${month}${lang === 'ja' ? '月' : '월'}`}</NativeSelectOption>)}</NativeSelect><NativeSelect value={dateDay} onChange={event => handleDatePartChange('day', event.target.value)} required aria-label={datePartCopy[lang].day}><NativeSelectOption value="">{datePartCopy[lang].day}</NativeSelectOption>{Array.from({ length: availableDays }, (_, index) => String(index + 1)).map(day => <NativeSelectOption key={day} value={day}>{lang === 'en' ? day : `${day}${lang === 'ja' ? '日' : '일'}`}</NativeSelectOption>)}</NativeSelect></div></fieldset><label className="block text-sm font-medium">{t.time} <span className="text-[#a05c4c]">*</span><NativeSelect name="preferredTime" value={time} onChange={event => setTime(event.target.value)} required className="mt-2 w-full"><NativeSelectOption value="">{t.select}</NativeSelectOption>{availableTimes.map(slot => <NativeSelectOption key={slot} value={slot}>{slot}</NativeSelectOption>)}</NativeSelect></label></div>
    <p className="text-xs text-[#7c746b]">{isFacialSchedule ? t.facialHours : t.bodyHours}</p>
    <div className="grid gap-4 sm:grid-cols-[1fr_150px]"><label className="block text-sm font-medium">{t.service} <span className="text-[#a05c4c]">*</span><NativeSelect name="service" value={serviceId} onChange={event => handleServiceChange(event.target.value)} required className="mt-2 w-full"><NativeSelectOption value="">{t.select}</NativeSelectOption>{(['body', 'facial', 'medical'] as ServiceCategory[]).map(category => <NativeSelectOptGroup key={category} label={categories[category]}>{bookingServices.filter(service => service.category === category).map(service => <NativeSelectOption key={service.id} value={service.id}>{service.label[lang]}</NativeSelectOption>)}</NativeSelectOptGroup>)}</NativeSelect></label><label className="block text-sm font-medium">{t.duration} <span className="text-[#a05c4c]">*</span><NativeSelect name="duration" value={duration} onChange={event => setDuration(event.target.value)} required disabled={!selectedService} className="mt-2 w-full"><NativeSelectOption value="">{t.select}</NativeSelectOption>{selectedService?.durations.map(item => <NativeSelectOption key={item} value={item}>{item === 'consultation' ? t.consultation : item.replace('min', ' min')}</NativeSelectOption>)}</NativeSelect></label></div>
    <label className="block text-sm font-medium">{t.request}<Textarea name="notes" maxLength={1000} className="mt-2 min-h-24 border-[#d8cdbd] bg-white" placeholder={t.requestPlaceholder} /></label>
    <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[#eee7dc] p-4 text-sm leading-6"><Checkbox checked={agreed} onCheckedChange={checked => setAgreed(Boolean(checked))} className="mt-1" /><span>{t.consent}<span className="mt-1 block text-xs text-[#766e66]">{t.privacy} <a href="#privacy" className="underline underline-offset-2">Privacy</a></span><span className="block text-xs text-[#766e66]">{t.notConfirmed}</span></span></label>
    {submitState.status === 'error' && <p role="alert" className="rounded-xl bg-[#f7e5e1] px-4 py-3 text-sm text-[#8b4035]">{submitState.message}</p>}
    <Button type="submit" disabled={submitState.status === 'loading'} className="h-12 w-full rounded-xl bg-[#2f3d32] text-white hover:bg-[#415344]">{submitState.status === 'loading' ? <><Loader2 className="mr-2 size-4 animate-spin" />{t.sending}</> : <><Send className="mr-2 size-4" />{t.send}</>}</Button><p className="text-center text-xs leading-5 text-[#7c746b]">{t.note}</p>
  </form>;
}
