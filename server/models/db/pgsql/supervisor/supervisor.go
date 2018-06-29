package user

import (
	"errors"
	"server/helpers"
	"server/helpers/constant"
	structDB "server/structs/db"
	structLogic "server/structs/logic"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

// Supervisor ...
type Supervisor struct{}

// GetUserPending ...
func (u *Supervisor) GetUserPending(supervisorID int64) ([]structLogic.LeavePending, error) {
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
		leave.TableName()+".from",
		leave.TableName()+".to",
		leave.TableName()+".total",
		leave.TableName()+".leave_remaining",
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
func (u *Supervisor) GetUserAccept(supervisorID int64) ([]structLogic.LeaveAccept, error) {
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
		leave.TableName()+".from",
		leave.TableName()+".to",
		leave.TableName()+".total",
		leave.TableName()+".leave_remaining",
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
func (u *Supervisor) GetUserReject(supervisorID int64) ([]structLogic.LeaveReject, error) {
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
		leave.TableName()+".from",
		leave.TableName()+".to",
		leave.TableName()+".total",
		leave.TableName()+".leave_remaining",
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

// AcceptBySupervisor ...
func (u *Supervisor) AcceptBySupervisor(id int64, employeeNumber int64) error {
	var (
		leave     structDB.LeaveRequest
		user      structDB.User
		superID   structLogic.GetSupervisorID
		superName structLogic.GetSupervisorName
	)

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUserPending", errQB)
		return errQB
	}

	qb.Select(user.TableName() + ".supervisor_id").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(user.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		Where(user.TableName() + `.employee_number = ? `)
	sql := qb.String()

	errRawGet := o.Raw(sql, employeeNumber).QueryRow(&superID)
	if errRawGet != nil {
		helpers.CheckErr("Failed Query Select item @GetUserPending", errRawGet)
		return errors.New("employee number not exist")
	}

	o.Raw("SELECT name FROM users WHERE employee_number = ?", superID.SupervisorID).QueryRow(&superName)

	statAcceptSupervisor := constant.StatusSuccessInSupervisor
	approvedBy := superName.Name

	_, errRAW := o.Raw(`UPDATE `+leave.TableName()+` SET status = ?, approved_by = ? WHERE id = ? AND employee_number = ?`, statAcceptSupervisor, approvedBy, id, employeeNumber).Exec()
	if errRAW != nil {
		helpers.CheckErr("error update status @AcceptBySupervisor", errRAW)
	}
	return errRAW
}

// RejectBySupervisor ...
func (u *Supervisor) RejectBySupervisor(id int64, employeeNumber int64) error {
	var leave structDB.LeaveRequest
	statRejectSupervisor := constant.StatusRejectInSuperVisor

	o := orm.NewOrm()
	_, errRAW := o.Raw(`UPDATE `+leave.TableName()+` SET status = ? WHERE id = ? AND employee_number = ?`, statRejectSupervisor, id, employeeNumber).Exec()
	if errRAW != nil {
		helpers.CheckErr("error update status @RejectBySupervisor", errRAW)
	}
	return errRAW
}
