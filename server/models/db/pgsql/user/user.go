package user

import (
	"errors"
	"server/helpers"
	"server/helpers/constant"
	structAPI "server/structs/api"
	structDB "server/structs/db"
	structLogic "server/structs/logic"

	"strings"

	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"golang.org/x/crypto/bcrypt"
)

// User ...
type User struct{}

// AddUser ...
func (u *User) AddUser(user structDB.User) error {
	var count int
	o := orm.NewOrm()

	o.Raw(`SELECT count(*) as Count FROM `+user.TableName()+` WHERE email = ?`, user.Email).QueryRow(&count)

	if count > 0 {
		return errors.New("Email already register")
	} else {
		hash, errHash := bcrypt.GenerateFromPassword([]byte(user.Password), 5)
		if errHash != nil {
			helpers.CheckErr("error hash password @AddUser", errHash)
		}

		user.Email = strings.ToLower(user.Email)
		user.Password = string(hash)

		_, err := o.Insert(&user)
		if err != nil {
			helpers.CheckErr("error insert @AddUser", err)
			return errors.New("insert users failed")
		}
		return err
	}
}

// DeleteUser ...
func (u *User) DeleteUser(employeeNumber int64) (err error) {
	o := orm.NewOrm()
	v := structDB.User{EmployeeNumber: employeeNumber}

	err = o.Read(&v)
	if err == nil {
		var num int64
		if num, err = o.Delete(&structDB.User{EmployeeNumber: employeeNumber}); err == nil {
			beego.Debug("Number of records deleted in database:", num)
		} else if err != nil {
			helpers.CheckErr("error deleted item @DeleteItem", err)
			return errors.New("error deleted item")
		}
	}
	if err != nil {
		helpers.CheckErr("error deleted item @DeleteItem", err)
		return errors.New("Delete failed, id not exist")
	}
	return err
}

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

// GetAllUser ...
func (u *User) GetAllUser() ([]structDB.User, error) {
	var (
		user  []structDB.User
		table structDB.User
		roles []string
	)
	roles = append(roles, "employee", "supervisor", "director")

	o := orm.NewOrm()
	count, err := o.Raw("SELECT * FROM "+table.TableName()+" WHERE role IN (?,?,?)", roles).QueryRows(&user)
	if err != nil {
		helpers.CheckErr("Failed get all user @GetAllUser", err)
		return user, err
	}
	beego.Debug("Total user =", count)

	return user, err
}

// GetUser ...
func (u *User) GetUser(employeeNumber int64) (result structDB.User, err error) {
	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUser", errQB)
		return result, errQB
	}

	qb.Select("*").From(result.TableName()).
		Where(`employee_number = ? `)
	qb.Limit(1)
	sql := qb.String()

	errRaw := o.Raw(sql, employeeNumber).QueryRow(&result)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select item @GetUser", errRaw)
		return result, errors.New("employeeNumber not exist")
	}
	return result, err
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
		leave.TableName()+".from",
		leave.TableName()+".to",
		leave.TableName()+".total",
		leave.TableName()+".leave_remaining",
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
func (u *User) AcceptBySupervisor(id int64, employeeNumber int64) error {
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
func (u *User) RejectBySupervisor(id int64, employeeNumber int64) error {
	var leave structDB.LeaveRequest
	statRejectSupervisor := constant.StatusRejectInSuperVisor

	o := orm.NewOrm()
	_, errRAW := o.Raw(`UPDATE `+leave.TableName()+` SET status = ? WHERE id = ? AND employee_number = ?`, statRejectSupervisor, id, employeeNumber).Exec()
	if errRAW != nil {
		helpers.CheckErr("error update status @RejectBySupervisor", errRAW)
	}
	return errRAW
}
