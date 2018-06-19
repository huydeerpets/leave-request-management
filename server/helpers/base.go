package helpers

import (
	"fmt"
	"strings"

	"github.com/astaxie/beego"
)

// CheckErr ...
func CheckErr(errMsg string, err error) {
	if err != nil {
		beego.Warning(errMsg, err)
	}
}

// BytesToString ...
func BytesToString(data []byte) string {
	return string(data[:])
}

// ArrayToString ...
func ArrayToString(arr []int64, delim string) string {
	return strings.Trim(strings.Replace(fmt.Sprint(arr), " ", delim, -1), "[]")
}
