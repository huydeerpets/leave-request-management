package logic

// GetSupervisorID ...
type GetSupervisorID struct {
	SupervisorID int64 `json:"supervisor_id" orm:"column(supervisor_id)"`
}

// GetSupervisor ...
type GetSupervisor struct {
	Name  string `json:"name" orm:"column(name)"`
	Email string `json:"email" orm:"column(email)"`
}
