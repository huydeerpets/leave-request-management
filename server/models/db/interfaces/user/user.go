package user

import (
	structAPI "server/structs/api"
	structDB "server/structs/db"
	structLogic "server/structs/logic"
)

// IBaseUser ...
type IBaseUser interface {
	// AddUser
	AddUser(user structDB.User) error
	// GetJWT
	GetJWT(loginData structAPI.ReqLogin) (
		result structAPI.RespLogin,
		err error,
	)
	// GetAllUser
	GetAllUser() (
		[]structDB.User,
		error,
	)
	// GetUser
	GetUser(employeeNumber int64) (
		result structDB.User,
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
	// AcceptBySupervisor
	AcceptBySupervisor(employeeNumber int64) error
	// RejectBySupervisor
	RejectBySupervisor(employeeNumber int64) error
}
