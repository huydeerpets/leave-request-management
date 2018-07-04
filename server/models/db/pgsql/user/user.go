package user

import (
	"errors"
	"server/helpers"
	"server/helpers/constant"
	structAPI "server/structs/api"
	structDB "server/structs/db"
	structLogic "server/structs/logic"

	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"golang.org/x/crypto/bcrypt"
)

// User ...
type User struct{}

// GetJWT ...
func (u *User) GetJWT(loginData structAPI.ReqLogin) (result structAPI.RespLogin, err error) {
	var user structDB.User
	var RespLogin structAPI.RespLogin

	o := orm.NewOrm()
	errRaw := o.Raw(`SELECT * FROM `+user.TableName()+` WHERE email = ?`, loginData.Email).QueryRow(&user)
	if errRaw != nil {
		helpers.CheckErr("error get users @GetJWT", errRaw)
		return RespLogin, errors.New("Failed get user, email not register")
	}

	errCompare := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginData.Password))
	if errCompare != nil {
		helpers.CheckErr("error compare password @GetJWT", errCompare)
		return RespLogin, errors.New("Wrong Password")
	}

	ezT := helpers.EzToken{
		Email:   user.Email,
		ID:      user.EmployeeNumber,
		Expires: time.Now().Unix() + 3600,
	}
	token, err := ezT.GetToken()
	if err != nil {
		helpers.CheckErr("error get token @GetJWT", err)
		return RespLogin, errors.New("Failed Generating token")
	}
	RespLogin.Token = token
	RespLogin.ID = user.EmployeeNumber
	RespLogin.Role = user.Role

	return RespLogin, err
}

// GetPendingRequest ...
func (u *User) GetPendingRequest(employeeNumber int64) ([]structLogic.RequestPending, error) {
	var (
		reqPending []structLogic.RequestPending
		leave      structDB.LeaveRequest
		user       structDB.User
	)
	statPendingSupervisor := constant.StatusPendingInSupervisor
	statPendingDirector := constant.StatusPendingInDirector

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetPendingRequest", errQB)
		return reqPending, errQB
	}

	qb.Select(leave.TableName()+".id",
		user.TableName()+".employee_number",
		user.TableName()+".name",
		user.TableName()+".gender",
		user.TableName()+".position",
		user.TableName()+".start_working_date",
		user.TableName()+".mobile_phone",
		user.TableName()+".email",
		user.TableName()+".role",
		leave.TableName()+".type_of_leave",
		leave.TableName()+".reason",
		leave.TableName()+".date_from",
		leave.TableName()+".date_to",
		leave.TableName()+".total",
		user.TableName()+".leave_remaining",
		leave.TableName()+".back_on",
		leave.TableName()+".address",
		leave.TableName()+".contact_leave",
		leave.TableName()+".status").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(leave.TableName() + ".employee_number" + "=" + user.TableName() + ".employee_number").
		Where(`(status = ? OR status = ? )`).And(user.TableName() + `.employee_number = ? `)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statPendingSupervisor, statPendingDirector, employeeNumber).QueryRows(&reqPending)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select item @GetPendingRequest", errRaw)
		return reqPending, errors.New("employee number not exist")
	}
	beego.Debug("Total pending request =", count)

	return reqPending, errRaw
}

// GetAcceptRequest ...
func (u *User) GetAcceptRequest(employeeNumber int64) ([]structLogic.RequestAccept, error) {
	var (
		reqAccept []structLogic.RequestAccept
		leave     structDB.LeaveRequest
		user      structDB.User
	)
	statAcceptSupervisor := constant.StatusSuccessInSupervisor
	statAcceptDirector := constant.StatusSuccessInDirector

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetAcceptRequest", errQB)
		return reqAccept, errQB
	}

	qb.Select(leave.TableName()+".id",
		user.TableName()+".employee_number",
		user.TableName()+".name",
		user.TableName()+".gender",
		user.TableName()+".position",
		user.TableName()+".start_working_date",
		user.TableName()+".mobile_phone",
		user.TableName()+".email",
		user.TableName()+".role",
		leave.TableName()+".type_of_leave",
		leave.TableName()+".reason",
		leave.TableName()+".date_from",
		leave.TableName()+".date_to",
		leave.TableName()+".total",
		user.TableName()+".leave_remaining",
		leave.TableName()+".back_on",
		leave.TableName()+".address",
		leave.TableName()+".contact_leave",
		leave.TableName()+".status",
		leave.TableName()+".approved_by").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(user.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		Where(`(status = ? OR status = ? )`).And(leave.TableName() + `.employee_number = ? `)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statAcceptSupervisor, statAcceptDirector, employeeNumber).QueryRows(&reqAccept)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select item @GetAcceptRequest", errRaw)
		return reqAccept, errors.New("employee number not exist")
	}
	beego.Debug("Total accept request =", count)

	return reqAccept, errRaw
}

// GetRejectRequest ...
func (u *User) GetRejectRequest(employeeNumber int64) ([]structLogic.RequestReject, error) {
	var (
		reqReject []structLogic.RequestReject
		leave     structDB.LeaveRequest
		user      structDB.User
	)
	statRejectSupervisor := constant.StatusRejectInSuperVisor
	statRejectDirector := constant.StatusRejectInDirector

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetRejectRequest", errQB)
		return reqReject, errQB
	}

	qb.Select(leave.TableName()+".id",
		user.TableName()+".employee_number",
		user.TableName()+".name",
		user.TableName()+".gender",
		user.TableName()+".position",
		user.TableName()+".start_working_date",
		user.TableName()+".mobile_phone",
		user.TableName()+".email",
		user.TableName()+".role",
		leave.TableName()+".type_of_leave",
		leave.TableName()+".reason",
		leave.TableName()+".date_from",
		leave.TableName()+".date_to",
		leave.TableName()+".total",
		user.TableName()+".leave_remaining",
		leave.TableName()+".back_on",
		leave.TableName()+".address",
		leave.TableName()+".contact_leave",
		leave.TableName()+".status").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(user.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		Where(`(status = ? OR status = ? )`).And(user.TableName() + `.employee_number = ? `)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statRejectSupervisor, statRejectDirector, employeeNumber).QueryRows(&reqReject)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select item @GetRejectRequest", errRaw)
		return reqReject, errors.New("employee number not exist")
	}
	beego.Debug("Total reject request =", count)

	return reqReject, errRaw
}

// GetUserPending ...
func (u *User) GetUserPending(supervisorID int64) ([]structLogic.LeavePending, error) {
	var (
		leavePending []structLogic.LeavePending
		leave        structDB.LeaveRequest
		user         structDB.User
	)
	statusPending := constant.StatusPendingInSupervisor

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUserPending", errQB)
		return leavePending, errQB
	}

	qb.Select(leave.TableName()+".id",
		user.TableName()+".employee_number",
		user.TableName()+".name",
		user.TableName()+".gender",
		user.TableName()+".position",
		user.TableName()+".start_working_date",
		user.TableName()+".mobile_phone",
		user.TableName()+".email",
		user.TableName()+".role",
		leave.TableName()+".type_of_leave",
		leave.TableName()+".reason",
		leave.TableName()+".date_from",
		leave.TableName()+".date_to",
		leave.TableName()+".total",
		user.TableName()+".leave_remaining",
		leave.TableName()+".back_on",
		leave.TableName()+".address",
		leave.TableName()+".contact_leave",
		leave.TableName()+".status").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(user.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		Where(`status = ? `).And(`supervisor_id = ? `)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statusPending, supervisorID).QueryRows(&leavePending)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select item @GetUserPending", errRaw)
		return leavePending, errors.New("employee number not exist")
	}
	beego.Debug("Total user pending =", count)

	return leavePending, errRaw
}

// GetUserAccept ...
func (u *User) GetUserAccept(supervisorID int64) ([]structLogic.LeaveAccept, error) {
	var (
		leaveAccept []structLogic.LeaveAccept
		leave       structDB.LeaveRequest
		user        structDB.User
	)
	statusAccept := constant.StatusSuccessInSupervisor
	statusAcceptDirector := constant.StatusSuccessInDirector

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUserAccept", errQB)
		return leaveAccept, errQB
	}

	qb.Select(leave.TableName()+".id",
		user.TableName()+".employee_number",
		user.TableName()+".name",
		user.TableName()+".gender",
		user.TableName()+".position",
		user.TableName()+".start_working_date",
		user.TableName()+".mobile_phone",
		user.TableName()+".email",
		user.TableName()+".role",
		leave.TableName()+".type_of_leave",
		leave.TableName()+".reason",
		leave.TableName()+".date_from",
		leave.TableName()+".date_to",
		leave.TableName()+".total",
		user.TableName()+".leave_remaining",
		leave.TableName()+".back_on",
		leave.TableName()+".address",
		leave.TableName()+".contact_leave",
		leave.TableName()+".status").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(user.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		Where(`(status = ? OR status = ? )`).And(user.TableName() + `.supervisor_id = ? `)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statusAccept, statusAcceptDirector, supervisorID).QueryRows(&leaveAccept)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select item @GetUserAccept", errRaw)
		return leaveAccept, errors.New("employee number not exist")
	}
	beego.Debug("Total user accept =", count)

	return leaveAccept, errRaw
}

// GetUserReject ...
func (u *User) GetUserReject(supervisorID int64) ([]structLogic.LeaveReject, error) {
	var (
		leaveReject []structLogic.LeaveReject
		leave       structDB.LeaveRequest
		user        structDB.User
	)
	statusReject := constant.StatusRejectInSuperVisor

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUserReject", errQB)
		return leaveReject, errQB
	}

	qb.Select(leave.TableName()+".id",
		user.TableName()+".employee_number",
		user.TableName()+".name",
		user.TableName()+".gender",
		user.TableName()+".position",
		user.TableName()+".start_working_date",
		user.TableName()+".mobile_phone",
		user.TableName()+".email",
		user.TableName()+".role",
		leave.TableName()+".type_of_leave",
		leave.TableName()+".reason",
		leave.TableName()+".date_from",
		leave.TableName()+".date_to",
		leave.TableName()+".total",
		user.TableName()+".leave_remaining",
		leave.TableName()+".back_on",
		leave.TableName()+".address",
		leave.TableName()+".contact_leave",
		leave.TableName()+".status").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(user.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		Where(`status = ? `).And(`supervisor_id = ? `)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statusReject, supervisorID).QueryRows(&leaveReject)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select item @GetUserReject", errRaw)
		return leaveReject, errors.New("employee number not exist")
	}
	beego.Debug("Total user reject =", count)

	return leaveReject, errRaw
}

type info struct {
	Name       string
	ID         string
	Supervisor string
}

// AcceptBySupervisor ...
func (u *User) AcceptBySupervisor(id int64, employeeNumber int64) error {
	var (
		dbLeave       structDB.LeaveRequest
		dbUser        structDB.User
		superID       structLogic.GetSupervisorID
		getEmployee   structLogic.GetEmployee
		getSupervisor structLogic.GetSupervisor
		getDirector   structLogic.GetDirector
		getLeave      structLogic.GetLeave
	)

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @AcceptBySupervisor", errQB)
		return errQB
	}

	qb.Select(dbUser.TableName() + ".supervisor_id").
		From(dbUser.TableName()).
		InnerJoin(dbLeave.TableName()).
		On(dbUser.TableName() + ".employee_number" + "=" + dbLeave.TableName() + ".employee_number").
		Where(dbUser.TableName() + `.employee_number = ? `)
	sql := qb.String()

	errRawGet := o.Raw(sql, employeeNumber).QueryRow(&superID)
	if errRawGet != nil {
		helpers.CheckErr("Failed Query Select item @AcceptBySupervisor", errRawGet)
		return errRawGet
	}

	role := "director"
	o.Raw("SELECT name, email FROM users WHERE employee_number = ?", employeeNumber).QueryRow(&getEmployee)
	o.Raw("SELECT name, email FROM users WHERE employee_number = ?", superID.SupervisorID).QueryRow(&getSupervisor)
	o.Raw("SELECT id FROM leave_request WHERE id = ?", id).QueryRow(&getLeave)
	o.Raw("SELECT name, email FROM users WHERE role = ?", role).QueryRow(&getDirector)

	statAcceptSupervisor := constant.StatusSuccessInSupervisor
	approvedBy := getSupervisor.Name

	_, errRAW := o.Raw(`UPDATE `+dbLeave.TableName()+` SET status = ?, approved_by = ? WHERE id = ? AND employee_number = ?`, statAcceptSupervisor, approvedBy, id, employeeNumber).Exec()
	if errRAW != nil {
		helpers.CheckErr("error update status @AcceptBySupervisor", errRAW)
	}

	helpers.GoMailEmployee(getEmployee.Email, getLeave.ID, getEmployee.Name, getSupervisor.Name)
	helpers.GoMailDirector(getDirector.Email, getLeave.ID, getEmployee.Name, getSupervisor.Name, getDirector.Name)

	return errRAW
}

// RejectBySupervisor ...
func (u *User) RejectBySupervisor(reason string, id int64, employeeNumber int64) error {
	var (
		dbUser          structDB.User
		dbLeave         structDB.LeaveRequest
		getSupervisorID structLogic.GetSupervisorID
		getEmployee     structLogic.GetEmployee
		getSupervisor   structLogic.GetSupervisor
		getLeave        structLogic.GetLeave
	)
	statRejectSupervisor := constant.StatusRejectInSuperVisor
	o := orm.NewOrm()

	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @AcceptBySupervisor", errQB)
		return errQB
	}

	qb.Select(dbUser.TableName() + ".supervisor_id").
		From(dbUser.TableName()).
		InnerJoin(dbLeave.TableName()).
		On(dbUser.TableName() + ".employee_number" + "=" + dbLeave.TableName() + ".employee_number").
		Where(dbUser.TableName() + `.employee_number = ? `)
	sql := qb.String()

	errRawGet := o.Raw(sql, employeeNumber).QueryRow(&getSupervisorID)
	if errRawGet != nil {
		helpers.CheckErr("Failed Query Select item @AcceptBySupervisor", errRawGet)
		return errRawGet
	}

	o.Raw("SELECT name, email FROM users WHERE employee_number = ?", employeeNumber).QueryRow(&getEmployee)
	o.Raw("SELECT name, email FROM users WHERE employee_number = ?", getSupervisorID.SupervisorID).QueryRow(&getSupervisor)
	o.Raw("SELECT id FROM leave_request WHERE id = ?", id).QueryRow(&getLeave)

	helpers.GoMailSupervisorReject(getEmployee.Email, getLeave.ID, getEmployee.Name, getSupervisor.Name, reason)

	_, errRAW := o.Raw(`UPDATE `+dbLeave.TableName()+` SET status = ?, reject_reason = ? WHERE id = ? AND employee_number = ?`, statRejectSupervisor, reason, id, employeeNumber).Exec()
	if errRAW != nil {
		helpers.CheckErr("error update status @RejectBySupervisor", errRAW)
	}
	return errRAW
}
