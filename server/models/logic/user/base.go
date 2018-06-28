package user

import (
	dbInterfaceDirector "server/models/db/interfaces/director"
	dbInterfaceLeave "server/models/db/interfaces/leave_request"
	dbInterfaceUser "server/models/db/interfaces/user"

	dbLayerDirector "server/models/db/pgsql/director"
	dbLayerLeave "server/models/db/pgsql/leave_request"
	dbLayerUser "server/models/db/pgsql/user"
)

// constant var
var (
	DBPostUser     dbInterfaceUser.IBaseUser
	DBPostLeave    dbInterfaceLeave.IBaseLeaveRequest
	DBPostDirector dbInterfaceDirector.IBaseDirector
)

func init() {
	DBPostUser = new(dbLayerUser.User)
	DBPostLeave = new(dbLayerLeave.LeaveRequest)
	DBPostDirector = new(dbLayerDirector.Director)
}
