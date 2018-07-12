package api

// ReqLeave ...
type (
	ReqLeave struct {
		TypeLeaveID int64  `json:"type_leave_id" orm:"column(type_leave_id)"`
		Reason      string `json:"reason" orm:"column(reason)"`
		DateFrom    string `json:"date_from" orm:"column(date_from)"`
		DateTo      string `json:"date_to" orm:"column(date_to)"`
		// DateRanges     []DateRange `json:"date_ranges"`
		BackOn         string `json:"back_on" orm:"column(back_on)"`
		ContactAddress string `json:"contact_address" orm:"column(contact_address)"`
		ContactNumber  string `json:"contact_number" orm:"column(contact_number)"`
	}

	// DateRange ...
	DateRange struct {
		Date      []string `json:"date" orm:"column(date)"`
		IsHalfDay []bool   `json:"status_date" orm:"column(status_date)"`
	}
)
