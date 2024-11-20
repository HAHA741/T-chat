package middleware

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

var secretKey = "T-chat1050"

// GenerateToken 生成一个新的 JWT token
func GenerateToken(userID int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})
	return token.SignedString([]byte(secretKey))
}

// VerifyToken 验证请求中的 JWT token
func VerifyToken(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
}

// 中间件验证Token
func TokenMiddleware(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "无权进行此操作，未登录或 token 无效",
		})
		c.Abort()
		return
	}
	tokenString := strings.TrimPrefix(token, "Bearer ")
	_token, err := VerifyToken(tokenString)
	if err != nil || !_token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "无权进行此操作，未登录或 token 无效",
		})
		c.Abort()
		return
	}
	c.Next()
}

// ParseToken 解析并验证 token，从中提取 user_id
func ParseToken(tokenString string) (float64, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// 验证签名方法是否符合预期
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secretKey), nil
	})

	if err != nil {
		return -1, err
	}

	// 解析 token 的声明
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userID, found := claims["user_id"]; found {
			return userID.(float64), nil
		}
	}
	return -1, fmt.Errorf("user_id not found in token")
}
