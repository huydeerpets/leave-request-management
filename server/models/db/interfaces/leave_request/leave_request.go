package leave

import (
	structDB "server/structs/db"
	structLogic "server/structs/logic"
)

// IBaseLeaveRequest ...
type IBaseLeaveRequest interface {
	// CreateLeaveRequest
	CreateLeaveRequest(employeeNumber int64,
		typeLeaveID int64,
		reason string,
		dateFrom string,
		dateTo string,
		halfDates []string,
		backOn string,
		total float64,
		address string,
		contactLeave string,
		status string) error
	// CreateLeaveRequestSupervisor
	CreateLeaveRequestSupervisor(employeeNumber int64,
		typeLeaveID int64,
		reason string,
		dateFrom string,
		dateTo string,
		halfDates []string,
		backOn string,
		total float64,
		address string,
		contactLeave string,
		status string) error
	// UpdateRequest
	UpdateRequest(e *structDB.LeaveRequest, id int64) (err error)
	// DeleteRequest
	DeleteRequest(id int64) (err error)
	// GetLeave
	GetLeave(id int64) (
		result structLogic.GetLeave,
		err error,
	)
}
