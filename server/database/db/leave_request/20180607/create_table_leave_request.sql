CREATE TABLE IF NOT EXISTS leave_request(
  "id" int PRIMARY KEY NOT NULL,   
  "employee_number" int NOT NULL REFERENCES users(employee_number),
  "type_of_leave" text NOT NULL,
  "reason" text NOT NULL,
  "date_from"  text NOT NULL,
  "date_to"  text NOT NULL,
  "back_on"  text NOT NULL,
  "total" int NOT NULL,
  "leave_remaining" int NOT NULL,  
  "address" text NOT NULL,
  "contact_leave" text,
  "status" text NOT NULL,  
  "approved_by" text,
  "reject_reason" text
);
