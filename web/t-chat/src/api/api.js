// axiosInstance.js
import axios from "axios";

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: "api", // 修改为你的后端 API 地址
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 普通请求方法封装
export const fetchData = async (
  url,
  method = "GET",
  data = null,
  config = {}
) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("普通请求错误:", error);
    throw error;
  }
};

// 流式请求方法封装
export const fetchStream = async (url, onChunk, config = {}) => {
  try {
    const response = await axiosInstance.get(url, {
      ...config,
      responseType: "stream",
    });

    // 处理流数据
    const reader = response.data.getReader();
    const decoder = new TextDecoder("utf-8");
    let { done, value } = await reader.read();

    while (!done) {
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk); // 处理块数据（例如更新 UI）
      ({ done, value } = await reader.read());
    }
    reader.releaseLock();
  } catch (error) {
    console.error("流请求错误:", error);
    throw error;
  }
};
export async function postEventStream(url, data, fn) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream", // 指定返回事件流
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.body) {
    throw new Error("ReadableStream not supported in this browser.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // 按行分割处理，模拟 text/event-stream 事件流格式
    const lines = buffer.split("\n");
    buffer = lines.pop(); // 保留未处理完的部分

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const eventData = line.slice(6);
        // console.log("Received event data:", eventData);
        fn(eventData);
      }
    }
  }
}

// 调用示例
// postEventStream("https://your-server-url.com/api/stream", { key: "value" });

// 取消请求的支持
export const createCancelToken = () => axios.CancelToken.source();
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token
    if (localStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 全局错误处理
    if (error.response && error.response.status === 401) {
      // 处理未授权错误
      console.error("未授权");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
