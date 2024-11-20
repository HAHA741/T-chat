package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"gin-template/model"
	"io"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
)

//大模型交互

// 与大模型通信,
func Communication(c *gin.Context, communication model.Communication) (err error) {
	var wg sync.WaitGroup
	wg.Add(1)
	message := model.AIMessage{
		Role:    "user",
		Content: communication.Prompt,
	}
	err = GptQingYan(c, message, &wg)
	wg.Wait()
	return err
}

// 质谱轻言大模型
func GptQingYan(c *gin.Context, message model.AIMessage, wg *sync.WaitGroup) (err error) {
	defer wg.Done()
	url := "https://open.bigmodel.cn/api/paas/v4/chat/completions"
	contentType := "application/json"
	zhupuGPT := model.ZHIPUGPT{
		Model: "glm-4",
		Messages: []model.AIMessage{
			message,
		},
		MaxTokens: 4095,
		Stream:    true,
	}
	zhupuGPTJson, err := json.Marshal(zhupuGPT)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(zhupuGPTJson))
	req.Header.Set("Content-Type", contentType)
	req.Header.Set("Authorization", "Bearer 664b5432c866ca80b9ff1b1ce8e76e72.5AlxsCUeiC6qiYk4")
	req.Header.Set("Accept", "text/event-stream")
	req.Header.Set("Connection", "keep-alive")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("post failed, err:%v\n", err)
		return err
	}
	c.Stream(func(w io.Writer) bool {
		for {
			var data = make([]byte, 1024)
			n, err := resp.Body.Read(data)
			if err != nil {
				if err == io.EOF {
					return false
				}
			}
			_, err = w.Write(data[:n])
			if err != nil {
				fmt.Printf("Write error: %v\n", err)
				return false
			}
			w.(http.Flusher).Flush()
			// fmt.Printf("Received: %s\n", string(data[:n]))
		}
	})

	defer resp.Body.Close()
	// b, err := io.ReadAll(resp.Body)
	// json.Unmarshal(b, &response)

	// return response, nil
	return nil

}
