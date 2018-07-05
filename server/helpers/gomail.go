package helpers

import (
	"bytes"
	"html/template"
	"path/filepath"
	"server/helpers/constant"

	gomail "gopkg.in/gomail.v2"
)

type employeeMail struct {
	LeaveID        string
	EmployeeName   string
	SupervisorName string
}

type supervisorMailReject struct {
	LeaveID        string
	EmployeeName   string
	SupervisorName string
	Reason         string
}

type directorMail struct {
	LeaveID        string
	EmployeeName   string
	SupervisorName string
	DirectorName   string
}
type directorMailAction struct {
	LeaveID      string
	EmployeeName string
	DirectorName string
}

// GoMailEmployee ...
func GoMailEmployee(mailTo string, leaveID string, employeeName string, supervisorName string) {

	var errParse error

	filePrefix, _ := filepath.Abs("./views")
	t := template.New("template.html")
	infoHTML := employeeMail{leaveID, employeeName, supervisorName}
	t, errParse = t.ParseFiles(filePrefix + "/template.html")
	if errParse != nil {
		CheckErr("errParse ", errParse)
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, infoHTML); err != nil {
		CheckErr("err ", err)
	}
	mailHTML := tpl.String()

	authEmail := "tnis.noreply@gmail.com"
	authPassword := constant.GOPWD
	authHost := "smtp.gmail.com"
	port := 587

	m := gomail.NewMessage()
	m.SetHeader("From", authEmail)
	m.SetHeader("To", mailTo)
	m.SetHeader("Subject", "Accepted Leave Request")
	m.Embed(filePrefix + "/tnis.png")
	m.SetBody("text/html", mailHTML)

	d := gomail.NewDialer(authHost, port, authEmail, authPassword)

	if err := d.DialAndSend(m); err != nil {
		CheckErr("error email", err)
	}
}

// GoMailDirector ...
func GoMailDirector(mailTo string, leaveID string, employeeName string, supervisorName string, DirectorName string) {

	var errParse error

	filePrefix, _ := filepath.Abs("./views")
	t := template.New("director.html")
	infoHTML := directorMail{leaveID, employeeName, supervisorName, DirectorName}
	t, errParse = t.ParseFiles(filePrefix + "/director.html")
	if errParse != nil {
		CheckErr("errParse ", errParse)
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, infoHTML); err != nil {
		CheckErr("err ", err)
	}
	mailHTML := tpl.String()

	authEmail := "tnis.noreply@gmail.com"
	authPassword := constant.GOPWD
	authHost := "smtp.gmail.com"
	port := 587

	m := gomail.NewMessage()
	m.SetHeader("From", authEmail)
	m.SetHeader("To", mailTo)
	m.SetHeader("Subject", "Request Leave Request")
	m.Embed(filePrefix + "/tnis.png")
	m.SetBody("text/html", mailHTML)

	d := gomail.NewDialer(authHost, port, authEmail, authPassword)

	if err := d.DialAndSend(m); err != nil {
		CheckErr("error email", err)
	}
}

// GoMailSupervisorReject ...
func GoMailSupervisorReject(mailTo string, leaveID string, employeeName string, supervisorName string, reason string) {

	var errParse error

	filePrefix, _ := filepath.Abs("./views")
	t := template.New("supervisor_reject.html")
	infoHTML := supervisorMailReject{leaveID, employeeName, supervisorName, reason}
	t, errParse = t.ParseFiles(filePrefix + "/supervisor_reject.html")
	if errParse != nil {
		CheckErr("errParse ", errParse)
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, infoHTML); err != nil {
		CheckErr("err ", err)
	}
	mailHTML := tpl.String()

	authEmail := "tnis.noreply@gmail.com"
	authPassword := constant.GOPWD
	authHost := "smtp.gmail.com"
	port := 587

	m := gomail.NewMessage()
	m.SetHeader("From", authEmail)
	m.SetHeader("To", mailTo)
	m.SetHeader("Subject", "Reject Leave Request")
	m.Embed(filePrefix + "/tnis.png")
	m.SetBody("text/html", mailHTML)

	d := gomail.NewDialer(authHost, port, authEmail, authPassword)

	if err := d.DialAndSend(m); err != nil {
		CheckErr("error email", err)
	}
}

// GoMailDirectorAccept ...
func GoMailDirectorAccept(mailTo string, leaveID string, employeeName string, directorName string) {

	var errParse error

	filePrefix, _ := filepath.Abs("./views")
	t := template.New("director_accept.html")
	infoHTML := directorMailAction{leaveID, employeeName, directorName}
	t, errParse = t.ParseFiles(filePrefix + "/director_accept.html")
	if errParse != nil {
		CheckErr("errParse ", errParse)
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, infoHTML); err != nil {
		CheckErr("err ", err)
	}
	mailHTML := tpl.String()

	authEmail := "tnis.noreply@gmail.com"
	authPassword := constant.GOPWD
	authHost := "smtp.gmail.com"
	port := 587

	m := gomail.NewMessage()
	m.SetHeader("From", authEmail)
	m.SetHeader("To", mailTo)
	m.SetHeader("Subject", "Accept Leave Request")
	m.Embed(filePrefix + "/tnis.png")
	m.SetBody("text/html", mailHTML)
	d := gomail.NewDialer(authHost, port, authEmail, authPassword)

	if err := d.DialAndSend(m); err != nil {
		CheckErr("error email", err)
	}
}

// GoMailDirectorReject ...
func GoMailDirectorReject(mailTo string, leaveID string, employeeName string, directorName string) {

	var errParse error

	filePrefix, _ := filepath.Abs("./views")
	t := template.New("director_reject.html")
	infoHTML := directorMailAction{leaveID, employeeName, directorName}
	t, errParse = t.ParseFiles(filePrefix + "/director_reject.html")
	if errParse != nil {
		CheckErr("errParse ", errParse)
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, infoHTML); err != nil {
		CheckErr("err ", err)
	}
	mailHTML := tpl.String()

	authEmail := "tnis.noreply@gmail.com"
	authPassword := constant.GOPWD
	authHost := "smtp.gmail.com"
	port := 587

	m := gomail.NewMessage()
	m.SetHeader("From", authEmail)
	m.SetHeader("To", mailTo)
	m.SetHeader("Subject", "Reject Leave Request")
	m.Embed(filePrefix + "/tnis.png")
	m.SetBody("text/html", mailHTML)

	d := gomail.NewDialer(authHost, port, authEmail, authPassword)

	if err := d.DialAndSend(m); err != nil {
		CheckErr("error email", err)
	}
}
