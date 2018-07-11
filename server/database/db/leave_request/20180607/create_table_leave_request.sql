CREATE TYPE date_range AS(
  "dates" text,
  "is_half_day" boolean
);

CREATE TABLE IF NOT EXISTS leave_request
(
  "id" int PRIMARY KEY NOT NULL,
  "employee_number" int NOT NULL REFERENCES users(employee_number),
  "type_leave_id" int NOT NULL,
  "reason" text NOT NULL,
  "date_from" text NOT NULL,
  "date_to" text NOT NULL,
  "date_ranges" date_range[],
  "back_on" text NOT NULL,
  "total" int NOT NULL,
  "contact_address" text NOT NULL,
  "contact_number" text NOT NULL,
  "status" text NOT NULL,
  "action_by" text,
  "reject_reason" text,
  "errand_reason" text,
  "created_at" timestamp with time zone not null default CURRENT_TIMESTAMP
)