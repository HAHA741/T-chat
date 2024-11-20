import React, { useState } from "react";
import api from "@/api/index.js";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // true表示登录，false表示注册
  //   const [phoneNumber, setPhoneNumber] = useState("");
  //   const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  const setFormKey = (key, val) => {
    let _form = {
      ...form,
    };
    _form[key] = val;
    console.log(_form, "_form");
    setForm(_form);
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setPhoneNumber("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      //   console.log("登录手机号:", phoneNumber, "密码:", password);
      // 添加登录逻辑
      let { data } = await api.login(form);
      localStorage.setItem("token", data);
      let res = await api.getUserInfo();
      //   api.login(form).then((res) => {
      //     if (res.data) {
      //       localStorage.setItem("token", res.data);
      //       api.getUserInfo()
      //     }
      //   });
    } else {
      api.register(form).then((res) => {
        console.log(res);
      });
      //   console.log("注册手机号:", phoneNumber, "密码:", password);
      // 添加注册逻辑
    }
    onClose(); // 成功后关闭弹窗
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isLogin ? "登录" : "注册"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            用户名
            <input
              type="text"
              value={form.userName}
              onChange={(e) => setFormKey("userName", e.target.value)}
              placeholder="请输入用户名"
              required
            />
          </label>
          <label>
            密码
            <input
              type="password"
              value={form.password}
              onChange={(e) => setFormKey("password", e.target.value)}
              placeholder="请输入密码"
              required
            />
          </label>
          <button type="submit">{isLogin ? "登录" : "注册"}</button>
        </form>
        <p onClick={handleToggle} className="toggle">
          {isLogin ? "没有账号？点击注册" : "已有账号？点击登录"}
        </p>
        <button className="close-button" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
