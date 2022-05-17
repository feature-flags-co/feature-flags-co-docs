---
sidebar_position: 5
---

import Image from '@site/src/components/Image';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

| 阅读和实践需要约20分钟

快速入门中，我们将快速的展示两个Demo：
- 新特性的发布与回滚(功能的开与关)。
- 新特性的灰度发布（功能的不同版本）

## 在UI中创建一个 feature flag

登录 https://portal.featureflag.co 后台后，进入《开关管理》列表，点击按钮《+添加开关》。

<Image maxWidth="800px" width="100%" src="/img/docs/quick-start/create-feature-flag.png" />

在《新建开关》弹窗中输入 feature flag 的名称，并自动生成对应的 keyName (feature flag被调动时的识别key id)。

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/create-feature-flag-2.png" />

## 设置 feature flag 返回值

Feature flag 被建立后，会初始化两个返回值 `true` 和 `false` ，并将默认返回值设置为 `false`，并且开关处于 `开` 的状态。

- 开关在 `开` 状态时，返回《默认返回值》对应的配置返回值。初始化时为 `false`。
- 开关在 `关` 状态时，返回《如果开关关闭了，应返回》对应的返回值。初始化时为 `false`。

<Image maxWidth="560px" width="100%" src="/img/docs/quick-start/return-setting-1.png" />

当前，我们保留《默认返回值》的开关返回值设置为 `false`。

## 在Spring Boot应用中集成并使用 feature flag

:::tip
快速入门教程使用的JAVA Integration SDK的版本为1.1[点击查看GitHub的Release地址](https://github.com/feature-flags-co/ffc-java-intergrations/releases/tag/java-sdk-integration-final-1.1)。

:::

## 安装SDK
使用 Maven 安装, 我们需要
1. 指定使用 okhttp3 的 4.9.3 版本
2. 指定使用 Github Maven Repository
3. 引入 ffc-java-springboot-web 或者 ffc-java-springboot 依赖

```
    <repositories>
        <repository>
            <id>github-ffc-java-intergrations-repo</id>
            <name>The Maven Repository on Github</name>
            <url>https://feature-flags-co.github.io/ffc-java-intergrations/maven-repo</url>
        </repository>
        <repository>
            <id>github-ffc-java-sdk-repo</id>
            <name>The Maven Repository on Github</name>
            <url>https://feature-flags-co.github.io/ffc-java-sdk/maven-repo</url>
        </repository>
    </repositories>

    <properties>
        ...
        <!-- we need use okhttp3 4.9.3 version -->
        <okhttp3.version>4.9.3</okhttp3.version>
    </properties>

    <dependencies>
        ...
        <dependency>
            <groupId>co.featureflags</groupId>
            <artifactId>ffc-java-springboot-web</artifactId>
            <version>1.1</version>
        </dependency>
        ...
    </dependencies>

```

## 配置Spring Boot

首先在 application.properties或application.yml 填入您所在环境的 envSecret

```
ffc.spring.env-secret={your-env-secret}
```

其中，`envSecret` 可以在《组织机构》页面的《项目》标签下找到，如下图所示：

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/secret.png" />

## 获取 feature flag 的值

```java
@RestController
@RequiredArgsConstructor
public class OnOffController {

    private final FFCClient client;

    @GetMapping("/onoff")
    public String switchOnOff(@RequestHeader(value = "x-user-key") String key,
                           @RequestHeader(value = "x-user-name") String name) {

        FFCUser user = new FFCUser.Builder(key)
                .userName(name)
                .build();

        if(client.boolVariation("示例开关", user, false)){
            return newFunction();
        }
        return oldFunction();
    }

    public String newFunction() {
        return "Hello, new function";
    }


    public String oldFunction() {
        return "Oh, this is old function";
    }

}
```
在JAVA Integration SDK的支持下，`FFCClient`可自动注入Spring Boot项目中。 需要创建`FFUser`对象，它代表一组可以用于feature flag评估的属性，通常是您程序中的用户信息。这个对象包含4个内置属性(`key`, `userName`, `email` 和 `country`)。 其中`key`和`userName`属性是必须的，`key`用于标识目标用户，`userName`属性方便查找目标用户。其他的内置属性都是可选的，您还可自定义属性。本示例中通过http header传入染色信息，初始化`FFCUser`。

接下来根据 `FFUser` 获得feature flag的值，输入您刚才设置的feature flag对应的keyName，user以及默认值（当SDK发生错误时，默认的返回值），`FFCClient#boolVariation`函数用于计算feature flag的值，返回值为boolean类型。

SDK 支持 String，Boolean，Number 类型的flag value，提供支持这些类型的variation的函数获得相应的flag value。

## 发布/回滚(开/关) feature

启动上述示例的代码，使用Postman连接 `http://localhost:8080/onoff` 由于创建feature flag 的默认返回值为 false，运行程序会显示 `oldFunction`的输出结果 Oh, this is old function（模拟旧版功能）。

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/springboot/return-flag-value.png" />

回到敏捷开关 Portal 的后台界面，进入自己创建的 feature flag 详情页面的 《目标条件》Tab，在《默认返回值》中将返回值设置为 `true` 后，点击按钮《保存设置》。

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/wechat/update-to-true.png" />

再使用 Postman 连接 `http://localhost:8080/onoff`，会显示`newFunction`的输出结果Hello, new function（模拟新版功能）。我们成功的控制了功能模块的发布！

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/springboot/return-flag-value-2.png" />

当`newFunction`由于某些原因无法正常运行的时候，我们可以将《默认返回值》改回`false`或是直接关闭开关，这样程序就回滚到原来的版本！

在Web环境中，新feature发布/回滚并不需要重新部署应用，feature flag可以极大的提升开发的效率，节约成本！ 

## 自动捕捉染色信息

我们支持自动捕捉通过http请求设置的染色信息，然后自动生成当前用户的 `FFUser`。当满足条件时，不再需要手动初始化`FFUser`
1. 使用 ffc-java-springboot-web 依赖
2. 登录 https://portal.featureflag.co 后台后，进入《用户管理》列表，点击按钮《属性管理》按钮，在弹出窗口中点击《用户标签》，然后点击《添加新标签》按钮添加必要的用户自定义标签。

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/springboot/user-tags.png" />

上个示例示列的代码可以简化如下：

```java
@RestController
@RequiredArgsConstructor
public class OnOffController {

    private final FFCClient client;

    @GetMapping("/onoff")
    public String switchOnOff() {

        if(client.boolVariation("示例开关", false)){
            return newFunction();
        }
        return oldFunction();
    }

    public String newFunction() {
        return "Hello, new function";
    }


    public String oldFunction() {
        return "Oh, this is old function";
    }


}
```

## 灰度发布

:::tip
`@FeatureGate` Annotation的使用注意事项，请参考教程[《Spring Boot SDK》](/docs/sdks/sdks/spring-boot)
:::

使用SDK和 `if/else` 可以很容易的把用户分流到不同版本上，实现灰度发布/测试。这里通过一个简单的示例展示使用 `@FeatureGate` annotation实现灰度发布。

`@FeatureGate` 可以修饰MVC的controller中的method，替代 `if/else`, 让feature flag的使用更加灵活，方便。 

下面我们将使用 `@FeatureGate` Annotation 实现依据用户的开关返回值，对请求自动转发以获得不同语言的 hello 消息，以此来模拟灰度发布。

和上个示例一样，我们在UI中先创建一个开关，然后设置三个不同的返回值 `eng`，`fr`，`cn`，分别代表英语，法语，中文三种不同的语言，以此模拟一个feature的不同版本。我们在开关的《默认规则》中选择《按百分比匹配》，这样不同的用户按照 `FFCUser` 的 `key` 属性获得不同的返回值。

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/springboot/grayscale-release.png" />

```java
@RestController
public class GrayscaleController {

    @GetMapping("/hello")
    @FeatureGate(feature = "灰度发布示例", value = "eng", others = {
            @RouteMapping(value = "fr", path = "/hello/fr"),
            @RouteMapping(value = "cn", path = "/hello/cn"),
    })
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello");
    }

    @GetMapping("/hello/fr")
    public ResponseEntity<String> helloInFrench() {
        return ResponseEntity.ok("Bonjour");
    }

    @GetMapping("/hello/cn")
    public ResponseEntity<String> helloInChinese() {
        return ResponseEntity.ok("你好");
    }
}
```
不同用户访问同一个endpoint时，会根据当前用户的`key`值取得不同的flag value， `@FeatureGate`会根据提前设置好的的路由将用户请求转发到相应的灰度/版本上。

`@FeatureGate` 的 `value`属性用于设置期望的flag value，如果当前用户实际flag value与期望值不符，`@FeatureGate` 会查找 `others` 属性设置的路由表；如果仍旧不匹配则会根据`fallback` 属性的值进行转发；如果没有设置`fallback` 属性，只会返回一个http status为200的空response。正确使用 `@FeatureGate` 请参考教程[《Spring Boot SDK》](/docs/sdks/sdks/spring-boot)

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/springboot/return-cn.png" />

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/springboot/return-eng.png" />

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/springboot/return-fr.png" />

使用我们的feature flag平台和SDK，灰度发布不再需要部署不同branch，既节省了成本又提高了开发团队的效率！

