package api

// ReqLeave ...
type ReqLeave struct {
	TypeOfLeave  string `json:"type_of_leave" orm:"column(type_of_leave)"`
	Reason       string `json:"reason" orm:"column(reason)"`
	From         string `json:"from" orm:"column(from)"`
	To           string `json:"to" orm:"column(to)"`
	Address      string `json:"address" orm:"column(address)"`
	ContactLeave string `json:"contact_leave" orm:"column(contact_leave)"`
}
