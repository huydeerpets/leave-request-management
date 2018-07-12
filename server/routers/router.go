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

		beego.NSRouter("/user/type-leave",
			&controllers.UserController{},
			"get:GetTypeLeave",
		),
		beego.NSRouter("/user/supervisor",
			&controllers.UserController{},
			"get:GetSupervisors",
		),
		beego.NSRouter("/user/summary/:id:int ",
			&controllers.UserController{},
			"get:GetUserSummary",
		),

		// upadate new password
		beego.NSRouter("/user/update/:id:int ",
			&controllers.UserController{},
			"put:UpdateNewPassword",
		),

		// create leave request for employee, update leave request, delete leave request
		beego.NSRouter("/employee/leave/:id:int ",
			&controllers.LeaveController{},
			"post:PostLeaveRequest;put:UpdateRequest;delete:DeleteRequest",
		),
		// create leave request for supervisor
		beego.NSRouter("/supervisor/leave/:id:int ",
			&controllers.LeaveController{},
			"post:PostLeaveRequestSupervisor",
		),

		// ========================= admin ========================= //
		// register user
		beego.NSRouter("/admin/user/register",
			&controllers.AdminController{},
			"post:CreateUser",
		),
		// get all user
		beego.NSRouter("/admin/user",
			&controllers.AdminController{},
			"get:GetUsers;post:CreateUser",
		),
		// get one user, update one user, delete one user
		beego.NSRouter("/admin/user/:id:int",
			&controllers.AdminController{},
			"get:GetUser;put:UpdateUser;delete:DeleteUser",
		),
		// delete user
		beego.NSRouter("/admin/user/delete/:id:int",
			&controllers.AdminController{},
			"delete:DeleteUser",
		),
		// get leave request success
		beego.NSRouter("/admin/leave/pending",
			&controllers.AdminController{},
			"get:GetRequestPending",
		),
		// get leave request success
		beego.NSRouter("/admin/leave/accept",
			&controllers.AdminController{},
			"get:GetRequestAccept",
		),
		// get leave request success
		beego.NSRouter("/admin/leave/reject",
			&controllers.AdminController{},
			"get:GetRequestReject",
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
			&controllers.SupervisorController{},
			"put:AcceptStatusBySupervisor",
		),
		// reject status by supervisor
		beego.NSRouter("/employee/reject/:id:int/:enumber:int",
			&controllers.SupervisorController{},
			"put:RejectStatusBySv",
		),
		// get status pending in supervisor
		beego.NSRouter("/supervisor/pending/:id:int ",
			&controllers.SupervisorController{},
			"get:GetPendingLeave",
		),
		// get status accept in supervisor
		beego.NSRouter("/supervisor/accept/:id:int ",
			&controllers.SupervisorController{},
			"get:GetAcceptLeave",
		),
		// get status reject in supervisor
		beego.NSRouter("/supervisor/reject/:id:int ",
			&controllers.SupervisorController{},
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
