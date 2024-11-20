package service

import (
	"gin-template/middleware"
	"gin-template/model"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
)

func GetUserInfo(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")
	tokenString := strings.TrimPrefix(token, "Bearer ")
	userId, err := middleware.ParseToken(tokenString)
	if err != nil {
		println("token解析失败")
	}
	user := model.User{}
	userInfo := model.UserInfo{}

	model.DB.First(&user, userId)
	copier.Copy(&userInfo, &user)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "",
		"data":    userInfo,
	})

}
