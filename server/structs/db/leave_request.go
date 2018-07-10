package db

type (
	// LeaveRequest ...
	LeaveRequest struct {
		ID             int64  `json:"id" orm:"column(id);pk"`
		EmployeeNumber int64  `json:"employee_number" orm:"column(employee_number)"`
		TypeLeaveID    int64  `json:"type_leave_id" orm:"column(type_leave_id)"`
		Reason         string `json:"reason" orm:"column(reason)"`
		DateFrom       string `json:"date_from" orm:"column(date_from)"`
		DateTo         string `json:"date_to" orm:"column(date_to)"`
		dateRanges     []struct {
			Date       string `json:"date" orm:"column(date)"`
			StatusDate bool   `json:"status_date" orm:"column(status_date)"`
		}
		// dateRanges     []DateRange `json:"date_ranges" orm:"column(date_ranges)"`
		// DateRanges     []*DateRange `json:"date_ranges" orm:"rel(m2m)"`
		Total          int64  `json:"total" orm:"column(total)"`
		BackOn         string `json:"back_on" orm:"column(back_on)"`
		ContactAddress string `json:"contact_address" orm:"column(contact_address)"`
		ContactNumber  string `json:"contact_number" orm:"column(contact_number)"`
		Status         string `json:"status" orm:"column(status)"`
		ActionBy       string `json:"action_by" orm:"column(action_by)"`
		RejectReason   string `json:"reject_reason" orm:"column(reject_reason)"`
		ErrandReason   string `json:"errand_reason" orm:"column(errand_reason)"`
	}
)

// DateRange ...
type DateRange struct {
	Date       string `json:"date" orm:"column(date)"`
	StatusDate bool   `json:"status_date" orm:"column(status_date)"`
}

// TableName ...
func (u *LeaveRequest) TableName() string {
	return "leave_request"
}
