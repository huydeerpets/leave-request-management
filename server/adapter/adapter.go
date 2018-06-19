package adapter

// CallPGSQL ...
func CallPGSQL() string {
	return "user=postgres password=root host=172.17.0.1 port=5432 dbname=db_leave_request sslmode=disable"
}
