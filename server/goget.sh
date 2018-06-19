#!/bin/bash
## Created by Syldie Aldi Wijaya         ##
##                                       ##
########################################### 

set -e

Package=(
		"github.com/astaxie/beego"
		"github.com/beego/bee"
		"github.com/lib/pq"
		"github.com/satori/go.uuid"
		"golang.org/x/crypto/bcrypt"
		"github.com/dgrijalva/jwt-go/convey"		
		"github.com/smartystreets/goconvey/convey"	
)

arrayPackage=${#Package[@]}

for ((k=0; k<${arrayPackage}; k++));
do
	echo "GO GET ${Package[$k]}"
	go get ${Package[$k]} 2>&1
done
