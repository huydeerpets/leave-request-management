package leave

import (
	"errors"
	"server/helpers"
	logicUser "server/models/db/pgsql/user"
	structAPI "server/structs/api"
	structDB "server/structs/db"
	structLogic "server/structs/logic"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

// LeaveRequest ...
type LeaveRequest struct{}

// CreateLeaveRequest ...
func (l *LeaveRequest) CreateLeaveRequest(employeeNumber int64,
	typeLeaveID int64,
	reason string,
	dateFrom string,
	dateTo string,
	halfDates []string,
	backOn string,
	total float64,
	address string,
	contactLeave string,
	status string) error {

	var leave structDB.LeaveRequest
	var user logicUser.User
	isHalfDay := helpers.ArrayToString(halfDates, ",")

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUserPending", errQB)
		return errQB
	}

	qb.InsertInto(
		leave.TableName(),
		"employee_number",
		"type_leave_id",
		"reason",
		"date_from",
		"date_to",
		"half_dates",
		"back_on",
		"total",
		"contact_address",
		"contact_number",
		"status").
		Values("?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?")
	sql := qb.String()

	values := []interface{}{employeeNumber,
		typeLeaveID,
		reason,
		dateFrom,
		dateTo,
		"{" + isHalfDay + "}",
		backOn,
		total,
		address,
		contactLeave,
		status}
	_, err := o.Raw(sql, values).Exec()
	if err != nil {
		helpers.CheckErr("error insert @CreateLeaveRequestEmployee", err)
		return errors.New("insert create leave request failed")
	}

	getEmployee, _ := user.GetEmployee(employeeNumber)
	getSupervisorID, _ := user.GetSupervisor(employeeNumber)
	getSupervisor, _ := user.GetEmployee(getSupervisorID.SupervisorID)

	defer helpers.GoMailSupervisor(getSupervisor.Email, getEmployee.Name, getSupervisor.Name)

	return err
}

// CreateLeaveRequestSupervisor ...
func (l *LeaveRequest) CreateLeaveRequestSupervisor(employeeNumber int64,
	typeLeaveID int64,
	reason string,
	dateFrom string,
	dateTo string,
	halfDates []string,
	backOn string,
	total float64,
	address string,
	contactLeave string,
	status string) error {

	var leave structDB.LeaveRequest
	var user logicUser.User
	isHalfDay := helpers.ArrayToString(halfDates, ",")

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUserPending", errQB)
		return errQB
	}

	qb.InsertInto(
		leave.TableName(),
		"employee_number",
		"type_leave_id",
		"reason",
		"date_from",
		"date_to",
		"half_dates",
		"back_on",
		"total",
		"contact_address",
		"contact_number",
		"status").
		Values("?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?")
	sql := qb.String()

	values := []interface{}{employeeNumber,
		typeLeaveID,
		reason,
		dateFrom,
		dateTo,
		"{" + isHalfDay + "}",
		backOn,
		total,
		address,
		contactLeave,
		status}
	_, err := o.Raw(sql, values).Exec()
	if err != nil {
		helpers.CheckErr("error insert @CreateLeaveRequestSupervisor", err)
		return errors.New("insert create leave request failed")
	}

	getEmployee, _ := user.GetEmployee(employeeNumber)
	getDirector, _ := user.GetDirector()

	helpers.GoMailSupervisor(getDirector.Email, getEmployee.Name, getDirector.Name)

	return err
}

// UpdateRequest ...
func (l *LeaveRequest) UpdateRequest(e *structAPI.UpdateLeaveRequest, id int64) (err error) {
	var dbLeave structDB.LeaveRequest
	isHalfDay := helpers.ArrayToString(e.HalfDates, ",")
	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @UpdateRequest", errQB)
		return errQB
	}

	qb.Update(dbLeave.TableName()).
		Set("type_leave_id = ?",
			"reason = ?",
			"date_from = ?",
			"date_to = ?",
			"half_dates = ?",
			"back_on = ?",
			"total",
			"contact_address = ?",
			"contact_number = ?").Where("id = ? ")
	sql := qb.String()

	res, errRaw := o.Raw(sql,
		e.TypeLeaveID,
		e.Reason,
		e.DateFrom,
		e.DateTo,
		isHalfDay,
		e.BackOn,
		e.Total,
		e.ContactAddress,
		e.ContactNumber,
		id).Exec()

	if errRaw != nil {
		helpers.CheckErr("err update @UpdateRequest", errRaw)
		return errors.New("update request failed")
	}

	_, errRow := res.RowsAffected()
	if errRow != nil {
		helpers.CheckErr("error get rows affected", errRow)
		return errRow
	}

	return err
}

// DeleteRequest ...
func (l *LeaveRequest) DeleteRequest(id int64) (err error) {
	o := orm.NewOrm()
	v := structDB.LeaveRequest{ID: id}

	err = o.Read(&v)
	if err == nil {
		var num int64
		if num, err = o.Delete(&structDB.LeaveRequest{ID: id}); err == nil {
			beego.Debug("Number of records deleted in database:", num)
		} else if err != nil {
			helpers.CheckErr("error deleted @DeleteRequest", err)
			return errors.New("error deleted leave request")
		}
	}
	if err != nil {
		helpers.CheckErr("error deleted @DeleteRequest", err)
		return errors.New("Delete failed, id not exist")
	}
	return err
}

// GetLeave ...
func (l *LeaveRequest) GetLeave(id int64) (result structLogic.GetLeave, err error) {
	var dbLeave structDB.LeaveRequest

	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetLeave", errQB)
		return result, errQB
	}

	qb.Select(dbLeave.TableName()+".id",
		dbLeave.TableName()+".type_leave_id",
		dbLeave.TableName()+".total").
		From(dbLeave.TableName()).
		Where(dbLeave.TableName() + `.id = ? `)
	qb.Limit(1)
	sql := qb.String()

	errRaw := o.Raw(sql, id).QueryRow(&result)
	if errRaw != nil {
		helpers.CheckErr("Failed Query Select @GetLeave", errRaw)
		return result, errors.New("id not exist")
	}
	return result, err
}
