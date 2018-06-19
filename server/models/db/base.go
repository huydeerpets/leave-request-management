package db

import (
	"github.com/astaxie/beego/orm"

	"server/adapter"
	"server/helpers"
	dbStruct "server/structs/db"
)

// RegisterPGSQL ...
func RegisterPGSQL() {
	maxIdle := 30
	maxConn := 30

	errRegisterDriver := orm.RegisterDriver("postgres", orm.DRPostgres)
	if errRegisterDriver != nil {
		helpers.CheckErr("error while register driver @RegisterPGSQL", errRegisterDriver)
	}

	errRegisterDataBase := orm.RegisterDataBase("default", "postgres",
		adapter.CallPGSQL(),
		maxIdle, maxConn)
	if errRegisterDataBase != nil {
		helpers.CheckErr("error while register DB @RegisterPGSQL", errRegisterDataBase)
	}

	RegisterModel()
}

// RegisterModel to register database
func RegisterModel() {
	orm.RegisterModel(new(dbStruct.LeaveRequest))
	orm.RegisterModel(new(dbStruct.User))
}
