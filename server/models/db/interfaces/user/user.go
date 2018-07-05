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
	// GetDirector
	GetDirector() (
		result structLogic.GetDirector,
		err error,
	)
	// GetSupervisor
	GetSupervisor(employeeNumber int64) (
		result structLogic.GetSupervisor,
		err error,
	)
	// GetEmployee
	GetEmployee(employeeNumber int64) (
		result structLogic.GetEmployee,
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
}
