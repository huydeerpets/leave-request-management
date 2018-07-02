package user

import (
	structAPI "server/structs/api"
	structLogic "server/structs/logic"
)

// IBaseUser ...
type IBaseUser interface {
	// GetJWT
	GetJWT(loginData structAPI.ReqLogin) (
		result structAPI.RespLogin,
		err error,
	)
	// GetPendingRequest
	GetPendingRequest(employeeNumber int64) (
		[]structLogic.RequestPending,
		error,
	)
	// GetAcceptRequest
	GetAcceptRequest(employeeNumber int64) (
		[]structLogic.RequestAccept,
		error,
	)
	// GetRejectRequest
	GetRejectRequest(employeeNumber int64) (
		[]structLogic.RequestReject,
		error,
	)
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
	RejectBySupervisor(reason string, id int64, employeeNumber int64) error
}
