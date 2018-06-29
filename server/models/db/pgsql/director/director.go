package director

import (
	"errors"
	"server/helpers"
	"server/helpers/constant"
	structDB "server/structs/db"
	structLogic "server/structs/logic"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

// Director ...
type Director struct{}

// AcceptByDirector ...
func (u *Director) AcceptByDirector(id int64, employeeNumber int64) error {
	var (
		leave        structDB.LeaveRequest
		user         structDB.User
		directorID   structLogic.GetDirectorID
		directorName structLogic.GetDirectorName
	)

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @AcceptByDirector", errQB)
		return errQB
	}

	qb.Select(user.TableName() + ".employee_number").
		From(user.TableName()).
		Where(user.TableName() + `.employee_number = ? `)
	sql := qb.String()

	errRawGet := o.Raw(sql, employeeNumber).QueryRow(&directorID)
	if errRawGet != nil {
		helpers.CheckErr("Failed Query Select @AcceptByDirector", errRawGet)
		return errors.New("employee number not exist")
	}

	o.Raw("SELECT name FROM users WHERE employee_number = ?", directorID.DirectorID).QueryRow(&directorName)

	statAcceptDirector := constant.StatusSuccessInDirector
	approvedBy := directorName.Name

	_, errRAW := o.Raw(`UPDATE `+leave.TableName()+` SET status = ?, approved_by = ? WHERE id = ? AND employee_number = ?`, statAcceptDirector, approvedBy, id, employeeNumber).Exec()
	if errRAW != nil {
		helpers.CheckErr("error update status @AcceptByDirector", errRAW)
	}
	return errRAW
}

// RejectByDirector ...
func (u *Director) RejectByDirector(id int64, employeeNumber int64) error {
	var leave structDB.LeaveRequest
	statRejectDirector := constant.StatusRejectInDirector

	o := orm.NewOrm()
	_, errRAW := o.Raw(`UPDATE `+leave.TableName()+` SET status = ? WHERE id = ? AND employee_number = ?`, statRejectDirector, id, employeeNumber).Exec()
	if errRAW != nil {
		helpers.CheckErr("error update status @RejectByDirector", errRAW)
	}
	return errRAW
}

// GetDirectorPendingRequest ...
func (u *Director) GetDirectorPendingRequest() ([]structLogic.RequestPending, error) {
	var (
		reqPending []structLogic.RequestPending
		leave      structDB.LeaveRequest
		user       structDB.User
	)
	statAcceptSupervisor := constant.StatusSuccessInSupervisor
	statPendingDirector := constant.StatusPendingInDirector

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetDirectorPendingRequest", errQB)
		return reqPending, errQB
	}

	qb.Select(
		leave.TableName()+".id",
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
		leave.TableName()+".back_on",
		leave.TableName()+".total",
		leave.TableName()+".leave_remaining",
		leave.TableName()+".address",
		leave.TableName()+".contact_leave",
		leave.TableName()+".status").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(leave.TableName() + ".employee_number" + "=" + user.TableName() + ".employee_number").
		Where(`(status = ? OR status = ? )`)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statAcceptSupervisor, statPendingDirector).QueryRows(&reqPending)
	if errRaw != nil {
		helpers.CheckErr("Failed Query get @GetDirectorPendingRequest", errRaw)
		return reqPending, errors.New("employee number not exist")
	}
	beego.Debug("Total pending request =", count)

	return reqPending, errRaw
}

// GetDirectorAcceptRequest ...
func (u *Director) GetDirectorAcceptRequest() ([]structLogic.RequestAccept, error) {
	var (
		reqAccept []structLogic.RequestAccept
		leave     structDB.LeaveRequest
		user      structDB.User
	)
	statAcceptDirector := constant.StatusSuccessInDirector

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetDirectorAcceptRequest", errQB)
		return reqAccept, errQB
	}

	qb.Select(
		leave.TableName()+".id",
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
		leave.TableName()+".back_on",
		leave.TableName()+".total",
		leave.TableName()+".leave_remaining",
		leave.TableName()+".address",
		leave.TableName()+".contact_leave",
		leave.TableName()+".status").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(leave.TableName() + ".employee_number" + "=" + user.TableName() + ".employee_number").
		Where(`status = ? `)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statAcceptDirector).QueryRows(&reqAccept)
	if errRaw != nil {
		helpers.CheckErr("Failed Query get @GetDirectorAcceptRequest", errRaw)
		return reqAccept, errors.New("employee number not exist")
	}
	beego.Debug("Total accept request =", count)

	return reqAccept, errRaw
}

// GetDirectorRejectRequest ...
func (u *Director) GetDirectorRejectRequest() ([]structLogic.RequestReject, error) {
	var (
		reqReject []structLogic.RequestReject
		leave     structDB.LeaveRequest
		user      structDB.User
	)
	statRejectDirector := constant.StatusRejectInDirector

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetDirectorRejectRequest", errQB)
		return reqReject, errQB
	}

	qb.Select(
		leave.TableName()+".id",
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
		leave.TableName()+".back_on",
		leave.TableName()+".total",
		leave.TableName()+".leave_remaining",
		leave.TableName()+".address",
		leave.TableName()+".contact_leave",
		leave.TableName()+".status").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(leave.TableName() + ".employee_number" + "=" + user.TableName() + ".employee_number").
		Where(`status = ? `)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statRejectDirector).QueryRows(&reqReject)
	if errRaw != nil {
		helpers.CheckErr("Failed Query get @GetDirectorRejectRequest", errRaw)
		return reqReject, errors.New("employee number not exist")
	}
	beego.Debug("Total reject request =", count)

	return reqReject, errRaw
}
