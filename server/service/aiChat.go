package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"gin-template/model"
	"io"
	"net/http"
	"sync"
)

//大模型交互

// 与大模型通信
func Communication(prompt string) (response model.ZHIPUResponse, err error) {
	var wg sync.WaitGroup
	wg.Add(1)
	message := model.AIMessage{
		Role:    "user",
		Content: prompt,
	}
	response, err = GptQingYan(message, &wg)
	wg.Wait()
	return response, err
}

// 质谱轻言大模型
func GptQingYan(message model.AIMessage, wg *sync.WaitGroup) (response model.ZHIPUResponse, err error) {
	defer wg.Done()
	url := "https://open.bigmodel.cn/api/paas/v4/chat/completions"
	contentType := "application/json"
	zhupuGPT := model.ZHIPUGPT{
		Model: "glm-4",
		Messages: []model.AIMessage{
			message,
		},
		MaxTokens: 4095,
	}
	zhupuGPTJson, err := json.Marshal(zhupuGPT)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(zhupuGPTJson))
	req.Header.Set("Content-Type", contentType)
	req.Header.Set("Authorization", "Bearer a4901daaaefceeccccadb998d4f60012.xtTfY0m58P955yn0")
	req.Header.Set("Accept", "text/event-stream")
	req.Header.Set("Connection", "keep-alive")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("post failed, err:%v\n", err)
		return response, err
	}
	for {
		var data = make([]byte, 1024)
		n, err := resp.Body.Read(data)
		if err != nil {
			if err == io.EOF {
				break
			}
		}
		fmt.Printf("Received: %s\n", string(buf[:n]))

	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	json.Unmarshal(b, &response)

	return response, nil

}
