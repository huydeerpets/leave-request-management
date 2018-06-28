package director

import (
	structLogic "server/structs/logic"
)

// IBaseDirector ...
type IBaseDirector interface {

	// AcceptByDirector
	AcceptByDirector(id int64, employeeNumber int64) error
	// RejectByDirector
	RejectByDirector(id int64, employeeNumber int64) error
	// GetDirectorPendingRequest
	GetDirectorPendingRequest() ([]structLogic.RequestPending, error)
	// GetDirectorAcceptRequest
	GetDirectorAcceptRequest() ([]structLogic.RequestAccept, error)
	// GetDirectorRejectRequest
	GetDirectorRejectRequest() ([]structLogic.RequestReject, error)
}
