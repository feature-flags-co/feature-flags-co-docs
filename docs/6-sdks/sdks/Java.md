---
sidebar_position: 1
---


# Java Server SDK
:::tip

当前文档的版本Release版本（1.1.1）[点击查看GitHub的Release地址](https://github.com/feature-flags-co/ffc-java-sdk/releases/tag/ffc-java-server-sdk_v1.1.1)。
:::

## 概述

JAVA Server SDK 基于feature flag 管理平台 [featureflag.co](https://featureflag.co/)，主要用于Java多用户环境下的应用程序

SDK 主要完成以下工作:

- 存储可用的feature flag，为给定的目标用户计算feature flag的值
- 为A/B/n测试和数据分析向[featureflag.co](https://featureflag.co/)发送必要的数据

##  数据同步

SDK 使用 WebSocket 来保持与服务端的数据同步，从服务端获取的数据均会存入内存。无论何时当任意 feature flag 发生变化时，变更会被接近实时地推送到 SDK，经过测试，同步过程平均耗时少于 **100 ms**。当网络发生中断时 SDK 会尝试以渐增的时间间隔与服务器重新建立连接，及时恢复数据同步。

## 离线模式

SDK支持离线模式。在离线模式下，SDK不会与 [featureflag.co](https://featureflag.co/)交换任何数据。 Feature Flag可以通过`FFCClient#initializeFromExternalJson()`初始化。

开启离线模式:
```java
 FFCConfig config = new FFCConfig.Builder()
                    .offline(false)
                    .build()
 FFCClient client = new FFCClientImp(envSecret, config);

 //  初始化feature flags
 client.initializeFromExternalJson(json);
```
json 数据需要从[featureflag.co](https://featureflag.co/)管理平台导出。离线模式主要用于内部测试，生产环境下不推荐使用

## feature flag 的计算

所有数据都同步到本地内存，所有计算过程也都在本地，并且是实时同步数据。计算过程时间通常小于 **10 ms**。

## 安装SDK
使用 Maven 安装
```
<repositories>
      <repository>
          <id>github-ffc-java-sdk-repo</id>
          <name>The Maven Repository on Github</name>
          <url>https://feature-flags-co.github.io/ffc-java-sdk/maven-repo</url>
      </repository>
  </repositories>

  <dependencies>
      <dependency>
          <groupId>co.featureflags</groupId>
          <artifactId>ffc-java-server-sdk</artifactId>
          <version>1.1.1</version>
      </dependency>
  </dependencies>
```

## SDK
SDK是线程安全的。使用SDK时，在应用程序生命周期内应当只创建一个实例。如果需要计算不同环境下的feature flag，可以创建不同的实例，但是每个实例应当在整个生命周期中予以保留，不要为每个请求或是线程创建实例。

### 初始化 SDK
SDK的初始化时通过调用`FFCClientImp`对象的构造函数完成。在此过程中， SDK通过streaming和[featureflag.co](https://featureflag.co/)同步数据。

如果数据同步成功或是连接超时（默认15秒），构造函数都会返回。当连接超时后，日志会提示SDK初始化没有完成，如果此时计算feature flag的值，会返回您设置的默认值。SDK会继续尝试连接处非遇到严重的网络问题，或是您主动关闭SDK(调用`FFCClient#close()`函数)。您可以通过`FFCClient#isInitialized()`函数确定SDK是否成功初始化。

```java
// 设置env secret, 使用默认config
FFCClient client = new FFCClientImp(envSecret);
if(client.isInitialized()){
    // 你的代码
}
```

如果您不希望等待初始化完成后再获取SDK实例，您可以通过使用`FFCClient#getDataUpdateStatusProvider()` 对象获取SDK的状态，该对象提供了异步的SDK初始化。

```java
// 等待时间设置为0
FFCConfig config = new FFCConfig.Builder()
             .startWait(Duration.ZERO)
             .build();
FFCClient client = new FFCClientImp(envSecret, config);
    
// 在获得client对象以后再等待SDK初始化
boolean inited = client.getDataUpdateStatusProvider().waitForOKState(Duration.ofSeconds(15))
if (inited) {
    // 你的代码
}
```

### FFCConfig 设置
`FFCConfig` 支持对SDK组件进行配置（**推荐使用默认设置**），这里介绍一些主要配置。

`startWaitTime`: SDK初始化的最长等待时间，如果设置为0或者负值，则`FFCClientImp`构造函数不等SDK初始化完成立即返回。

`offline`: SDK是否处于离线模式，默认为false

```java
// 默认设置
FFCClient client = new FFCClientImp(envSecret);

// 设置等待时间和离线模式
FFCConfig config = new FFCConfig.Builder()
            .startWaitTime(Duration.ofSeconds(15))
            .offline(false)
            .build()
FFCClient client = new FFCClientImp(sdkKey, config);
```

`FFCConfig` 还支持对SDK组件进行高级配置以及自定义SDK组件

`HttpConfigFactory`: 工厂接口用于创建`HttpConfig`。可以通过`Factory#httpConfigFactory()`创建SDK的默认的`HttpConfig`组件。使用`HttpConfig`可以设置 connection/read/write timeout，以及 proxy or insecure/secure socket。

```

HttpConfigFactory factory = Factory.httpConfigFactory()
                                   .connectTime(Duration.ofMillis(3000))
                                   .httpProxy("http://my-proxy", 9000)
                                   .passwordAuthenticator("userName", "password");

FFCConfig config = new FFCConfig.Builder()
                      .httpConfigFactory(factory)
                      .build();
```


`DataStorageFactory` 工厂接口用于创建存储同步数据的 `DataStorage`， 可以通过 `Factory#inMemoryDataStorageFactory()` 创建SDK默认的 `DataStorage` 组件。您也可以通过实现 `DataStorage` 接口自定义组件，比如可以把数据存储在Redis，MongoDB等等。

```
FFCConfig config = new FFCConfig.Builder()
                      .dataStorageFactory(factory)
                      .build();

```

`UpdateProcessorFactory` 工厂接口用于创建 `UpdateProcessor` 从featureflag.co接受同步数据。可以通过 `Factory#streamingBuilder()` 创建websocket streaming。

`InsightProcessorFactory` 工厂接口用于创建 `InsightProcessor` 用于发送event，数据分析数据等等。可以通过 `Factory#insightProcessorFactory()` 创建SDK默认的 `InsightProcessor` 组件

您可以通过阅读javadoc和源代码了解跟多的细节。

### 获取 feature flag 的值
SDK在本地计算给地目标用户的feature flag，然后返回一个数值或是一个描述feature flag返回值详情的对象。

`FFUser`: 目标用户，一组可以用于feature flag评估的属性，通常是您程序中的用户信息。
这个对象包含4个内置属性(`key`, `userName`, `email` 和 `country`)。 其中`key`和`userName`属性是必须的，`key`用于标识目标用户，`userName`属性方便查找目标用户。

其他的内置属性都是可选的，您还可以自定义属性。

```java
    // 初始化 SDK
    FFCClient client = new FFCClientImp(envSecret);
    
    // 创建 FFUser 
    FFCUser user = new FFCUser.Builder("key")
        .userName("name") 
        .country("country")
        .email("email@xxx.com")
        .custom("property", "value")
        .build()
    
    // 确认 SDK已经成功初始化
    if(client.isInitialized()){
        // 获取详细的variation
        FlagState<String> res = client.variationDetail("flag key", user, "Not Found");
        // 仅仅获取flag value
        String res = client.variation("flag key", user, "Not Found");
        // 获取全部flag variations
        AllFlagStates<String> res = client.getAllLatestFlagsVariations(user);
    }
    
```
如果在SDK初始化前对feature flag取值或是设置了错误的flag key或是目标用户，SDK会返回您设置的默认值（上面例子中设置的默认值为Not Found）。`FlagState`对象封装了上一次计算的细节，比如错误的原因等等。

可以使用`FFCClient#getAllLatestFlagsVariations`函数获取特定环境下所有可用feature flag的值，SDK返回 `AllFlagStates`对象，它包含了所有feature flag计算过程中的细节信息。

SDK 支持 String，Boolean，Number 类型的flag value, 查看javadoc了解更多细节

### A/B/n测试
只需要在我们的平台上创建并开始A/B/n测试就可以实时获得结果。

A/B/n测试支持pageviews和clicks事件的自动捕捉。如果需要捕捉自定义事件，SDK提供了相应的方法：
```java
client.trackMetric(user, eventName, numericValue);
```
**numeric_value**参数为可选项，默认值为 **1.0**.

确保`FFCClient#trackMetric`在对应的feature flag计算完以后再调用，否者该事件不会被实验统计。