## nest 上手
Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。它利用 JavaScript 的渐进增强的能力，使用并完全支持 TypeScript （仍然允许开发者使用纯 JavaScript 进行开发），并结合了 OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程）。

在底层，Nest 构建在强大的 HTTP 服务器框架上，例如 Express （默认），并且还可以通过配置从而使用 Fastify ！

Nest 在这些常见的 Node.js 框架 (Express/Fastify) 之上提高了一个抽象级别，但仍然向开发者直接暴露了底层框架的 API。这使得开发者可以自由地使用适用于底层平台的无数的第三方模块。
### 安装

```sh
yarn -g @nestjs/cli
## 初始化项目
nest new project-name  
```

### 目录

src

--- app.controller.spec.ts   //具有单一路由的基本控制器

---- app.controller.ts         // 控制器的单元测试。

---- app.module.ts           // 应用的根模块。

---- app.service.ts          // 具有单一方法的基本服务。

---- main.ts                    // 使用核心函数 `NestFactory` 创建 Nest 应用实例的应用入口文件。

## 入口

```ts
// src/main.ts
import { NestFactory } from '@nestjs/core'; // 默认选用的Server 服务 支持两个 HTTP 平台： express 和 fastify
import { AppModule } from './app.module'; // 导入服务模块

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap(); // 启动服务
```

## 路由控制器 controller

```ts
// test.controller.ts
import { Controller, Get, HttpCode, Header } from '@nestjs/common';

// Nest 为所有标准的 HTTP 方法提供装饰器： @Get()、@Post()、@Put()、@Delete()、@Patch()、@Options() 和 @Head()。 此外，@All() 定义了一个端点来处理所有这些。


@Controller('test')  //指定test 为可选路由路径前缀
export class CatsController {
  @Get()           // GET /test
  findAll(): string {
    return 'This action returns all cats';
  }
  @Post('add')         // POST /test/add
  @HttpCode(204)   //默认情况下响应 状态码 始终为 200，但 POST 请求除外，其为 201。
  @Header('Cache-Control', 'none') //指定自定义响应标头，并直接调用 res.header()
  create(@Body() createCatDto: CreateCatDto): string {
    return 'This action adds a new cat';
  }
  // 仅 express 支持路由中间的通配符。
  @Get('ab*cd')   // 通配符 将匹配 abcd、ab_cd、abecd 等 
  findLike() {
      return 'This route uses a wildcard';
   }
    
  @Get('docs')
  @Redirect('https://nest.nodejs.cn', 302)  // 重定向
  getDocs(@Query('version') version) {
      if (version && version === '5') {
        return { url: 'https://nest.nodejs.cn/v5/' };
      }
  }
    
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

**提示**要使用 CLI 创建控制器，只需执行 `$ nest g controller [name]` 命令。

### 服务 services 

```ts
// test/test.services.ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
// @Injectable() 装饰器附加元数据，它声明 CatsService 是一个可以由 Nest IoC 容器管理的类。
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

### 模块化

```ts
// test.module.ts
import { Module } from '@nestjs/common';
import { XinyueController } from './xinyue.controller';
import { XinyueService } from './xinyue.service';

@Module({
  controllers: [XinyueController], //此模块中定义的必须实例化的控制器集
  providers: [XinyueService],  //将由 Nest 注入器实例化并且至少可以在该模块中共享的提供程序
})
export class XinyueModule {}

// app.module.ts 根模块
import { Module } from '@nestjs/common';
import { XinyueModule } from './xinyue/xinyue.module';

@Module({
  imports: [XinyueModule],
})
export class AppModule {}
```

## 数据库

``` ts
// project.model.ts  定义sequelize ORM 表模型 包含表名, 模型名,对应字段
@Table({ tableName: 'project_data', timestamps: false })
export class ProjectData extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  project_name: string;

  @Column
  price: number;

  @Column
  num: number;

  @Column
  total_price: number;

  @Column
  settle: string;

  @Column
  settle_type: string;

  @Column
  create_time: Date;
}

```

### 模型使用

```ts
// use 
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project, ProjectData } from './db/project.model';
import type { createDataType } from './types/index';

@Injectable()
export class XinyueService {
  constructor(
    @InjectModel(Project)  // 注入sequelize 模型
    private ProjectModel: any,
    @InjectModel(ProjectData) // 注入sequelize 模型
    private ProjectDataModel: any,
  ) {}
  getHello(): string {
    return 'Hello World!22';
  }
  fetchList(): Promise<any> {
    return this.ProjectDataModel.findAll(); // 调用模型的内置方法
  }
  create(data: createDataType): Promise<any> {
    return this.ProjectModel.create(data);
  }
}
```

###  [模型查询(基础) | Sequelize中文文档 | Sequelize中文网](https://www.sequelize.cn/core-concepts/model-querying-basics)

```ts
// 一些简单使用示例
// 查询所有用户
const users = await User.findAll();
// 将所有没有姓氏的人更改为 "Doe"
await User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
});
// 删除所有名为 "Jane" 的人 
await User.destroy({
  where: {
    firstName: "Jane"
  }
});
// 创建一个新用户
const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
// 批量创建
const captains = await Captain.bulkCreate([
  { name: 'Jack Sparrow' },
  { name: 'Davy Jones' }
]);

// 提取10个实例/行
Project.findAll({ limit: 10 });

// 跳过8个实例/行
Project.findAll({ offset: 8 });

// 跳过5个实例,然后获取5个实例
Project.findAll({ offset: 5, limit: 5 });

```





