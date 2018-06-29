package api

// ReqLeave ...
type ReqLeave struct {
	TypeOfLeave  string `json:"type_of_leave" orm:"column(type_of_leave)"`
	Reason       string `json:"reason" orm:"column(reason)"`
	DateFrom     string `json:"date_from" orm:"column(date_from)"`
	DateTo       string `json:"date_to" orm:"column(date_to)"`
	BackOn       string `json:"back_on" orm:"column(back_on)"`
	Address      string `json:"address" orm:"column(address)"`
	ContactLeave string `json:"contact_leave" orm:"column(contact_leave)"`
}
