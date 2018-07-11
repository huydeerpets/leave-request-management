package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"server/helpers"
	"server/helpers/constant"
	"strconv"

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
	)

	idStr := c.Ctx.Input.Param(":id")
	employeeNumber, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @PostLeaveRequest", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	body := c.Ctx.Input.RequestBody
	fmt.Println("CREATE-LEAVE-REQUEST=======>", string(body))

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
		TypeLeaveID:    req.TypeLeaveID,
		Reason:         req.Reason,
		DateFrom:       req.DateFrom,
		DateTo:         req.DateTo,
		Total:          helpers.GetTotalDay(req.DateFrom, req.DateTo),
		BackOn:         req.BackOn,
		ContactAddress: req.ContactAddress,
		ContactNumber:  req.ContactNumber,
		Status:         constant.StatusPendingInSupervisor,
	}

	errAddLeave := dbLeave.CreateLeaveRequest(
		leave.EmployeeNumber,
		leave.TypeLeaveID,
		leave.Reason,
		leave.DateFrom,
		leave.DateTo,
		leave.BackOn,
		leave.Total,
		leave.ContactAddress,
		leave.ContactNumber,
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
	)

	idStr := c.Ctx.Input.Param(":id")
	employeeNumber, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @PostLeaveRequestSupervisor", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	body := c.Ctx.Input.RequestBody
	fmt.Println("CREATE-LEAVE-REQUEST=======>", string(body))

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
		TypeLeaveID:    req.TypeLeaveID,
		Reason:         req.Reason,
		DateFrom:       req.DateFrom,
		DateTo:         req.DateTo,
		Total:          helpers.GetTotalDay(req.DateFrom, req.DateTo),
		BackOn:         req.BackOn,
		ContactAddress: req.ContactAddress,
		ContactNumber:  req.ContactNumber,
		Status:         constant.StatusPendingInDirector,
	}

	errAddLeave := dbLeave.CreateLeaveRequestSupervisor(
		leave.EmployeeNumber,
		leave.TypeLeaveID,
		leave.Reason,
		leave.DateFrom,
		leave.DateTo,
		leave.BackOn,
		leave.Total,
		leave.ContactAddress,
		leave.ContactNumber,
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

// UpdateRequest ...
func (c *LeaveController) UpdateRequest() {
	var (
		resp    structAPI.RespData
		leave   structDB.LeaveRequest
		dbLeave db.LeaveRequest
	)

	body := c.Ctx.Input.RequestBody
	fmt.Println("UPDATE-LEAVE-REQUEST=======>", string(body))

	err := json.Unmarshal(body, &leave)
	if err != nil {
		helpers.CheckErr("unmarshall req body failed @UpdateRequest", err)
		resp.Error = errors.New("type request malform").Error()
		c.Ctx.Output.JSON(resp, false, false)
		return
	}

	idStr := c.Ctx.Input.Param(":id")
	id, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @UpdateRequest", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	leave = structDB.LeaveRequest{
		TypeLeaveID:    leave.TypeLeaveID,
		Reason:         leave.Reason,
		DateFrom:       leave.DateFrom,
		DateTo:         leave.DateTo,
		Total:          helpers.GetTotalDay(leave.DateFrom, leave.DateTo),
		BackOn:         leave.BackOn,
		ContactAddress: leave.ContactAddress,
		ContactNumber:  leave.ContactNumber,
	}

	errUpdate := dbLeave.UpdateRequest(&leave, id)
	if errUpdate != nil {
		resp.Error = errUpdate.Error()
	} else {
		resp.Body = "Update leave success"
	}

	err = c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @UpdateRequest", err)
	}
}

// DeleteRequest ...
func (c *LeaveController) DeleteRequest() {
	var (
		resp    structAPI.RespData
		dbLeave db.LeaveRequest
	)

	idStr := c.Ctx.Input.Param(":id")
	id, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @DeleteRequest", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	if err := dbLeave.DeleteRequest(id); err == nil {
		resp.Body = "Deleted success"
	} else {
		resp.Error = err.Error()
		c.Ctx.Output.SetStatus(400)
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @DeleteRequest", err)
	}
}
