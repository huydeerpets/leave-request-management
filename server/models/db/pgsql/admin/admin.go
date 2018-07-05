package admin

import (
	"errors"
	"server/helpers"
	"server/helpers/constant"
	structDB "server/structs/db"
	structLogic "server/structs/logic"

	"strings"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"golang.org/x/crypto/bcrypt"
)

// Admin ...
type Admin struct{}

// AddUser ...
func (u *Admin) AddUser(user structDB.User) error {
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
func (u *Admin) DeleteUser(employeeNumber int64) (err error) {
	o := orm.NewOrm()
	v := structDB.User{EmployeeNumber: employeeNumber}

	err = o.Read(&v)
	if err == nil {
		var num int64
		if num, err = o.Delete(&structDB.User{EmployeeNumber: employeeNumber}); err == nil {
			beego.Debug("Number of records deleted in database:", num)
		} else if err != nil {
			helpers.CheckErr("error deleted user @DeleteUser", err)
			return errors.New("error deleted user")
		}
	}
	if err != nil {
		helpers.CheckErr("error deleted user @DeleteUser", err)
		return errors.New("Delete failed, id not exist")
	}
	return err
}

// GetUsers ...
func (u *Admin) GetUsers() ([]structDB.User, error) {
	var (
		user  []structDB.User
		table structDB.User
		roles []string
	)
	roles = append(roles, "employee", "supervisor", "director")

	o := orm.NewOrm()
	count, err := o.Raw("SELECT * FROM "+table.TableName()+" WHERE role IN (?,?,?)", roles).QueryRows(&user)
	if err != nil {
		helpers.CheckErr("Failed get users @GetUsers", err)
		return user, err
	}
	beego.Debug("Total user =", count)

	return user, err
}

// GetUser ...
func (u *Admin) GetUser(employeeNumber int64) (result structDB.User, err error) {
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

// UpdateUser ...
func (u *Admin) UpdateUser(e *structDB.User, employeeNumber int64) (err error) {
	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @UpdateUser", errQB)
		return errQB
	}

	qb.Update(e.TableName()).
		Set("name = ?",
			"gender = ?",
			"position = ?",
			"start_working_date = ?",
			"mobile_phone = ?",
			"email= ?",
			"role = ?",
			"supervisor_id = ?").Where("employee_number = ? ")
	sql := qb.String()

	res, errRaw := o.Raw(sql,
		e.Name,
		e.Gender,
		e.Position,
		e.StartWorkingDate,
		e.MobilePhone,
		e.Email,
		e.Role,
		e.SupervisorID,
		employeeNumber).Exec()

	if errRaw != nil {
		helpers.CheckErr("err update @UpdateUser", errRaw)
		return errors.New("update user failed")
	}

	_, errRow := res.RowsAffected()
	if errRow != nil {
		helpers.CheckErr("error get rows affected", errRow)
		return errRow
	}

	return err
}

// GetLeaveRequest ...
func (u *Admin) GetLeaveRequest() ([]structLogic.RequestAccept, error) {
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
		helpers.CheckErr("Query builder failed @GetLeaveRequest", errQB)
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
		Where(`status = ? `)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statAcceptDirector).QueryRows(&reqAccept)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetLeaveRequest", errRaw)
		return reqAccept, errors.New("error get leave")
	}
	beego.Debug("Total accept request =", count)

	return reqAccept, errRaw
}

// UpdateLeaveRemaning ...
func (u *Admin) UpdateLeaveRemaning(total int64, employeeNumber int64) (err error) {
	var e *structDB.User
	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @UpdateUser", errQB)
		return errQB
	}

	qb.Update(e.TableName()).Set("leave_remaining = leave_remaining - ?").Where("employee_number = ? ")
	sql := qb.String()

	res, errRaw := o.Raw(sql, total, employeeNumber).Exec()

	if errRaw != nil {
		helpers.CheckErr("err update @UpdateUser", errRaw)
		return errors.New("update leave remaining failed")
	}

	_, errRow := res.RowsAffected()
	if errRow != nil {
		helpers.CheckErr("error get rows affected", errRow)
		return errRow
	}

	return err
}

// CreateUserTypeLeave ...
func (u *Admin) CreateUserTypeLeave(employeeNumber int64,
	typeLeaveID int64,
	leaveRemaining int64) error {

	var typeLeave structDB.UserTypeLeave

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @CreateUserTypeLeave", errQB)
		return errQB
	}

	qb.InsertInto(
		typeLeave.TableName(),
		"employee_number",
		"type_leave_id",
		"leave_remaining").
		Values("?, ?, ?")
	sql := qb.String()

	values := []interface{}{employeeNumber,
		typeLeaveID,
		leaveRemaining}
	_, err := o.Raw(sql, values).Exec()
	if err != nil {
		helpers.CheckErr("error insert @CreateUserTypeLeave", err)
		return errors.New("insert create leave request failed")
	}
	return err
}
