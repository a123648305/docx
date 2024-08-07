# docker
## 介绍
Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。
+ 镜像（Image）：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:18.
+ 容器（Container）：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态
代码，容器是运行代码
+ 仓库（Repository）：仓库可看成一个代码控制中心，用来保存镜像，可以理解为代码控制中心，用来保存、更新镜像

## 安装
### linux安装依赖
```
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.rep
yum install -y docker-ce
```
### 启动docker
```
systemctl start docker
```
### 配置docker
```
vim /etc/docker/daemon.json
{
    "registry-mirrors": ["https://hub-mirror.c.163.com"]
}
```
### 重启docker
```
systemctl restart docker
```

## dockerfile
### 创建一个dockerfile
```
# 设置基础镜像
FROM node:lts-alpine
# 设置工作目录
WORKDIR /build 
COPY ./package.json /build/package.json
# 设置npm镜像
RUN npm config set registry https://registry.npm.taobao.org
COPY package.json /build/package.json
RUN yarn
COPY ./ /build
RUN npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /build/dist /app
COPY --from=0 /build/nginx.conf /etc/nginx/nginx.conf

# 暴露映射端口
EXPOSE 80
# 启动参数
CMD ["/usr/sbin/httpd", "-DFOREGROUND"]
```

## 常用命令
```bash
docker ps //查看当前运行中的容器
docker ps -a //查看所有运行过的容器
docker inspect containerId(容器ID或容器名)//查看对应容器的具体配置信息
docker port containerId //查看对应容器端口映射
docker run --name containerName -it -p 80:80 -d // --name是为容器取一个别名，-p 80:80是端口映射，将宿主机的80端口映射到容器的80端口上，-d是指后台运行容器，即容器启动后不会停止，-it是-i 和-t的合并，以交互模式运行容器。
docker images //查看所有镜像
docker exec -it containerName /bin/bash //进入已启动的容器内，新启一个进程，执行命令。
docker stop containerName // 停止一个容器
docker start -i containerName //重启启动一个运行过的容器
docker rm containerName //移除一个容器
docker build -t <imagename>:<tag> dir  // 根据DockerFile 构建一个镜像
docker rmi <imageId> // 删除镜像
docker tag <imageId> <imagename>:<tag> // 给镜像设置一个新tag
```



## docker-compose
+ docker compose 命令是用来管理和运行多个容器的应用的工具 docker compose 命令的用法主要如下：
+ 命令必须在 docker-compose.yml文件所在的目录下执行
+ docker compose [-f=<arg>...] [options] [COMMAND] [ARGS...] 
    -f, --file FILE 指定使用的 Compose 模板文件，默认为 docker-compose.yml，可以多次指定。
    -p, --project-name NAME 指定项目名称，默认将使用所在目录名称作为项目名。
    --verbose 输出更多调试信息。
    -v, --version 打印版本并退出。
```
docker-compose up
# 后台启动, 启动所有服务并在后台运行。 
docker-compose up -d

# 停止所有服务。
docker-compose stop 

restart
docker-compose restart重启服务容器。
docker-compose restart # 重启工程中所有服务的容器
docker-compose restart nginx # 重启工程中指定服务的容器

start
docker-compose start启动服务容器。
docker-compose start # 启动工程中所有服务的容器
docker-compose start nginx # 启动工程中指定服务的容器

stop
docker-compose stop停止服务容器。
docker-compose stop # 停止工程中所有服务的容器
docker-compose stop nginx # 停止工程中指定服务的容器</code></pre> 
  
# 构建服务的镜像
docker-compose build

# 如果服务镜像不存在&#xff0c;则构建镜像并启动服务。
docker-compose up –build

# 重构服务。
docker-compose up --force-recreate 

docker-compose ps

# 查看容器的日志。
docker-compose logs

```

