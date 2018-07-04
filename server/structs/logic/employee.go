package logic

// GetEmployee ...
type GetEmployee struct {
	Name  string `json:"name" orm:"column(name)"`
	Email string `json:"email" orm:"column(email)"`
}
