## [Kafka](https://kafka.apache.org)
## 简介
什么是Kafka？
Apache Kafka是一个分布式发布 - 订阅消息系统和一个强大的队列，可以处理大量的数据，并使您能够将消息从一个端点传递到另一个端点。 Kafka适合离线和在线消息消费。 Kafka消息保留在磁盘上，并在集群内复制以防止数据丢失。 Kafka构建在ZooKeeper同步服务之上。 它与Apache Storm和Spark非常好地集成，用于实时流式数据分析。

好处
以下是Kafka的几个好处 -

+ 可靠性 - Kafka是分布式，分区，复制和容错的。

+ 可扩展性 - Kafka消息传递系统轻松缩放，无需停机。

+ 耐用性 - Kafka使用分布式提交日志，这意味着消息会尽可能快地保留在磁盘上，因此它是持久的。

+ 性能 - Kafka对于发布和订阅消息都具有高吞吐量。 即使存储了许多TB的消息，它也保持稳定的性能。

Kafka非常快，并保证零停机和零数据丢失。
用例
Kafka可以在许多用例中使用。 其中一些列出如下 -

+ 指标 - Kafka通常用于操作监控数据。 这涉及聚合来自分布式应用程序的统计信息，以产生操作数据的集中馈送。

+ 日志聚合解决方案 - Kafka可用于跨组织从多个服务收集日志，并使它们以标准格式提供给多个服务器。

+ 流处理 - 流行的框架(如Storm和Spark Streaming)从主题中读取数据，对其进行处理，并将处理后的数据写入新主题，供用户和应用程序使用。 Kafka的强耐久性在流处理的上下文中也非常有用。

需要Kafka
Kafka是一个统一的平台，用于处理所有实时数据Feed。 Kafka支持低延迟消息传递，并在出现机器故障时提供对容错的保证。 它具有处理大量不同消费者的能力。 Kafka非常快，执行2百万写/秒。 Kafka将所有数据保存到磁盘，这实质上意味着所有写入都会进入操作系统(RAM)的页面缓存。 这使得将数据从页面缓存传输到网络套接字非常有效。

## 安装使用
```bash
docker pull apache/kafka:3.7.0 # 拉取镜像   apache/kafka:latest 最新镜像
docker run --name kafka  -p 9092:9092 apache/kafka:3.7.0 # 启动容器  mnt/shared/config 默认配置文件
docker run --name kafka  --volume path/to/property/folder:/mnt/shared/config  -p 9092:9092 apache/kafka:3.7.0 # 启动容器  注入配置文件
```

## 环境变量
Examples: will be rewrite
For abc.def, use KAFKA_ABC_DEF
For abc-def, use KAFKA_ABC___DEF
For abc_def, use KAFKA_ABC__DEF







## 连接kafka
+ node 环境下 使用 kafkajs
```js
import { Kafka } from 'kafkajs'
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] 
})


const producer = kafka.producer()

await producer.connect()
await producer.send({
  topic: 'test-topic',
  messages: [
    { value: 'Hello KafkaJS user!' },
  ],
})

await producer.disconnect()



const consumer = kafka.consumer({ groupId: 'test-group' })

await consumer.connect()
await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    })
  },
})
```
