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
	// GetUserPending
	GetUserPending(supervisorID int64) (
		[]structLogic.LeavePending,
		error,
	)
}
