package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"server/helpers"
	"server/helpers/constant"
	"strconv"

	db "server/models/db/pgsql/leave_request"
	userLogic "server/models/db/pgsql/user"

	structAPI "server/structs/api"

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
		dbUser  userLogic.User
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

	totalDay := float64(helpers.GetTotalDay(req.DateFrom, req.DateTo))
	reqHalfDay := float64(len(req.HalfDates))
	valueHalfDay := float64(0.5)
	result := helpers.Multiply(totalDay, reqHalfDay, valueHalfDay)

	resGet, errGet := dbUser.GetUserLeaveRemaining(req.TypeLeaveID, employeeNumber)
	helpers.CheckErr("err get", errGet)

	leave := structAPI.CreateLeaveRequest{
		EmployeeNumber: employeeNumber,
		TypeLeaveID:    req.TypeLeaveID,
		Reason:         req.Reason,
		DateFrom:       req.DateFrom,
		DateTo:         req.DateTo,
		HalfDates:      req.HalfDates,
		Total:          result,
		BackOn:         req.BackOn,
		ContactAddress: req.ContactAddress,
		ContactNumber:  req.ContactNumber,
		Status:         constant.StatusPendingInSupervisor,
	}

	strBalance := strconv.FormatFloat(resGet.LeaveRemaining, 'f', 1, 64)
	strTotal := strconv.FormatFloat(result, 'f', 1, 64)

	if result > float64(resGet.LeaveRemaining) {
		beego.Warning("error")
		c.Ctx.Output.SetStatus(400)
		resp.Error = errors.New("your total leave is " + strTotal + " day and your " + resGet.TypeName + " balance is " + strBalance + " day left").Error()
	} else {
		errAddLeave := dbLeave.CreateLeaveRequest(
			leave.EmployeeNumber,
			leave.TypeLeaveID,
			leave.Reason,
			leave.DateFrom,
			leave.DateTo,
			leave.HalfDates,
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

	totalDay := float64(helpers.GetTotalDay(req.DateFrom, req.DateTo))
	reqHalfDay := float64(len(req.HalfDates))
	valueHalfDay := float64(0.5)
	result := helpers.Multiply(totalDay, reqHalfDay, valueHalfDay)

	leave := structAPI.CreateLeaveRequest{
		EmployeeNumber: employeeNumber,
		TypeLeaveID:    req.TypeLeaveID,
		Reason:         req.Reason,
		DateFrom:       req.DateFrom,
		DateTo:         req.DateTo,
		HalfDates:      req.HalfDates,
		Total:          result,
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
		leave.HalfDates,
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
		leave   structAPI.UpdateLeaveRequest
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

	totalDay := float64(helpers.GetTotalDay(leave.DateFrom, leave.DateTo))
	reqHalfDay := float64(len(leave.HalfDates))
	valueHalfDay := float64(0.5)
	result := helpers.Multiply(totalDay, reqHalfDay, valueHalfDay)

	leave = structAPI.UpdateLeaveRequest{
		TypeLeaveID:    leave.TypeLeaveID,
		Reason:         leave.Reason,
		DateFrom:       leave.DateFrom,
		DateTo:         leave.DateTo,
		HalfDates:      leave.HalfDates,
		Total:          result,
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
