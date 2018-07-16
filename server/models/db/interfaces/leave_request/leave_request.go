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
		backOn string,
		total int,
		address string,
		contactLeave string,
		status string) error
	// CreateLeaveRequestSupervisor
	CreateLeaveRequestSupervisor(employeeNumber int64,
		typeLeaveID int64,
		reason string,
		from string,
		to string,
		backOn string,
		total int,
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
