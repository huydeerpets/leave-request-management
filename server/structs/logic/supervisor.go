package logic

// GetSupervisorID ...
type GetSupervisorID struct {
	SupervisorID int64 `json:"supervisor_id" orm:"column(supervisor_id)"`
}

// GetSupervisorName ...
type GetSupervisorName struct {
	Name string `json:"name" orm:"column(name)"`
}
