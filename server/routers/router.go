package routers

import (
	"server/controllers"

	"github.com/astaxie/beego"
)

func init() {

	beego.Router("/", &controllers.MainController{})
	ns := beego.NewNamespace("/api",
		// user register
		beego.NSRouter("/register",
			&controllers.UserController{},
			"post:PostUser",
		),
		// user login
		beego.NSRouter("/login",
			&controllers.UserController{},
			"post:Login",
		),

		// get all user (only for admin)
		beego.NSRouter("/user",
			&controllers.UserController{},
			"get:GetUsers",
		),

		// create leave request form (for all role except admin)
		beego.NSRouter("/leave/:id:int ",
			&controllers.LeaveController{},
			"post:PostLeaveRequest",
		),

		// get pending request in employee (only for employee)
		beego.NSRouter("/employee/pending/:id:int ",
			&controllers.UserController{},
			"get:GetRequestPending",
		),
		// get accept request in employee (only for employee)
		beego.NSRouter("/employee/accept/:id:int ",
			&controllers.UserController{},
			"get:GetRequestAccept",
		),
		// get reject request in employee (only for employee)
		beego.NSRouter("/employee/reject/:id:int ",
			&controllers.UserController{},
			"get:GetRequestReject",
		),

		// get status pending in supervisor (only for supervisor)
		beego.NSRouter("/supervisor/:id:int ",
			&controllers.UserController{},
			"get:GetPendingLeave",
		),
		// accept status by supervisor (only for supervisor)
		beego.NSRouter("/employee/accept/:id:int ",
			&controllers.UserController{},
			"put:AcceptStatusBySupervisor",
		),
	)
	beego.AddNamespace(ns)
}
