package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"server/helpers"
	"server/helpers/constant"
	"strconv"

	user "server/models/db/pgsql/admin"
	db "server/models/db/pgsql/leave_request"

	structAPI "server/structs/api"
	structDB "server/structs/db"

	"github.com/astaxie/beego"
)

//LeaveController ...
type LeaveController struct {
	beego.Controller
}

// PostLeaveRequest ...
func (c *LeaveController) PostLeaveRequest() {
	var (
		resp    structAPI.RespData
		req     structAPI.ReqLeave
		dbLeave db.LeaveRequest
		dbUser  user.Admin
	)
	idStr := c.Ctx.Input.Param(":id")
	employeeNumber, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @PostLeaveRequest", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	body := c.Ctx.Input.RequestBody
	fmt.Println("Create form leave=======>", string(body))

	errMarshal := json.Unmarshal(body, &req)
	if errMarshal != nil {
		helpers.CheckErr("unmarshall req body failed @PostLeaveRequest", errMarshal)
		resp.Error = errors.New("type request malform").Error()
		c.Ctx.Output.SetStatus(400)
		c.Ctx.Output.JSON(resp, false, false)
		return
	}

	leave := structAPI.CreateLeaveRequest{
		EmployeeNumber: employeeNumber,
		TypeOfLeave:    req.TypeOfLeave,
		Reason:         req.Reason,
		DateFrom:       req.DateFrom,
		DateTo:         req.DateTo,
		Total:          helpers.GetTotalDay(req.DateFrom, req.DateTo),
		BackOn:         req.BackOn,
		Address:        req.Address,
		ContactLeave:   req.ContactLeave,
		Status:         constant.StatusPendingInSupervisor,
	}

	errUp := dbUser.UpdateLeaveRemaning(leave.Total, leave.EmployeeNumber)
	if errUp != nil {
		helpers.CheckErr("err update @PostLeaveRequest", errUp)
	}

	errAddLeave := dbLeave.CreateLeaveRequest(
		leave.EmployeeNumber,
		leave.TypeOfLeave,
		leave.Reason,
		leave.DateFrom,
		leave.DateTo,
		leave.BackOn,
		leave.Total,
		leave.Address,
		leave.ContactLeave,
		leave.Status,
	)
	if errAddLeave != nil {
		resp.Error = errAddLeave.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = leave
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @PostLeaveRequest", err)
	}
}

// PostLeaveRequestSupervisor ...
func (c *LeaveController) PostLeaveRequestSupervisor() {
	var (
		resp    structAPI.RespData
		req     structAPI.ReqLeave
		dbLeave db.LeaveRequest
		dbUser  user.Admin
	)
	idStr := c.Ctx.Input.Param(":id")
	employeeNumber, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @PostLeaveRequestSupervisor", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	body := c.Ctx.Input.RequestBody
	fmt.Println("Create form leave=======>", string(body))

	errMarshal := json.Unmarshal(body, &req)
	if errMarshal != nil {
		helpers.CheckErr("unmarshall req body failed @PostLeaveRequestSupervisor", errMarshal)
		resp.Error = errors.New("type request malform").Error()
		c.Ctx.Output.SetStatus(400)
		c.Ctx.Output.JSON(resp, false, false)
		return
	}

	leave := structDB.LeaveRequest{
		EmployeeNumber: employeeNumber,
		TypeOfLeave:    req.TypeOfLeave,
		Reason:         req.Reason,
		DateFrom:       req.DateFrom,
		DateTo:         req.DateTo,
		Total:          helpers.GetTotalDay(req.DateFrom, req.DateTo),
		BackOn:         req.BackOn,
		Address:        req.Address,
		ContactLeave:   req.ContactLeave,
		Status:         constant.StatusPendingInDirector,
	}

	errUp := dbUser.UpdateLeaveRemaning(leave.Total, leave.EmployeeNumber)
	if errUp != nil {
		helpers.CheckErr("err update @PostLeaveRequest", errUp)
	}

	errAddLeave := dbLeave.CreateLeaveRequestSupervisor(
		leave.EmployeeNumber,
		leave.TypeOfLeave,
		leave.Reason,
		leave.DateFrom,
		leave.DateTo,
		leave.BackOn,
		leave.Total,
		leave.Address,
		leave.ContactLeave,
		leave.Status,
	)
	if errAddLeave != nil {
		resp.Error = errAddLeave.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = leave
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @PostLeaveRequestSupervisor", err)
	}
}
