package leave

import (
	"errors"
	"server/helpers"
	structDB "server/structs/db"

	"github.com/astaxie/beego"
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

// UpdateRequest ...
func (l *LeaveRequest) UpdateRequest(e *structDB.LeaveRequest, id int64) (err error) {
	o := orm.NewOrm()
	qb, errQB := orm.NewQueryBuilder("mysql")
	if errQB != nil {
		helpers.CheckErr("Query builder failed @UpdateRequest", errQB)
		return errQB
	}

	qb.Update(e.TableName()).
		Set("type_of_leave = ?",
			"reason = ?",
			"date_from = ?",
			"date_to = ?",
			"back_on = ?",
			"address = ?",
			"contact_leave = ?").Where("id = ? ")
	sql := qb.String()

	res, errRaw := o.Raw(sql,
		e.TypeOfLeave,
		e.Reason,
		e.DateFrom,
		e.DateTo,
		e.BackOn,
		e.Address,
		e.ContactLeave,
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
