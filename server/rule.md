register

request :
```
{
  employee_number : 
  name :
  gender :
  position :
  start_working_date :
  mobile_phone :  
  email :
  password :
  supervisor_id :
  role_id :
}
```

process:
- check if ```email``` in database if exist return error "users already register"
- check if fields are filled return "register success"

response: 
```
{
  body : "register success"
  error : null
}
```


login

request :
```
{
  email:sildy.al@tnis.com,
  password: 123
}
```

process:
- check if ```email``` in database if not exist return error "users not register"
- check if ```password``` in database if not valid return error " wrong password"
- check if ```email``` and ```password``` in database is exist return "login success"

response: 
```
{
  body : "login success"
  error : null
}
```


{
		"employee_number": 11111,
    "name": "Admin TNIS",
    "gender": "Female",
    "position": "HR & Assistant",
    "start_working_date": "2017-06-06",
    "mobile_phone": "081322058231",
    "email": "admin@tnis.com",
    "password": "admin",
    "role": "admin",
    "supervisor_id": 0
}

{
		"employee_number": 87693,
    "name": "Syldie Aldi Wijaya",
    "gender": "Male",
    "position": "Junior Software Developer",
    "start_working_date": "2018-05-02",
    "mobile_phone": "085713757757",
    "email": "sildy.al@tnis.com",
    "password": "12345",
    "role": "employee",
    "supervisor_id": 12345
}

{
		"employee_number": 12345,
    "name": "Mila Amelia Adiarani",
    "gender": "Female",
    "position": "HR & Assistant",
    "start_working_date": "03-07-2017",
    "mobile_phone": "081322058231",
    "email": "mila.am@tnis.com",
    "password": "12345",
    "role": "supervisor"    
}

{
		"employee_number": 54321,
    "name": "Mila Amelia Adiarani",
    "gender": "Female",
    "position": "Director",
    "start_working_date": "02-05-2017",
    "mobile_phone": "081322058231",
    "email": "mila.am@tnis.com",
    "password": "12345",
    "role": "director"    
}

{
        "type_of_leave": "holiday",
        "reason": "holiday",
        "from": "2018-06-20",
        "to": "2018-06-26",
        "contact_leave": "007",
        "address": ""
}