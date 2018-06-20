package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"server/helpers"
	"server/helpers/constant"
	"strconv"

	logic "server/models/logic/user"
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
		resp structAPI.RespData
		req  structAPI.ReqLeave
	)
	idStr := c.Ctx.Input.Param(":id")
	employeeNumber, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @PostLeaveRequest", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	body := c.Ctx.Input.RequestBody
	fmt.Println("REGISTER=======>", string(body))

	errMarshal := json.Unmarshal(body, &req)
	if errMarshal != nil {
		helpers.CheckErr("unmarshall req body failed @PostLeaveRequest", errMarshal)
		resp.Error = errors.New("type request malform").Error()
		c.Ctx.Output.SetStatus(400)
		c.Ctx.Output.JSON(resp, false, false)
		return
	}

	leave := structDB.LeaveRequest{
		EmployeeNumber: employeeNumber,
		TypeOfLeave:    req.TypeOfLeave,
		Reason:         req.Reason,
		From:           req.From,
		To:             req.To,
		Total:          6,
		LeaveRemaining: 12 - 6,
		Address:        req.Address,
		ContactLeave:   req.ContactLeave,
		Status:         constant.StatusPendingInSupervisor,
	}

	errAddLeave := logic.DBPostLeave.CreateLeaveRequest(leave)
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
