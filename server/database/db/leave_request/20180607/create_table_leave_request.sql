CREATE SEQUENCE leave_request_id_seq;

CREATE TABLE IF NOT EXISTS leave_request 
(
  "id" SERIAL PRIMARY KEY NOT NULL DEFAULT nextval('leave_request_id_seq'),
  "employee_number" int NOT NULL REFERENCES users(employee_number),
  "type_of_leave" text NOT NULL,
  "from"  text NOT NULL,
  "to"  text NOT NULL,
  "back_on"  text NOT NULL,
  "total" int NOT NULL,
  "leave_remaining" int NOT NULL,
  "reason" text NOT NULL,
  "address" text NOT NULL,
  "contact_leave" text,
  "status" text NOT NULL,
  "reject_reason" text,
  "approved_by" text
)

ALTER SEQUENCE leave_request_id_seq OWNED BY leave_request.id;