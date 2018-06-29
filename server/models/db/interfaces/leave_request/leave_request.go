package leave

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
		leaveRemaining int64,
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
		leaveRemaining int64,
		address string,
		contactLeave string,
		status string) error
}
