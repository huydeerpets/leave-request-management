CREATE TABLE IF NOT EXISTS user_type_leave
(
  "id" SERIAL PRIMARY KEY,
  "employee_number" int NOT NULL REFERENCES users(employee_number),  
  "type_leave_id" int NOT NULL REFERENCES type_leave(id),
  "leave_remaining" int NOT NULL
);
