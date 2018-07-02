package leave

import structDB "server/structs/db"

// IBaseLeaveRequest ...
type IBaseLeaveRequest interface {
	// CreateLeaveRequest
	CreateLeaveRequest(employeeNumber int64,
		typeOfLeave string,
		reason string,
		from string,
		to string,
		backOn string,
		total int64,
		address string,
		contactLeave string,
		status string) error
	// CreateLeaveRequestSupervisor
	CreateLeaveRequestSupervisor(employeeNumber int64,
		typeOfLeave string,
		reason string,
		from string,
		to string,
		backOn string,
		total int64,
		address string,
		contactLeave string,
		status string) error
	// UpdateRequest
	UpdateRequest(e *structDB.LeaveRequest, id int64) (err error)
	// DeleteRequest
	DeleteRequest(id int64) (err error)
}
