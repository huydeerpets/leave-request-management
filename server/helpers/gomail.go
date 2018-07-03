package helpers

import (
	"bytes"
	"html/template"
	"path/filepath"

	gomail "gopkg.in/gomail.v2"
)

type info struct {
	Name       string
	ID         string
	Supervisor string
}

type supervisorMail struct {
	Name string
	ID   string
}

// GoMailEmployee ...
func GoMailEmployee(mailTo string, employeeName string, leaveID string, supervisorName string) {

	var errParse error

	filePrefix, _ := filepath.Abs("./views")
	t := template.New("template.html")
	infoHTML := info{employeeName, leaveID, supervisorName}
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
	authPassword := "tnis1234"
	authHost := "smtp.gmail.com"
	port := 587

	m := gomail.NewMessage()
	m.SetHeader("From", authEmail)
	m.SetHeader("To", mailTo)
	m.SetHeader("Subject", "Accepted Leave Request!")
	// m.SetAddressHeader("Cc", "<RECIPIENT CC>", "<RECIPIENT CC NAME>")
	m.SetBody("text/html", mailHTML)

	d := gomail.NewDialer(authHost, port, authEmail, authPassword)

	if err := d.DialAndSend(m); err != nil {
		CheckErr("error email", err)
	}
}

// GoMailSupervisor ...
func GoMailSupervisor(mailTo string, employeeName string, leaveID string) {

	var errParse error

	filePrefix, _ := filepath.Abs("./views")
	t := template.New("supervisor.html")
	infoHTML := supervisorMail{employeeName, leaveID}
	t, errParse = t.ParseFiles(filePrefix + "/supervisor.html")
	if errParse != nil {
		CheckErr("errParse ", errParse)
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, infoHTML); err != nil {
		CheckErr("err ", err)
	}
	mailHTML := tpl.String()

	authEmail := "tnis.noreply@gmail.com"
	authPassword := "tnis1234"
	authHost := "smtp.gmail.com"
	port := 587

	m := gomail.NewMessage()
	m.SetHeader("From", authEmail)
	m.SetHeader("To", mailTo)
	m.SetHeader("Subject", "Accepted Leave Request!")
	// m.SetAddressHeader("Cc", "<RECIPIENT CC>", "<RECIPIENT CC NAME>")
	m.SetBody("text/html", mailHTML)

	d := gomail.NewDialer(authHost, port, authEmail, authPassword)

	if err := d.DialAndSend(m); err != nil {
		CheckErr("error email", err)
	}
}
