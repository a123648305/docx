## [nginx 介绍](https://docshome.gitbook.io/nginx-docs/readme)
    nginx 是一个高性能的 HTTP 和反向代理服务器，同时也能用来传输邮件以及代理 SSL 加密连接。
    通常用来做一些反向代理 和负载均衡等工作。
## nginx 常用命令
```bash
    nginx -s stop  #停止nginx
    nginx -s reload  #重新加载nginx配置文件
    nginx -s quit  #退出nginx
    nginx -s reopen  #重新打开nginx日志文件
    nginx -t  #检测nginx配置文件
    nginx -v  #查看nginx版本
    nginx start  #启动nginx  
    start nginx #window下 启动nginx

    ps -ax | grep nginx #获取所有正在运行的 nginx 进程列表
    kill -s QUIT 1628  #关闭1628进程Nginx
```
## nginx 配置文件
    nginx.conf  #nginx主配置文件
### 常用配置
```bash
    http{
        access_log logs/access.log quic; #日志文件
        server {
            listen 80;  #监听端口
            server_name www.example.com; #域名
            root /var/www/example.com; #网站根目录
            index index.html index.htm; #首页

            location / { 
                try_files $uri $uri/ =404;
            }

            location /static/ { 
            root /data/static; #返回其他指定文件目录
            }

            location ^~/api/ {
                proxy_pass http://127.0.0.1:8080;  #反向代理地址
            }

            location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {  #静态文件缓存
                expires max;
                add_header Pragma public;
                add_header Cache-Control "public, must-revalidate, proxy-revalidate";
            }

            location /test/ { #重定向
                rerewrite ^/test/(.*)$ /  http://baidu.com/$1 redirect; #302 临时重定向
               
                rewrite /platform/(.*) http://baidu.com/$1 permanent; #301 永久重定向

                return 301 http://www.example.com/test/;
            }
        }
    }
```
### 负载均衡配置  当负载均衡方法没有被特别配置时，默认采用轮询
```bash
    upstream example {
        least_conn; #使用 least_conn 指令作为服务组配置的一部分时，将激活 nginx 中的最少连接负载均衡
        ip_hash; #配置 IP 哈希负载均衡
        server http://example:8080 weight=3; #当服务器指定 weight 参数时，权重将作为负载均衡决策的一部分进行核算
        server http://example:8081;
        server http://example:8082;
    }
    server {
        listen 80;
        server_name example.com;
        location / {
            proxy_pass example;
            proxy_set_header X-Real-IP $remote_addr; #将客户端 IP 地址添加到 X-Real-IP 头中
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; #将客户端 IP 地址添加到 X-Forwarded-For 头中
            proxy_set_header Host $host; #将客户端请求的 Host 头添加到 Host 头中
            proxy_set_header X-Forwarded-Proto $scheme; #将客户端请求的协议添加到 X-Forwarded-Proto 头中
        }
    }
```
### https 配置
```bash
    server {
        listen 443 ssl;
        server_name example.com;
        ssl_certificate /etc/nginx/ssl/example.com.crt; #证书文件
        ssl_certificate_key /etc/nginx/ssl/example.com.key; #私钥文件
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2; #使用的协议
        ssl_ciphers         HIGH:!aNULL:!MD5;   #使用的加密算法
        location / {
            root /data
        }
    }
```



    


