package controllers

import (
	"errors"
	"server/helpers"
	"strconv"

	logic "server/models/logic/user"
	structAPI "server/structs/api"

	"github.com/astaxie/beego"
)

// DirectorController ...
type DirectorController struct {
	beego.Controller
}

// AcceptStatusByDirector ...
func (c *DirectorController) AcceptStatusByDirector() {
	var resp structAPI.RespData

	idStr := c.Ctx.Input.Param(":id")
	id, errCon := strconv.ParseInt(idStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert id failed @AcceptStatusByDirector", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	employeeStr := c.Ctx.Input.Param(":enumber")
	employeeNumber, errCon := strconv.ParseInt(employeeStr, 0, 64)
	if errCon != nil {
		helpers.CheckErr("convert enum failed @AcceptStatusByDirector", errCon)
		resp.Error = errors.New("convert id failed").Error()
		return
	}

	errUpStat := logic.DBPostDirector.AcceptByDirector(id, employeeNumber)
	if errUpStat != nil {
		resp.Error = errUpStat.Error()
	} else {
		resp.Body = "status leave request has been accepted"
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @AcceptStatusByDirector", err)
	}
}

// RejectStatusByDirector ...
func (c *DirectorController) RejectStatusByDirector() {
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

	errUpStat := logic.DBPostDirector.RejectByDirector(id, employeeNumber)
	if errUpStat != nil {
		resp.Error = errUpStat.Error()
	} else {
		resp.Body = "status leave request has been rejected"
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @RejectStatusByDirector", err)
	}
}

// GetDirectorPendingLeave ...
func (c *DirectorController) GetDirectorPendingLeave() {
	var (
		resp structAPI.RespData
	)

	resGet, errGetPend := logic.DBPostDirector.GetDirectorPendingRequest()
	if errGetPend != nil {
		resp.Error = errGetPend.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = resGet
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @GetDirectorPendingLeave", err)
	}
}

// GetDirectorAcceptLeave ...
func (c *DirectorController) GetDirectorAcceptLeave() {
	var (
		resp structAPI.RespData
	)

	resGet, errGetAcc := logic.DBPostDirector.GetDirectorAcceptRequest()
	if errGetAcc != nil {
		resp.Error = errGetAcc.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = resGet
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @GetDirectorPendingLeave", err)
	}
}

// GetDirectorRejectLeave ...
func (c *DirectorController) GetDirectorRejectLeave() {
	var (
		resp structAPI.RespData
	)

	resGet, errGetReject := logic.DBPostDirector.GetDirectorRejectRequest()
	if errGetReject != nil {
		resp.Error = errGetReject.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = resGet
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @GetDirectorPendingLeave", err)
	}
}
