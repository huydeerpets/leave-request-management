package routers

import (
	"server/controllers"

	"github.com/astaxie/beego"
)

func init() {

	beego.Router("/", &controllers.MainController{})
	ns := beego.NewNamespace("/api",

		// user login
		beego.NSRouter("/login",
			&controllers.UserController{},
			"post:Login",
		),

		// create leave request form (for all role except admin and director)
		beego.NSRouter("/leave/:id:int ",
			&controllers.LeaveController{},
			"post:PostLeaveRequest",
		),

		// ========================= admin ========================= //
		// get all user
		beego.NSRouter("/user",
			&controllers.UserController{},
			"get:GetUsers",
		),
		// register user
		beego.NSRouter("/user/register",
			&controllers.UserController{},
			"post:PostUser",
		),
		// delete user
		beego.NSRouter("/user/delete/:id:int ",
			&controllers.UserController{},
			"delete:DeleteUser",
		),

		// ========================= employee ========================= //
		// get pending request in employee
		beego.NSRouter("/employee/pending/:id:int ",
			&controllers.UserController{},
			"get:GetRequestPending",
		),
		// get accept request in employee
		beego.NSRouter("/employee/accept/:id:int ",
			&controllers.UserController{},
			"get:GetRequestAccept",
		),
		// get reject request in employee
		beego.NSRouter("/employee/reject/:id:int ",
			&controllers.UserController{},
			"get:GetRequestReject",
		),

		// ========================= supervisor ========================= //
		// accept status by supervisor
		beego.NSRouter("/employee/accept/:id:int/:enumber:int",
			&controllers.UserController{},
			"put:AcceptStatusBySupervisor",
		),
		// reject status by supervisor
		beego.NSRouter("/employee/reject/:id:int/:enumber:int",
			&controllers.UserController{},
			"put:RejectStatusBySupervisor",
		),
		// get status pending in supervisor
		beego.NSRouter("/supervisor/pending/:id:int ",
			&controllers.UserController{},
			"get:GetPendingLeave",
		),
		// get status accept in supervisor
		beego.NSRouter("/supervisor/accept/:id:int ",
			&controllers.UserController{},
			"get:GetAcceptLeave",
		),
		// get status reject in supervisor
		beego.NSRouter("/supervisor/reject/:id:int ",
			&controllers.UserController{},
			"get:GetRejectLeave",
		),

		// ========================= director ========================= //
		// accept status by director
		beego.NSRouter("/director/accept/:id:int/:enumber:int",
			&controllers.DirectorController{},
			"put:AcceptStatusByDirector",
		),
		// reject status by director
		beego.NSRouter("/director/reject/:id:int/:enumber:int",
			&controllers.DirectorController{},
			"put:RejectStatusByDirector",
		),
		// get status pending in director
		beego.NSRouter("/director/pending/",
			&controllers.DirectorController{},
			"get:GetDirectorPendingLeave",
		),
		// get status accept in director
		beego.NSRouter("/director/accept/",
			&controllers.DirectorController{},
			"get:GetDirectorAcceptLeave",
		),
		// get status reject in director
		beego.NSRouter("/director/reject/",
			&controllers.DirectorController{},
			"get:GetDirectorRejectLeave",
		),
	)
	beego.AddNamespace(ns)
}
