CREATE SEQUENCE leave_request_id_seq    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;    

CREATE TABLE IF NOT EXISTS leave_request(
  "id" INTEGER PRIMARY KEY DEFAULT NEXTVAL('leave_request_id_seq'),   
  "employee_number" int NOT NULL REFERENCES users(employee_number),
  "type_of_leave" text NOT NULL,
  "reason" text NOT NULL,
  "from"  text NOT NULL,
  "to"  text NOT NULL,
  "back_on"  text NOT NULL,
  "total" int NOT NULL,
  "leave_remaining" int NOT NULL,  
  "address" text NOT NULL,
  "contact_leave" text,
  "status" text NOT NULL,  
  "approved_by" text
);
