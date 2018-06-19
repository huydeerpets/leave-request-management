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
func (l *LeaveRequest) CreateLeaveRequest(leave structDB.LeaveRequest) error {
	o := orm.NewOrm()

	_, err := o.Insert(&leave)
	if err != nil {
		helpers.CheckErr("error insert @CreateLeaveRequest", err)
		return errors.New("insert create leave request failed")
	}
	return err

}
