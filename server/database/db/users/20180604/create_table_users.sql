CREATE TABLE IF NOT EXISTS users 
(
  "employee_number" integer NOT NULL PRIMARY KEY,
  "name" char(25) NOT NULL,
  "gender" char(6) NOT NULL,
  "position" text NOT NULL,
  "start_working_date" text NOT NULL,
  "mobile_phone" text NOT NULL,
  "email" varchar(30) NOT NULL,
  "password" varchar(100) NOT NULL,
  "role" text NOT NULL,
  "supervisor_id" int NOT NULL,
  "leave_remaining" int NOT NULL
)