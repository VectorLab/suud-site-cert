# SUUD SSO集成项目（Nuxt.js）

## 概述
本项目由矢量实验室编写，旨在指导联合社区网站接入联合用户中心（簡化通用用戶儀表板）。请各位实验委员注意完善代码。

## 项目结构
```
.
├── app.vue
├── nuxt.config.js
├── package.json
├── pages
│   ├── dashboard.vue
│   └── index.vue
├── plugins
│   └── script.client.js
└── server
    ├── api
    │   └── login.post.js
    ├── tsconfig.json
    └── utils
        └── ssocrypt.js
```

## 关键组件
1. **index.vue**: 包含登录按钮并启动SSO流程
2. **dashboard.vue**: 处理SSO回调并显示用户信息
3. **server/api/login.post.js**: 处理SSO登录的服务器端端点
4. **server/utils/ssocrypt.js**: SSO的实用函数

## 设置
使用yarn安装node_modules
```bash
yarn install
```

新建一个 `.env` 并将联合用户中心提供的信息填入

```dotenv
SSO_PRIVATE_KEY=""
SSO_PASSWORD=""
SSO_SITE_ID=""
```

在`index.vue`中也需要更新`ssoClientID`

## 测试
使用yarn启动
```bash
yarn run dev
```

应用程序将运行在 `http://localhost:3000`

导航到主页并点击"enter"按钮以启动SSO流程

成功认证后，你将被重定向到仪表板，如果正常显示用户名，说明测试完毕

## 注意事项
- 确保所有敏感信息（私钥、密码）都安全存储，不要在客户端代码中暴露
- 在生产环境中始终使用HTTPS以保护传输中的数据

## 错误处理
该应用程序包含基本的错误处理：
- 客户端错误重定向到主页
- 服务器端错误返回适当的HTTP状态码
对于生产使用，考虑实现更健壮的错误处理和用户反馈