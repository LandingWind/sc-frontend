FROM nginx
LABEL author="zjuwkk" 

# 解决linux机器时区问题
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

# docker中安装基本工具用于调试
RUN apt-get update
RUN apt-get install vim -y

# dist构建目录复制到nginx目录
COPY ./dist /usr/share/nginx/html/

# 声明运行时容器暴露的端口
EXPOSE 8080

# 指定容器启动时要运行的命令
CMD ["nginx", "-g", "daemon off;"]
