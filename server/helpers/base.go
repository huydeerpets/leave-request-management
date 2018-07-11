package helpers

import (
	"fmt"
	"strings"
	"time"

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

// GetTotalDay ...
func GetTotalDay(from string, to string) int64 {
	dateFrom, _ := time.Parse("02-01-2006", from)
	dateTo, _ := time.Parse("02-01-2006", to)
	diff := dateTo.Sub(dateFrom)
	result := int64(diff.Hours()/24) + 1

	return result
}

// GetDay ...
func GetDay(date string) int {
	dateDay, _ := time.Parse("2006-01-02", date)
	m := dateDay.Month()
	var i = int(m)
	return i
}
