## 浅谈前端部署 CI/CD

## DevOps

DevOps `Development` 和 `Operations` 的组合，是一种方法论，并不特指某种技术或者工具。DevOps 是一种重视 `Dev` 开发人员和 `Ops` 运维人员之间沟通、协作的流程。通过自动化的软件交付，使软件的构建，测试，发布更加的快捷、稳定、可靠。

### 静态页面时代

一台跳板机

一台生产环境服务器

一份部署脚本

前端静态文件由 `nginx` 托管，`nginx` 配置文件大致长这个样

![image-20230504192222219](/images/image-20230504192222219.png)

​ 这个时候的前端负责维护 nginx 脚本，运维将静态资源和 nginx 脚本 推送到服务器部署

- 缺陷：

  **这个时候，无论跨域的配置还是缓存的配置，都是运维来管理，运维不懂前端。但配置方式却是前端在提供，而前端并不熟悉 nginx**

## 使用 docker 构建镜像

`docker` 的引进，很大程度地解决了部署脚本跑不了这个大 BUG。**`dockerfile` 即部署脚本，部署脚本即 `dockerfile`**。这也很大程度缓解了前端与运维的摩擦，问题也就不在前端了（+\_+）

这时候，前端不再提供静态资源，而是提供服务，一个 `http` 服务

前端写的 `dockerfile` 大致长这个样子

![image-20230504192741923](/images/image-20230504192741923.png)

但是有些时候 dockerfile 也跑不起来，所以前端还得维护一个`docker-compose.yaml`，交给运维执行命令 `docker-compose up -d` 启动前端应用。

![image-20230504192931458](/images/image-20230504192931458.png)

- 缺陷
  1. 构建镜像体积过大
  2. 构建镜像时间过长

## CI/CD 时代

- CI

  CI 的英文名称是`Continuous Integration`，中文翻译为：持续集成。

  主要为解决频繁代码改动，监测 ，拉取构建的工作难题

  ![image-20230504193350955](/images/image-20230504193350955.png)

- CD

- 持续交付 Continuous Delivery

  提交交付顾名思义是要拿出点东西的。在 CI 的自动化流程阶段后，运维团队可以快速、轻松地将应用部署到生产环境中或发布给最终使用的用户。

  从前端的角度考虑，在某些情况下肯定是不能直接通过自动化的方式将最终的 build 结果直接扔到生产机的。持续交互就是可持续性交付供生产使用的的最终 build。最后通过运维或者后端小伙伴进行部署。

- 持续部署 Continuous Deploymen

  与持续交付不同的是持续部署是作为持续交付的延伸，可以自动将应用发布到生产环境。

  ## jenkies

  Jenkins 是一个自包含的开源自动化服务器，可用于自动化与构建、测试、交付或部署软件相关的各种任务。

  Jenkins 可以通过本机系统包、Docker 安装，甚至可以在安装了 Java 运行时环境(JRE)的任何机器上独立运行。

  - 安装 Jenkins

  - 创建流水线

    - 拉取 gitlab 代码

      ![image-20230504194654360](/images/image-20230504194654360.png)

    - 构建环境

      需要 **系统管理 -> 全局工具配置** 中配置 `Node`

      ![图片](/images/Snipaste_2023-08-16_17-08-23.png)

    - 部署到目标服务器

      `Jenkins` 几乎不会和前端资源放到一个服务器。大多数情况下 `Jenkins` 所处的服务器环境就是一个工具用的服务器，放置了一些公司中常用的工具。因此构建到指定的服务器也至关重要。

      在**系统管理 -> 系统配置**中找到 `Publish over SSH` 点击新增，再点击高级，然后选中 `Use password authentication, or use a different key`

      ![图片](/images/Snipaste_2023-08-16_17-09-15.png)

​

Jenkins 流水线语法

```jenkies
pipeline {
    agent any // 在任何可用的代理上，执行流水线或它的任何阶段。
    environment {  // 全局环境变量
        VERSION = '0.0.1'
		NAME = 'test'
	}
	parameters { // 选项参数
		gitParameter defaultValue: 'origin/test', name: 'BRANCH', type: 'BRANCH', description: '分支'
		choice(name: 'DEPLOY_ENV', choices: ["test",'dev'], description: '部署环境')
	}
    stages {
        stage('Build') { // 定义 "Build" 阶段。
            steps {
                    // 执行与 "Build" 阶段相关的步骤。
                  }
         }
         stage('Deploy') { // 定义 "Deploy" 阶段。
                steps {
                		// 执行与 "Deploy" 阶段相关的步骤。
                                        script{
					if(params.DEPLOY_ENV == 'dev'){
                         env.DEPLOY_HOST = '192.168.1.1' //覆盖环境变量
					}
                }
         }
     }
}
```

- `pipline`： 定义流水线整个结构，可以看做是根节点
- `agent`：指示 `Jenkins` 为整个流水线分配一个执行器，比如可以配置 `Docker`
- `stages`：对整个 `CI` 流的包裹。
- `stage`： 可以理解为是对某一个环节的描述。注意：参数就是描述内容，可以是任何内容。不要想歪了只能传递 `Build` `Deploy` 这些。
- `steps`： 描述了 `stage` 中的步骤，可以存在多个。

## 使用 kubernetes 部署

随着业务越来越大，镜像越来越多，`docker-compose` 已经不太能应付，`kubernetes` 应时而出。这时服务器也从 1 台变成了多台，多台服务器就会有分布式问题
