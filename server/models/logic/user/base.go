package user

import (
	dbInterfaceLeave "server/models/db/interfaces/leave_request"
	dbInterfaceUser "server/models/db/interfaces/user"

	dbLayerLeave "server/models/db/pgsql/leave_request"
	dbLayerUser "server/models/db/pgsql/user"
)

// constant var
var (
	DBPostUser  dbInterfaceUser.IBaseUser
	DBPostLeave dbInterfaceLeave.IBaseLeaveRequest
)

func init() {
	DBPostUser = new(dbLayerUser.User)
	DBPostLeave = new(dbLayerLeave.LeaveRequest)
}
