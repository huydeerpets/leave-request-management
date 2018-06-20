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
	roles = append(roles, "employer", "supervisor", "director")

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

	qb.Select(user.TableName()+".employee_number",
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
		leave.TableName()+".address",
		leave.TableName()+".contact_leave").
		From(user.TableName()).
		InnerJoin(leave.TableName()).
		On(user.TableName() + ".employee_number" + "=" + leave.TableName() + ".employee_number").
		Where(`status = ? `).And(`supervisor_id = ? `)
	qb.Limit(1)
	sql := qb.String()

	count, errRaw := o.Raw(sql, statusPending, supervisorID).QueryRows(&leavePending)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select item @GetUserPending", errRaw)
		return leavePending, errors.New("employeeNumber not exist")
	}
	beego.Debug("Total transaction item =", count)

	return leavePending, errRaw
}
