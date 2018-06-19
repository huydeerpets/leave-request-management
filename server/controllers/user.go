package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"server/helpers"
	"strconv"

	logic "server/models/logic/user"
	structAPI "server/structs/api"
	structDB "server/structs/db"

	"github.com/astaxie/beego"
)

//UserController ...
type UserController struct {
	beego.Controller
}

func trimQuotes(s string) string {
	if len(s) >= 2 {
		if c := s[len(s)-1]; s[0] == c && (c == '"' || c == '\'') {
			return s[1 : len(s)-1]
		}
	}
	return s
}

// PostUser ...
func (c *UserController) PostUser() {
	var (
		resp structAPI.RespData
		user structDB.User
	)

	body := c.Ctx.Input.RequestBody
	fmt.Println("REGISTER=======>", string(body))

	errMarshal := json.Unmarshal(body, &user)
	if errMarshal != nil {
		helpers.CheckErr("unmarshall req body failed @PostUser", errMarshal)
		resp.Error = errors.New("type request malform").Error()
		c.Ctx.Output.SetStatus(400)
		c.Ctx.Output.JSON(resp, false, false)
		return
	}

	errAddUser := logic.DBPostUser.AddUser(user)
	if errAddUser != nil {
		resp.Error = errAddUser.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = user
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @PostUser", err)
	}
}

// Login ...
func (c *UserController) Login() {
	var resp structAPI.RespData
	var reqLogin structAPI.ReqLogin

	body := c.Ctx.Input.RequestBody
	fmt.Println("LOGIN=======>", string(body))
	err := json.Unmarshal(body, &reqLogin)
	if err != nil {
		helpers.CheckErr("unmarshall req body failed @Login", err)
		resp.Error = errors.New("type request malform").Error()
		c.Ctx.Output.JSON(resp, false, false)
		return
	}

	result, errLogin := logic.DBPostUser.GetJWT(reqLogin)
	if errLogin != nil {
		resp.Error = errLogin.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = result
	}

	err = c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @Login", err)
	}
}

// GetUsers ...
func (c *UserController) GetUsers() {
	var resp structAPI.RespData

	res, errGet := logic.DBPostUser.GetAllUser()
	if errGet != nil {
		resp.Error = errGet.Error()
		c.Ctx.Output.SetStatus(400)
	} else {
		resp.Body = res
	}

	err := c.Ctx.Output.JSON(resp, false, false)
	if err != nil {
		helpers.CheckErr("failed giving output @GetUsers", err)
	}
}

// GetPendingLeave ...
func (c *UserController) GetPendingLeave() {
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

	resGet, errGetPend := logic.DBPostUser.GetUserPending(supervisorID)
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
