package user

import (
	"encoding/base64"
	"errors"
	"server/helpers"
	"server/helpers/constant"
	userLogic "server/models/db/pgsql/admin"
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
func (u *User) GetJWT(loginData *structAPI.ReqLogin) (result structAPI.RespLogin, err error) {
	var (
		user      structDB.User
		RespLogin structAPI.RespLogin
	)

	o := orm.NewOrm()
	errRaw := o.Raw(`SELECT * FROM `+user.TableName()+` WHERE email = ?`, loginData.Email).QueryRow(&user)
	if errRaw != nil {
		helpers.CheckErr("error get users @GetJWT", errRaw)
		return RespLogin, errors.New("Email not register")
	}

	hashBytes, _ := base64.StdEncoding.DecodeString(user.Password)

	errCompare := bcrypt.CompareHashAndPassword(hashBytes, []byte(loginData.Password))
	if errCompare != nil {
		helpers.CheckErr("error compare password @GetJWT", errCompare)
		return RespLogin, errors.New("Wrong password")
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

// ForgotPassword ...
func (u *User) ForgotPassword(e *structLogic.PasswordReset) error {
	var count int
	var getEmployee structLogic.GetEmployee
	var user structDB.User
	passwordReset := "JDJhJDEwJGtLeW42RFBOOEt2WUdpMlZHdHJ6bnVqY0gyU0lYUFNBMFVDQ0VQMW1kSWRIcHRmdWRsTmJl"

	o := orm.NewOrm()
	o.Raw(`SELECT count(*) as Count FROM `+user.TableName()+` WHERE email = ?`, e.Email).QueryRow(&count)
	o.Raw(`SELECT name, email FROM `+user.TableName()+` WHERE email = ?`, e.Email).QueryRow(&getEmployee)

	if count == 0 {
		return errors.New("email not register")
	} else {
		_, errRAW := o.Raw(`UPDATE `+user.TableName()+` SET password = ? WHERE email = ?`, passwordReset, e.Email).Exec()
		if errRAW != nil {
			helpers.CheckErr("error forgot password @ForgotPassword", errRAW)
		}

		helpers.GoMailForgotPassword(getEmployee.Email, getEmployee.Name)
		return errRAW
	}
	// return error
}

// UpdatePassword ...
func (u *User) UpdatePassword(p *structLogic.NewPassword, employeeNumber int64) (err error) {
	var user structDB.User
	var admin userLogic.Admin

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @UpdatePassword", errQB)
		return errQB
	}

	bsNewPassword := []byte(p.NewPassword)
	bsConfirmPassword := []byte(p.ConfirmPassword)

	resGet, _ := admin.GetUser(employeeNumber)
	resComparePassword := helpers.ComparePassword(resGet.Password, p.OldPassword)

	if resComparePassword == true {
		if len(bsNewPassword) < 7 && len(bsConfirmPassword) < 7 {
			return errors.New("Password length minimum must be 7")
		} else if p.NewPassword == p.ConfirmPassword {
			qb.Update(user.TableName()).Set("password = ?").
				Where(`employee_number = ?`)
			sql := qb.String()

			resPassword, errHash := helpers.HashPassword(p.NewPassword)
			if errHash != nil {
				helpers.CheckErr("err hash password @UpdatePassword", errHash)
			}

			res, errRaw := o.Raw(sql, resPassword, employeeNumber).Exec()

			if errRaw != nil {
				helpers.CheckErr("err update password @UpdatePassword", errRaw)
				return errors.New("update password failed")
			}

			_, errRow := res.RowsAffected()
			if errRow != nil {
				helpers.CheckErr("error get rows affected", errRow)
				return errRow
			}
		} else {
			return errors.New("wrong confirm password")
		}

	} else {
		return errors.New("wrong old password")
	}

	return err
}

// GetPendingRequest ...
func (u *User) GetPendingRequest(employeeNumber int64) ([]structLogic.RequestPending, error) {
	var (
		reqPending    []structLogic.RequestPending
		user          structDB.User
		leave         structDB.LeaveRequest
		typeLeave     structDB.TypeLeave
		userTypeLeave structDB.UserTypeLeave
	)

	statPendingSupervisor := constant.StatusPendingInSupervisor
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
		typeLeave.TableName()+".type_name",
		userTypeLeave.TableName()+".leave_remaining",
		leave.TableName()+".reason",
		leave.TableName()+".date_from",
		leave.TableName()+".date_to",
		leave.TableName()+".half_dates",
		leave.TableName()+".total",
		leave.TableName()+".back_on",
		leave.TableName()+".contact_address",
		leave.TableName()+".contact_number",
		leave.TableName()+".status",
		leave.TableName()+".action_by").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(user.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		InnerJoin(typeLeave.TableName()).
		On(typeLeave.TableName() + ".id" + "=" + leave.TableName() + ".type_leave_id").
		InnerJoin(userTypeLeave.TableName()).
		On(userTypeLeave.TableName() + ".type_leave_id" + "=" + leave.TableName() + ".type_leave_id").
		And(userTypeLeave.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		Where(`(status = ? OR status = ? )`).And(user.TableName() + `.employee_number = ? `).
		OrderBy(leave.TableName() + ".created_at DESC")
	sql := qb.String()

	count, errRaw := o.Raw(sql, statPendingSupervisor, statPendingDirector, employeeNumber).QueryRows(&reqPending)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetDirectorPendingRequest", errRaw)
		return reqPending, errors.New("error get leave request pending")
	}
	beego.Debug("Total pending request =", count)

	return reqPending, errRaw
}

// GetAcceptRequest ...
func (u *User) GetAcceptRequest(employeeNumber int64) ([]structLogic.RequestAccept, error) {
	var (
		reqAccept     []structLogic.RequestAccept
		user          structDB.User
		leave         structDB.LeaveRequest
		typeLeave     structDB.TypeLeave
		userTypeLeave structDB.UserTypeLeave
	)

	statAcceptDirector := constant.StatusSuccessInDirector
	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetDirectorPendingRequest", errQB)
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
		typeLeave.TableName()+".type_name",
		userTypeLeave.TableName()+".leave_remaining",
		leave.TableName()+".reason",
		leave.TableName()+".date_from",
		leave.TableName()+".date_to",
		leave.TableName()+".half_dates",
		leave.TableName()+".total",
		leave.TableName()+".back_on",
		leave.TableName()+".contact_address",
		leave.TableName()+".contact_number",
		leave.TableName()+".status",
		leave.TableName()+".action_by").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(user.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		InnerJoin(typeLeave.TableName()).
		On(typeLeave.TableName() + ".id" + "=" + leave.TableName() + ".type_leave_id").
		InnerJoin(userTypeLeave.TableName()).
		On(userTypeLeave.TableName() + ".type_leave_id" + "=" + leave.TableName() + ".type_leave_id").
		And(userTypeLeave.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		Where(`status = ?`).And(user.TableName() + `.employee_number = ? `).
		OrderBy(leave.TableName() + ".created_at DESC")
	sql := qb.String()

	count, errRaw := o.Raw(sql, statAcceptDirector, employeeNumber).QueryRows(&reqAccept)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetDirectorPendingRequest", errRaw)
		return reqAccept, errors.New("error get leave request pending")
	}
	beego.Debug("Total accept request =", count)

	return reqAccept, errRaw
}

// GetRejectRequest ...
func (u *User) GetRejectRequest(employeeNumber int64) ([]structLogic.RequestReject, error) {
	var (
		reqReject     []structLogic.RequestReject
		user          structDB.User
		leave         structDB.LeaveRequest
		typeLeave     structDB.TypeLeave
		userTypeLeave structDB.UserTypeLeave
	)

	statRejectSupervisor := constant.StatusRejectInSuperVisor
	statRejectDirector := constant.StatusRejectInDirector

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetDirectorPendingRequest", errQB)
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
		typeLeave.TableName()+".type_name",
		userTypeLeave.TableName()+".leave_remaining",
		leave.TableName()+".reason",
		leave.TableName()+".date_from",
		leave.TableName()+".date_to",
		leave.TableName()+".half_dates",
		leave.TableName()+".total",
		leave.TableName()+".back_on",
		leave.TableName()+".contact_address",
		leave.TableName()+".contact_number",
		leave.TableName()+".status",
		leave.TableName()+".reject_reason",
		leave.TableName()+".action_by").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(user.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		InnerJoin(typeLeave.TableName()).
		On(typeLeave.TableName() + ".id" + "=" + leave.TableName() + ".type_leave_id").
		InnerJoin(userTypeLeave.TableName()).
		On(userTypeLeave.TableName() + ".type_leave_id" + "=" + leave.TableName() + ".type_leave_id").
		And(userTypeLeave.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		Where(`(status = ? OR status = ? )`).And(user.TableName() + `.employee_number = ? `).
		OrderBy(leave.TableName() + ".created_at DESC")
	sql := qb.String()

	count, errRaw := o.Raw(sql, statRejectSupervisor, statRejectDirector, employeeNumber).QueryRows(&reqReject)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetDirectorPendingRequest", errRaw)
		return reqReject, errors.New("error get leave request pending")
	}
	beego.Debug("Total reject request =", count)

	return reqReject, errRaw
}

// GetDirector ...
func (u *User) GetDirector() (result structLogic.GetDirector, err error) {
	var dbUser structDB.User
	role := "director"

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetDirector", errQB)
		return result, errQB
	}

	qb.Select(
		dbUser.TableName()+".name",
		dbUser.TableName()+".email").
		From(dbUser.TableName()).
		Where(dbUser.TableName() + `.role = ? `)
	qb.Limit(1)
	sql := qb.String()

	errRaw := o.Raw(sql, role).QueryRow(&result)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetDirector", errRaw)
		return result, errors.New("employee number not exist")
	}
	return result, err
}

// GetSupervisor ...
func (u *User) GetSupervisor(employeeNumber int64) (result structLogic.GetSupervisor, err error) {
	var (
		dbUser  structDB.User
		dbLeave structDB.LeaveRequest
	)

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetSupervisor", errQB)
		return result, errQB
	}

	qb.Select(
		dbUser.TableName()+".supervisor_id",
		dbUser.TableName()+".name",
		dbUser.TableName()+".email").
		From(dbUser.TableName()).
		InnerJoin(dbLeave.TableName()).
		On(dbUser.TableName() + ".employee_number" + "=" + dbLeave.TableName() + ".employee_number").
		Where(dbUser.TableName() + `.employee_number = ? `)
	qb.Limit(1)
	sql := qb.String()

	errRaw := o.Raw(sql, employeeNumber).QueryRow(&result)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetSupervisor", errRaw)
		return result, errors.New("employee number not exist")
	}
	return result, err
}

// GetEmployee ...
func (u *User) GetEmployee(employeeNumber int64) (result structLogic.GetEmployee, err error) {
	var dbUser structDB.User

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetEmployee", errQB)
		return result, errQB
	}

	qb.Select(
		dbUser.TableName()+".name",
		dbUser.TableName()+".email").
		From(dbUser.TableName()).
		Where(dbUser.TableName() + `.employee_number = ? `)
	qb.Limit(1)
	sql := qb.String()

	errRaw := o.Raw(sql, employeeNumber).QueryRow(&result)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetEmployee", errRaw)
		return result, errors.New("employee number not exist")
	}
	return result, err
}

// GetSupervisors ...
func (u *User) GetSupervisors() (result []structLogic.GetSupervisors, err error) {
	var dbSupervisor structDB.User

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetSupervisors", errQB)
		return result, errQB
	}

	qb.Select(
		dbSupervisor.TableName()+".employee_number",
		dbSupervisor.TableName()+".name").
		From(dbSupervisor.TableName()).
		Where(`role = ? `)
	sql := qb.String()
	role := "supervisor"

	_, errRaw := o.Raw(sql, role).QueryRows(&result)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetSupervisors", errRaw)
		return result, errors.New("error get")
	}
	return result, err
}

// GetTypeLeave ...
func (u *User) GetTypeLeave() (result []structDB.TypeLeave, err error) {
	var dbType structDB.TypeLeave

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetTypeLeave", errQB)
		return result, errQB
	}

	qb.Select(
		dbType.TableName()+".id",
		dbType.TableName()+".type_name").
		From(dbType.TableName())
	sql := qb.String()

	_, errRaw := o.Raw(sql).QueryRows(&result)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetTypeLeave", errRaw)
		return result, errors.New("error get")
	}
	return result, err
}

// GetSumarry ...
func (u *User) GetSumarry(employeeNumber int64) ([]structLogic.UserSumarry, error) {
	var (
		sumarry   []structLogic.UserSumarry
		leave     structDB.LeaveRequest
		typeLeave structDB.TypeLeave
		// userTypeLeave structDB.UserTypeLeave
		// user          structDB.User
	)

	statSuccessInDirector := constant.StatusSuccessInDirector

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetSumarry", errQB)
		return sumarry, errQB
	}

	qb.Select(
		typeLeave.TableName()+".type_name",
		"SUM("+leave.TableName()+".total) as used").
		From(leave.TableName()).
		InnerJoin(typeLeave.TableName()).
		On(typeLeave.TableName() + ".id" + " = " + leave.TableName() + ".type_leave_id").
		Where(leave.TableName() + `.employee_number = ? `).
		And(leave.TableName() + `.status = ?`).
		GroupBy(typeLeave.TableName() + `.type_name`)
	sql := qb.String()

	_, errRaw := o.Raw(sql, employeeNumber, statSuccessInDirector).QueryRows(&sumarry)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetSumarry", errRaw)
		return sumarry, errors.New("error get user summary")
	}

	return sumarry, errRaw
}

// GetUserTypeLeave ...
func (u *User) GetUserTypeLeave(employeeNumber int64) (result []structLogic.UserTypeLeave, err error) {
	var (
		dbType        structDB.TypeLeave
		userTypeLeave structDB.UserTypeLeave
	)

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUserTypeLeave", errQB)
		return result, errQB
	}

	qb.Select(
		dbType.TableName()+".type_name",
		userTypeLeave.TableName()+".leave_remaining").
		From(dbType.TableName()).
		InnerJoin(userTypeLeave.TableName()).
		On(userTypeLeave.TableName() + ".type_leave_id" + " = " + dbType.TableName() + ".id").
		Where(userTypeLeave.TableName() + `.employee_number = ? `)
	sql := qb.String()

	_, errRaw := o.Raw(sql, employeeNumber).QueryRows(&result)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetUserTypeLeave", errRaw)
		return result, errors.New("error get")
	}
	return result, err
}

// GetUserLeaveRemaining ...
func (u *User) GetUserLeaveRemaining(typeID int64, employeeNumber int64) (result structLogic.UserTypeLeave, err error) {
	var (
		dbType        structDB.TypeLeave
		userTypeLeave structDB.UserTypeLeave
	)

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUserLeaveRemaining", errQB)
		return result, errQB
	}

	qb.Select(
		dbType.TableName()+".type_name",
		userTypeLeave.TableName()+".leave_remaining").
		From(userTypeLeave.TableName()).
		InnerJoin(dbType.TableName()).
		On(dbType.TableName() + ".id" + " = " + userTypeLeave.TableName() + ".type_leave_id").
		Where(userTypeLeave.TableName() + `.type_leave_id = ? `).And(userTypeLeave.TableName() + `.employee_number = ? `)
	sql := qb.String()

	errRaw := o.Raw(sql, typeID, employeeNumber).QueryRow(&result)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetUserLeaveRemaining", errRaw)
		return result, errors.New("error get")
	}
	return result, err
}
