package db

// LeaveRequest ...
type LeaveRequest struct {
	ID             int64  `json:"id" orm:"column(id);pk"`
	EmployeeNumber int64  `json:"employee_number" orm:"column(employee_number)"`
	TypeOfLeave    string `json:"type_of_leave" orm:"column(type_of_leave)"`
	Reason         string `json:"reason" orm:"column(reason)"`
	From           string `json:"from" orm:"column(from)"`
	To             string `json:"to" orm:"column(to)"`
	Total          int64  `json:"total" orm:"column(total)"`
	LeaveRemaining int64  `json:"leave_remaining" orm:"column(leave_remaining)"`
	Address        string `json:"address" orm:"column(address)"`
	ContactLeave   string `json:"contact_leave" orm:"column(contact_leave)"`
	Status         string `json:"status" orm:"column(status)"`
	RejectReason   string `json:"reject_reason" orm:"column(reject_reason)"`
	ApprovedBy     string `json:"approved_by" orm:"column(approved_by)"`
}

// TableName ...
func (u *LeaveRequest) TableName() string {
	return "leave_request"
}
