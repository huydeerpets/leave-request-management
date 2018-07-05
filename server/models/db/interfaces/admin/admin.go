package admin

import (
	structDB "server/structs/db"
	structLogic "server/structs/logic"
)

// IBaseAdmin ...
type IBaseAdmin interface {
	// AddUser
	AddUser(user structDB.User) error
	// DeleteUser
	DeleteUser(employeeNumber int64) error
	// GetUsers
	GetUsers() (
		[]structDB.User,
		error,
	)
	// GetUser
	GetUser(employeeNumber int64) (
		result structDB.User,
		err error,
	)
	// UpdateUser
	UpdateUser(
		e *structDB.User,
		employeeNumber int64,
	) (err error)
	// GetLeaveRequest
	GetLeaveRequest() ([]structLogic.RequestAccept, error)
	// CreateUserTypeLeave
	CreateUserTypeLeave(
		employeeNumber int64,
		typeLeaveID int64,
		total int64,
	) error
	// UpdateLeaveRemaning
	UpdateLeaveRemaning(total int64, employeeNumber int64) (err error)
}
