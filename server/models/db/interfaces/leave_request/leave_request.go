package leave

import (
	structDB "server/structs/db"
)

// IBaseLeaveRequest ...
type IBaseLeaveRequest interface {
	// CreateLeaveRequest
	CreateLeaveRequest(user structDB.LeaveRequest) error
}
