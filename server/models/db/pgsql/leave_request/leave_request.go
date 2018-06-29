package leave

import (
	"errors"
	"server/helpers"
	structDB "server/structs/db"

	"github.com/astaxie/beego/orm"
)

// LeaveRequest ...
type LeaveRequest struct{}

// CreateLeaveRequest ...
func (l *LeaveRequest) CreateLeaveRequest(employeeNumber int64,
	typeOfLeave string,
	reason string,
	dateFrom string,
	dateTo string,
	backOn string,
	total int64,
	address string,
	contactLeave string,
	status string) error {

	var leave structDB.LeaveRequest
	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUserPending", errQB)
		return errQB
	}

	qb.InsertInto(
		leave.TableName(),
		"employee_number",
		"type_of_leave",
		"reason",
		"date_from",
		"date_to",
		"back_on",
		"total",
		"address",
		"contact_leave",
		"status").
		Values("?, ?, ?, ?, ?, ?, ?, ?, ?, ?")
	sql := qb.String()
	values := []interface{}{employeeNumber,
		typeOfLeave,
		reason,
		dateFrom,
		dateTo,
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
	return err
}

// CreateLeaveRequestSupervisor ...
func (l *LeaveRequest) CreateLeaveRequestSupervisor(employeeNumber int64,
	typeOfLeave string,
	reason string,
	dateFrom string,
	dateTo string,
	backOn string,
	total int64,
	address string,
	contactLeave string,
	status string) error {

	var leave structDB.LeaveRequest
	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @GetUserPending", errQB)
		return errQB
	}

	qb.InsertInto(
		leave.TableName(),
		"employee_number",
		"type_of_leave",
		"reason",
		"date_from",
		"date_to",
		"back_on",
		"total",
		"address",
		"contact_leave",
		"status").
		Values("?, ?, ?, ?, ?, ?, ?, ?, ?, ?")
	sql := qb.String()
	values := []interface{}{employeeNumber,
		typeOfLeave,
		reason,
		dateFrom,
		dateTo,
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
	return err
}
