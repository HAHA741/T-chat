package controller

import (
	"gin-template/model"
	"gin-template/service"

	"github.com/gin-gonic/gin"
)

// @Summary AI对话
// @Description 返回gpt对话流
// @Produce  json
// @Router /chat/communication [get]
func Communication(c *gin.Context) {
	var communication model.Communication
	if err := c.ShouldBindJSON(&communication); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	// prompt := c.DefaultQuery("prompt", "")
	service.Communication(c, communication)
	// c.JSON(http.StatusOK, gin.H{
	// 	"success": true,
	// 	"message": "",
	// 	"data":    response,
	// })
}
