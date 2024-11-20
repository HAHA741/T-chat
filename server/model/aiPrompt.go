package model

//ai对话机构
type AIMessage struct {
	Role    string `json:"role"`    //用户角色
	Content string `json:"content"` //prompt
}

//质谱轻言模型传参
type ZHIPUGPT struct {
	Model     string      `json:"model"`
	Messages  []AIMessage `json:"messages"`
	MaxTokens int         `json:"max_tokens"`
	Stream    bool        `json:"stream"` //是否开启流式输出
}

//质谱轻言模型响应结构
type ZHIPUResponse struct {
	Choices []struct {
		Message AIMessage `json:"message"`
		Id      string    `json:"id"`
		Created int       `json:"created"`
	} `json:"choices"`
}

//对话请求传参
type Communication struct {
	Prompt string `json:"prompt"`
}
