package logic

// GetLeave ...
type GetLeave struct {
	ID          string `json:"id" orm:"column(id)"`
	TypeLeaveID int64  `json:"type_leave_id" orm:"column(type_leave_id)"`
	Total       int64  `json:"total" orm:"column(total)"`
}

// LeaveReason ...
type LeaveReason struct {
	// Status       string `json:"status" orm:"column(status)"`
	RejectReason string `json:"reject_reason" orm:"column(reject_reason)"`
}
