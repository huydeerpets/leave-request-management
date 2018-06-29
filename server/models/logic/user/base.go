package user

import (
	dbInterfaceAdmin "server/models/db/interfaces/admin"
	dbInterfaceDirector "server/models/db/interfaces/director"
	dbInterfaceLeave "server/models/db/interfaces/leave_request"
	dbInterfaceUser "server/models/db/interfaces/user"

	dbLayerAdmin "server/models/db/pgsql/admin"
	dbLayerDirector "server/models/db/pgsql/director"
	dbLayerLeave "server/models/db/pgsql/leave_request"
	dbLayerUser "server/models/db/pgsql/user"
)

// constant var
var (
	DBPostAdmin    dbInterfaceAdmin.IBaseAdmin
	DBPostUser     dbInterfaceUser.IBaseUser
	DBPostLeave    dbInterfaceLeave.IBaseLeaveRequest
	DBPostDirector dbInterfaceDirector.IBaseDirector
)

func init() {
	DBPostAdmin = new(dbLayerAdmin.Admin)
	DBPostUser = new(dbLayerUser.User)
	DBPostLeave = new(dbLayerLeave.LeaveRequest)
	DBPostDirector = new(dbLayerDirector.Director)
}
