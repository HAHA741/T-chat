import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
    }
  };

  return (
    <div className="login-page">
      <h2>用户登录</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="用户名"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密码"
        />
        <button type="submit">登录</button>
      </form>
    </div>
  );
}

export default LoginPage;
