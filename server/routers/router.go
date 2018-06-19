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

		// get status pending in supervisor (only for supervisor)
		beego.NSRouter("/supervisor/:id:int ",
			&controllers.UserController{},
			"get:GetPendingLeave",
		),
	)
	beego.AddNamespace(ns)
}
