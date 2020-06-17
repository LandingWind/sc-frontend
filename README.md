## Select Class Frontend

> zju 软件工程project 选课子系统
>
> 负责用户交互的前端项目

### 技术选型

vue vue-router vue-store —— vue全家桶

element-ui —— UI框架

axios —— 与后端交互request封装
 
mock —— 本地模拟数据

### Quick Start

```bash
npm i
npm run serve
```

### Other Bash

#### 本地构建并预览
```bash
# 如果没有安装过serve，先安装
# npm install -g serve

npm run build
serve -s dist
```

#### Docker构建并运行
```bash
# 构建image
# version should be filled
docker -t build scfrontend:(version) .

# 运行container
# version should be filled
docker run -dt -p 6001:80 --name="scfront" scfrontend:(version)

# 浏览器访问 localhost:6001

# 查看container日志
docker logs --since 30m CONTAINER_ID 
```

#### 推送到dockerhub
```bash
docker login
docker tag scfrontend:(version) kysoowjk/scfrontend:(version)
docker push kysoowjk/scfrontend:(version)
```

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```