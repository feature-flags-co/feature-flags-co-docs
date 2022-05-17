---
sidebar_position: 2
---

# Java (Spring boot) SDK

:::tip


阅读本教程前，请先阅读[关于完整的 SDK 介绍与使用，可以点击查看教程《Java Server SDK》](/docs/sdks/sdks/Java)。

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

## 自动捕捉染色信息

我们支持自动捕捉通过http请求设置的染色信息，然后自动生成当前用户的 `FFUser`。当满足下面条件时，不再需要手动初始化`FFUser`
1. 使用 ffc-java-springboot-web 依赖
2. 登录 https://portal.featureflag.co 后台后，进入《用户管理》列表，点击按钮《属性管理》按钮，在弹出窗口中点击《用户标签》，然后点击《添加新标签》按钮添加必要的用户自定义标签。

## 自动注入 FFCClient
使用 ffc-java-springboot-web 或者 ffc-java-springboot 依赖，spring boot会自动注入 `FFCClient`。 如果您配置了自动捕捉染色信息，在使用SDK的时候不再需要初始化 `FFCUser`；否则需要根据根据当前用户信息初始化 `FFCUser`。

示例1

```java
@RestController
@RequiredArgsConstructor
public class HiController {

    private final FFCClient client;

    @GetMapping("/hi")
    public String hi() {

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


## FeatureGate 注释的使用
`@FeatureGate` 主要用于分流，可以修饰MVC的controller中的method，替代 `if/else`, 让feature flag的使用更加灵活，方便。

示例2.1
```java
@RestController
@RequiredArgsConstructor
public class HiController {

    @GetMapping("/hi")
    @FeatureGate(feature = "示例开关", fallback = "/old-hi")
    public ResponseEntity<String> newHi() {
        return ResponseEntity.ok("Hello, new function");
    }

    @GetMapping("/old-hi")
    public ResponseEntity<String> oldHi() {
        return ResponseEntity.ok("Oh, this is old function");
    }

}
```

示例2.2
```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    @FeatureGate(feature = "灰度发布示例", value = "eng", others = {
            @RouteMapping(value = "fr", path = "/hello/fr"),
            @RouteMapping(value = "cn", path = "/hello/cn"),
    }, fallback = "/error")
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

    @GetMapping("/error")
    public ResponseEntity<String> error() {
        return ResponseEntity.ok("SDK internal error");
    }
}
```

- `@FeatureGate` 目前**仅支持自动捕获用户信息的场景**，内部实现依赖于 Filter 和 Interceptor，`@FeatureGate` 的 Filter 和 Interceptor启动顺序处在最低优先级，但如果染色信息没有在这两个阶段注入或是没有通过http request注入则无法支持自动捕获用户信息
- 如上例所示，在使用SDK分流时，对相同功能的不同版本只需要`@FeatureGate`修饰其中一个method即可，通过 `others` 和 `fallback`属性设置路由访问其他的版本。
- `value` 表示所期望的flag value, 如果不设置此值，则`@FeatureGate`会尝试将flag value转换成true或false。如果flag value = true，表示匹配成功；如果 flag value = false或是无法转换，表示匹配不成功，根据 `fallback` 设置的值进行转发，如果没有设置 `fallback` 只会返回一个http status为200的空response。
- `others` 表示当flag value ！= value时，flag value 可能值的路由列表（指定URL的时候请使用绝对路径）；`fallback` 表示当feature flag value ！= value时的默认路由（others没有设置或是others的所有值都不匹配）；如果既没有指定`others` 又没有指定 `fallback`，当feature flag value ！= value时 只会返回一个http status为200的空response,
- 当开关不存在或是SDK发生异常的时候，如果设置了 `fallback` 值，将会转发到fallback指定的URL，如果没有设置fallback值，`@FeatureGate` 只会返回一个http status为200的空response
- `@FeatureGate` 的路由支持 restful syntax(比如http://host/user/{id}),但需要指出的是，占位符中的参数需要在FeatureGate所修饰的方法对应的@RequestMapping（@GetMapping，@PostMapping）指定的URL中出现过，否则占位符参数无法解析, 可能产生http 404错误
- **不要在设置路由信息的时候造成死循环，否则SDK会抛出 `StackOverflowError` 异常**

示例3，SDK支持restful url

```java
@RestController
public class HelloController {
    
    @GetMapping("/hello/{name}")
    @FeatureGate(feature = "灰度发布示例", value = "eng", others = {
            @RouteMapping(value = "fr", path = "/hello/{name}/fr"),
            @RouteMapping(value = "cn", path = "/hello/{name}/cn"),
    }, fallback = "/error")
    public ResponseEntity<String> hello(@PathVariable String name) {
        return ResponseEntity.ok("Hello " + name);
    }

    @GetMapping("/hello/{name}/fr")
    public ResponseEntity<String> helloInFrench(@PathVariable String name) {
        return ResponseEntity.ok("Bonjour " + name);
    }

    @GetMapping("/hello/{name}/cn")
    public ResponseEntity<String> helloInChinese(@PathVariable String name) {
        return ResponseEntity.ok("你好 " + name);
    }

    @GetMapping("/error")
    public ResponseEntity<String> error() {
        return ResponseEntity.ok("SDK internal error");
    }

}
```

示例4，示列5说明了由于路由设置错误可能造成死循环的情况。SDK使用过程中，请避免造成死循环。

示例4:
```java
    @GetMapping("/hello")
    @FeatureGate(feature = "灰度发布示例", value = "eng", others = {
            @RouteMapping(value = "fr", path = "/hello"),
            @RouteMapping(value = "cn", path = "/hello"),
    })
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello");
    }
```

示例5:
```java
    @GetMapping("/hello")
    @FeatureGate(feature = "灰度发布示例", value = "eng", others = {
            @RouteMapping(value = "fr", path = "/hello/fr"),
            @RouteMapping(value = "cn", path = "/hello/cn"),
    })
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello");
    }

    @GetMapping("/hello/fr")
    @FeatureGate(feature = "灰度发布示例", value = "frr", fallback = "/hello")
    public ResponseEntity<String> helloInFrench() {
        return ResponseEntity.ok("Bonjour");
    }
```