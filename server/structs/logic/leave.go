package logic

// GetLeave ...
type GetLeave struct {
	ID string `json:"id" orm:"column(id)"`
}

// LeaveReason ...
type LeaveReason struct {
	// Status       string `json:"status" orm:"column(status)"`
	RejectReason string `json:"reject_reason" orm:"column(reject_reason)"`
}
