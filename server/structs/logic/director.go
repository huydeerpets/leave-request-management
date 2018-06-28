package logic

// GetDirectorID ...
type GetDirectorID struct {
	DirectorID int64 `json:"director_id" orm:"column(director_id)"`
}

// GetDirectorName ...
type GetDirectorName struct {
	Name string `json:"name" orm:"column(name)"`
}
