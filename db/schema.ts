import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  bookingCode: text('booking_code').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  status: text('status').notNull().default('new'),
  name: text('name').notNull(),
  contactMethod: text('contact_method').notNull(),
  contact: text('contact').notNull(),
  adults: integer('adults').notNull(),
  children: integer('children').notNull().default(0),
  gender: text('gender').notNull(),
  preferredDate: text('preferred_date').notNull(),
  preferredTime: text('preferred_time').notNull(),
  service: text('service').notNull(),
  duration: text('duration').notNull(),
  notes: text('notes'),
});
