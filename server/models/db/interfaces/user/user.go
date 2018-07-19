package user

import (
	structAPI "server/structs/api"
	structDB "server/structs/db"
	structLogic "server/structs/logic"
)

// IBaseUser ...
type IBaseUser interface {
	// GetJWT
	GetJWT(loginData *structAPI.ReqLogin) (
		result structAPI.RespLogin,
		err error,
	)
	// ForgotPassword
	ForgotPassword(e *structLogic.PasswordReset) error
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
	// UpdatePassword
	UpdatePassword(p *structLogic.NewPassword, employeeNumber int64) (err error)
	// GetTypeLeave
	GetTypeLeave() (result []structDB.TypeLeave, err error)
	// GetSupervisors
	GetSupervisors() (result []structLogic.GetSupervisors, err error)
	// GetSumarry
	GetSumarry(employeeNumber int64) ([]structLogic.UserSumarry, error)
	// GetUserTypeLeave
	GetUserTypeLeave(employeeNumber int64) (result []structLogic.UserTypeLeave, err error)
	GetUserLeaveRemaining(typeID int64, employeeNumber int64) (result structLogic.UserTypeLeave, err error)
}
