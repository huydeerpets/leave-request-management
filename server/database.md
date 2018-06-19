# Modify this code to update the DB schema diagram.
# To reset the sample schema, replace everything with
# two dots ('..' - without quotes).

```
employee
-
employee_number PK int
name string 
gender string
position string
start_working_date datetime
mobile_phone varchar(12)
email varchar(50)
password varchar(50)
supervisor_id FK int


```
leave_request
-
id PK int
employee_number FK int
type_of_leave string
reason string
from datetime
to datetime
total int
leave_remaining int
address string
ContactLeave varchar(50)
status string
reject_reason string
approved_by string

```