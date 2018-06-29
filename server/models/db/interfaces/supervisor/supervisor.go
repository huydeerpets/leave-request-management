package user

import (
	structLogic "server/structs/logic"
)

// IBaseUser ...
type IBaseUser interface {

	// GetUserPending
	GetUserPending(supervisorID int64) (
		[]structLogic.LeavePending,
		error,
	)
	// GetUserAccept
	GetUserAccept(supervisorID int64) (
		[]structLogic.LeaveAccept,
		error,
	)
	// GetUserReject
	GetUserReject(supervisorID int64) (
		[]structLogic.LeaveReject,
		error,
	)
	// AcceptBySupervisor
	AcceptBySupervisor(id int64, employeeNumber int64) error
	// RejectBySupervisor
	RejectBySupervisor(id int64, employeeNumber int64) error
}
