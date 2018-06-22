package logic

// LeaveAccept ...
type LeaveAccept struct {
	EmployeeNumber   int64  `json:"employee_number" orm:"column(employee_number);pk"`
	Name             string `json:"name" orm:"column(name)"`
	Gender           string `json:"gender" orm:"column(gender)"`
	Position         string `json:"position" orm:"column(position)"`
	StartWorkingDate string `json:"start_working_date" orm:"column(start_working_date)"`
	Email            string `json:"email" orm:"column(email)"`
	Role             string `json:"role" orm:"column(role)"`
	TypeOfLeave      string `json:"type_of_leave" orm:"column(type_of_leave)"`
	Reason           string `json:"reason" orm:"column(reason)"`
	From             string `json:"from" orm:"column(from)"`
	To               string `json:"to" orm:"column(to)"`
	Total            int64  `json:"total" orm:"column(total)"`
	LeaveRemaining   int64  `json:"leave_remaining" orm:"column(leave_remaining)"`
	Address          string `json:"address" orm:"column(address)"`
	ContactLeave     string `json:"contact_leave" orm:"column(contact_leave)"`
}
