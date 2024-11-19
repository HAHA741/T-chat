package controller

import (
	"gin-template/service"

	"github.com/gin-gonic/gin"
)

// @Summary AI对话
// @Description 返回gpt对话流
// @Produce  json
// @Router /chat/communication [get]
func Communication(c *gin.Context) {
	prompt := c.DefaultQuery("prompt", "")
	service.Communication(prompt)
}
