package logic

// GetEmployeeEmail ...
type GetEmployeeEmail struct {
	Name  string `json:"name" orm:"column(name)"`
	Email string `json:"email" orm:"column(email)"`
}
