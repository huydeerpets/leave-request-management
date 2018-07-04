package db

// LeaveRequest ...
type LeaveRequest struct {
	ID             int64  `json:"id" orm:"column(id);pk"`
	EmployeeNumber int64  `json:"employee_number" orm:"column(employee_number)"`
	TypeLeaveID    int64  `json:"type_leave_id" orm:"column(type_leave_id)"`
	Reason         string `json:"reason" orm:"column(reason)"`
	DateFrom       string `json:"date_from" orm:"column(date_from)"`
	DateTo         string `json:"date_to" orm:"column(date_to)"`
	Total          int64  `json:"total" orm:"column(total)"`
	BackOn         string `json:"back_on" orm:"column(back_on)"`
	Address        string `json:"address" orm:"column(address)"`
	ContactLeave   string `json:"contact_leave" orm:"column(contact_leave)"`
	Status         string `json:"status" orm:"column(status)"`
	ApprovedBy     string `json:"approved_by" orm:"column(approved_by)"`
	RejectReason   string `json:"reject_reason" orm:"column(reject_reason)"`
	ErrandReason   string `json:"errand_reason" orm:"column(errand_reason)"`
}

// TableName ...
func (u *LeaveRequest) TableName() string {
	return "leave_request"
}
