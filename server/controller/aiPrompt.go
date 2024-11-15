package controller

import (
	"gin-template/service"

	"github.com/gin-gonic/gin"
)

func Communication(c *gin.Context) {
	prompt := c.DefaultQuery("prompt", "")
	service.Communication(prompt)
}
