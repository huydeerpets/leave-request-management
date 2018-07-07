package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"server/helpers"
	"strconv"
	"strings"

	logic "server/models/logic/user"
	structAPI "server/structs/api"
	structDB "server/structs/db"

	"github.com/astaxie/beego"
)

// SupervisorController ...
type SupervisorController struct {
	beego.Controller
}

// GetPendingLeave ...
func (c *SupervisorController) GetPendingLeave() {
	var (
		resp structAPI.RespData
	)
	idStr := c.Ctx.Input.Param(":id")
	supervisorID, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @GetPendingLeave", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	resGet, errGetPend := logic.DBPostSupervisor.GetUserPending(supervisorID)
	if errGetPend != nil {
		resp.Error = errGetPend.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = resGet
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @GetPendingLeave", err)
	}
}

// GetAcceptLeave ...
func (c *SupervisorController) GetAcceptLeave() {
	var (
		resp structAPI.RespData
	)

	idStr := c.Ctx.Input.Param(":id")
	supervisorID, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @GetAcceptLeave", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	resGet, errGetAccept := logic.DBPostSupervisor.GetUserAccept(supervisorID)
	if errGetAccept != nil {
		resp.Error = errGetAccept.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = resGet
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @GetAcceptLeave", err)
	}
}

// GetRejectLeave ...
func (c *SupervisorController) GetRejectLeave() {
	var (
		resp structAPI.RespData
	)

	idStr := c.Ctx.Input.Param(":id")
	supervisorID, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @GetRejectLeave", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	resGet, errGetReject := logic.DBPostSupervisor.GetUserReject(supervisorID)
	if errGetReject != nil {
		resp.Error = errGetReject.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = resGet
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @GetRejectLeave", err)
	}
}

// AcceptStatusBySupervisor ...
func (c *SupervisorController) AcceptStatusBySupervisor() {
	var resp structAPI.RespData

	idStr := c.Ctx.Input.Param(":id")
	id, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @AcceptStatusBySupervisor", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	employeeStr := c.Ctx.Input.Param(":enumber")
	employeeNumber, errCon := strconv.ParseInt(employeeStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert enum failed @AcceptStatusBySupervisor", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	errUpStat := logic.DBPostSupervisor.AcceptBySupervisor(id, employeeNumber)
	if errUpStat != nil {
		resp.Error = errUpStat.Error()
	} else {
		resp.Body = "status leave request has been accepted"
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @AcceptStatusBySupervisor", err)
	}
}

// RejectStatusBySupervisor ...
func (c *SupervisorController) RejectStatusBySupervisor() {
	var (
		resp structAPI.RespData
	)

	reason := c.Ctx.Input.Param(":reason")
	strReason := reason
	strReason = strings.Replace(strReason, "_", " ", -1)

	beego.Debug("===================", reason)
	idStr := c.Ctx.Input.Param(":id")
	id, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @RejectStatusBySupervisor", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	employeeStr := c.Ctx.Input.Param(":enumber")
	employeeNumber, errCon := strconv.ParseInt(employeeStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert enum failed @RejectStatusBySupervisor", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	errUpStat := logic.DBPostSupervisor.RejectBySupervisor(strReason, id, employeeNumber)
	if errUpStat != nil {
		resp.Error = errUpStat.Error()
	} else {
		resp.Body = "status leave request has been rejected"
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @RejectStatusBySupervisor", err)
	}
}

// RejectStatusBySv ...
func (c *SupervisorController) RejectStatusBySv() {
	var (
		resp  structAPI.RespData
		leave structDB.LeaveRequest
	)

	body := c.Ctx.Input.RequestBody
	fmt.Println("REJECT-REASON=======>", string(body))

	errMarshal := json.Unmarshal(body, &leave)
	if errMarshal != nil {
		helpers.CheckErr("unmarshall req body failed @RejectStatusBySv", errMarshal)
		resp.Error = errors.New("type request malform").Error()
		c.Ctx.Output.SetStatus(400)
		c.Ctx.Output.JSON(resp, false, false)
		return
	}

	idStr := c.Ctx.Input.Param(":id")
	id, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @RejectStatusBySv", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	employeeStr := c.Ctx.Input.Param(":enumber")
	employeeNumber, errCon := strconv.ParseInt(employeeStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert enum failed @RejectStatusBySv", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	errUpStat := logic.DBPostSupervisor.RejectBySv(&leave, id, employeeNumber)
	if errUpStat != nil {
		resp.Error = errUpStat.Error()
	} else {
		resp.Body = "status leave request has been rejected"
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @RejectStatusBySv", err)
	}
}
