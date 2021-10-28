# 集成开关到产品中（SDK和Web API）

我们需要在产品代码中集成我们的Web API或SDK，使我们可以通过UI控制产品模块的展现与隐藏，做细粒度的功能发布、回退与AB测试。

## 数据定义与准备
下面的案例中，我们将传入不同的参数，如下为各个参数的名称、定义与获取方式

| 名称           |           解释 &  获取方式            |  
| :---------------- | :----------------------------------- |
| `{项目的环境key}`       |  点击左侧菜单"账户管理"->在账户管理页面点击"项目"->在项目Tab找到对应的项目与环境，复制Secret下面的字符串  |
| `{用户名}`             |  产品用户系统中的用户名（或其他其他可以帮助用户命名的值）   |
| `{用户邮箱（选填）}`    |  产品用户系统中的用户邮箱（非必填）    |
| `{用户在产品中的唯一Id}` |  产品用户系统中的用户唯一识别号，如Id, Guid, OpenId等   |
| `{自定义属性名称}`与`{自定义属性值}` |  当需要传入用户的自定义属性时，可通过自定义属性数组传入。在后台设置开关目标用户时，会使用`{自定义属性名称}`与`{自定义属性值}`帮助做更丰富的用户匹配判断。   |
| `{开关Key}` |  点击左侧菜单"开关管理"->在列表中找到对应的开关，点击"详情"->在开关编辑页面的"设置"tab下找到"Key Name"并复制其值    |

## SDK与Web API集成

<!-- === "Javascript (无代码版)"

    以下为Js SDK的快速使用说明。此SDK支持Typescript，并且可以在Vue, Angular, React中被直接引用与使用。[Github源码、使用说明、Demo](https://github.com/feature-flags-co/ffc-js-client-sdk)。

    Npm安装插件
    ```
    npm install ffc-js-client-sdk --save
    ```

    浏览器的Import方式
    ```
    <script src="../node_modules/ffc-js-client-sdk/umd/index.js" ></script>
    ```
    Typescript 以及支持 import 语法的 JavaScript
    ```
    // For Javascript and Typescript
    import { FFCJsClient } from 'ffc-js-client-sdk/esm';
    ```

    初始化敏捷开关
    ```javascript
    // 初始化sdk，传入环境Key
    FFCJsClient.initialize('{项目的环境key}');
    ```
    上述方法中可以传入第二个可选参数，是一个包含如下可选选项的对象：
    ```
    {
        baseUrl: string, // 敏捷开关服务器地址 （只有使用本地安装的服务器才需要设置此参数， Saas版无需修改此参数）
        appType: string, // 应用类型， 默认为 'Javascript'
        throttleWait: number // throttle 的等待时间， 单位为毫秒，默认值为5000， 涉及 variationAsync，variation 这几个方法
    }
    ```
    如果我们只想修改 throttle 的等待时间，只需要按下边的例子调用 initialize 方法
    ```javascript
    // 初始化sdk，传入环境Key
    FFCJsClient.initialize('{项目的环境key}'， {throttleWait： 2000});
    ```

    在用户登录后传递用户信息给敏捷开关SDK
    ```javascript
    // 初始化用户信息，通常这一步会在登录后被调用
    FFCJsClient.initUserInfo({
        userName: '{用户名}',
        email: '{用户邮箱（选填）}}',
        key: '{用户在产品中的唯一Id}',
        customizeProperties: [ 
            {
                name: "{自定义属性名称}",
                value: "{自定义属性值}"
            }
        ]
    });
    ```
    无需埋点，后台配置，快速进行转化率测试

    // 文档正在更新中，敬请期待
    // 案例1. 对某一个功能模块进行发布、回退
    // 案例2. 对人群分流进行转化率测试

    ``` -->


=== "Javascript"

    以下为Js SDK的快速使用说明。此SDK支持Typescript，并且可以在Vue, Angular, React中被直接引用与使用。[Github源码、使用说明、Demo](https://github.com/feature-flags-co/ffc-js-client-sdk)。

    Npm安装插件(支持typescript和javascript)
    ```
    npm install ffc-js-client-sdk --save

    import { FFCJsClient } from 'ffc-js-client-sdk/esm';
    ```

    CDN安装
    ```
    <script src="https://assets.feature-flags.co/sdks/ffc-sdk.js" ></script>
    ```

    初始化敏捷开关
    ```javascript
    window.FFCJsClient.initialize('##{项目的环境key}##');
    ```
    上述方法中可以传入第二个可选参数，是一个包含如下可选选项的对象：
    ```
    {
        baseUrl: string, // 敏捷开关服务器地址 （只有使用本地安装的服务器才需要设置此参数， Saas版无需修改此参数）
        appType: string, // 应用类型， 默认为 'Javascript'
        throttleWait: number // throttle 的等待时间， 单位为毫秒，默认值为5000， 涉及 variationAsync，variation 这几个方法
    }
    ```
    如果我们只想修改 throttle 的等待时间，只需要按下边的例子调用 initialize 方法
    ```javascript
    // 初始化sdk，传入环境Key
    FFCJsClient.initialize('##{项目的环境key}##'， {throttleWait： 2000});
    ```
    在用户登录后传递用户信息给敏捷开关SDK
    ```javascript
    // 初始化用户信息，通常这一步会在登录后被调用
    FFCJsClient.initUserInfo({
        userName: '##{用户名}##',
        email: '##{用户邮箱（选填）}}##',
        key: '##{用户在产品中的唯一Id}##',
        customizeProperties: [ 
            {
                name: "##{自定义属性名称}##",
                value: "##{自定义属性值}##"
            }
        ]
    });
    ```
    沟通开关，获取当前用户对应的开关状态。
    ```javascript
    const result = FFCJsClient.variation('{开关Key}');

    // 根据返回的开关状态，执行不同的程序代码
    if (result === 'true') {
        doActionA();
    }
    else if (result === 'false') {
        doActionB();
    }

    ```
    > 如果需要异步请求的函数，可以在源码"/src/index.js"文件中寻找"variationAsync"函数
    


=== "微信小程序"
    
    我们为微信小程序作了单独的SDK，主要目的是为了方便后面的数据收集与测量。[点击查看GitHub上的开源代码与示例](https://github.com/feature-flags-co/ffc-sdk-wechat-miniprogram) 。下面为注入程序的关键代码和注释。

    在小程序根部的app.js中初始化敏捷开关
    ```javascript
    onLaunch() {
        FFC.init(
            "{项目的环境key}"
        );
    }
    ```
    在用户登录后传递用户信息给敏捷开关SDK
    ```javascript
    // 初始化用户信息，通常这一步会在登录后被调用
    FFC.initFFUserInfo({
        "ffUserName": "{用户名}",
        "ffUserEmail": "{用户邮箱（选填）}",
        "ffUserKeyId": "{用户在产品中的唯一Id}", 
        "ffUserCustomizedProperties": [  
            {
                name: "{自定义属性名称}",
                value: "{自定义属性值}"
            }
        ]
    });
    ```
    沟通开关，获取当前用户对应的开关状态。
    ```javascript
    FFC.checkVariation(
        '{开关Key}',
        // 根据返回的开关状态，执行不同的程序代码
        e => {
            if(e.variationValue == 'true'){
                doActionA();
            }
            else if (e.variationValue === 'false') {
                doActionB();
            }
        });
    ```
    > 如果需要异步请求的函数，可以在源码"/ffcplugin/index.js"文件中寻找"checkVariationAsync"函数
=== "Web API"

    对于我们没能及时提供SDK的程序架构，可以使用我们的Web API来获得远端服务器的开关状态反馈。

    Curl
    ```bash
    curl --location 
         --request POST 'https://api.feature-flags.co/Variation/GetMultiOptionVariation'
         --header 'Content-Type: application/json'
         --data-raw '{
             "environmentSecret": "{项目的环境key}",
             "featureFlagKeyName": "{开关Key}",
             "ffUserName": "{用户名}",
             "ffUserEmail": "{用户邮箱（选填）}",
             "ffUserKeyId": "{用户在产品中的唯一Id}",
             "ffUserCustomizedProperties": [
                 {
                     "name": "{自定义属性名称}",
                     "value": "{自定义属性值}"
                 }
             ]
         }'
    ```

    Http
    ```bash
    POST /Variation/GetMultiOptionVariation HTTP/1.1
    Host: api.feature-flags.co
    Content-Type: application/json

    {
        "featureFlagKeyName": "{开关Key}",
        "environmentSecret": "{项目的环境key}",
        "ffUserName": "{用户名}",
        "ffUserEmail": "{用户邮箱（选填）}",
        "ffUserKeyId": "{用户在产品中的唯一Id}",
        "ffUserCustomizedProperties": [
            {
                "name": "{自定义属性名称}",
                "value": "{自定义属性值}"
            }
        ]
    }
    ```

    Postman
    ![](/quickstart/img/3-1postman.png)

    返回值
    ```json
    {
        "localId": 1,
        "displayOrder": 1,
        "variationValue": "状态值"
    }
    ```

    | 变量          |           描述               |
    | :---------------- | :----------------------------------- |
    | localId             | 开关内部的返回状态的Id |
    | displayOrder        | 开关设置中显示状态的顺序 |
    | variationValue       | 状态值 |
-------

## 进阶策略 - 高可用性

因为程序代码由开关包裹，而开关是通过Http Post与远端服务器请求，就会出现几种风险:

1. 远端服务器宕机，无法做出有效状态反馈
2. 设备丢失网络连接，无法获得服务端有效状态反馈

为了避免上述风险，我们建议采用如下三种方法来增加程序的稳定性（当然，我们会尽最大努力保障一个99.7%以上的SLA）

- 默认值
- 记录最近一次返回的状态值
- 设置最小调用间隔

#### 默认值

我们在获取开关状态值时，可以加入一个默认值。即当获取出现bug时（服务端无响应、服务端返回非200、SDK自身出异常），返回默认值。

以Javascript为例
```javascript
    const result = FFCJsClient.variation('{开关Key}', '{自己设定的默认值}');
    if (result === '{自己设定的默认值}') {
        // 执行默认的功能模块
    }
    else {
        // 执行返回状态值对应的功能模块
    }
```

#### 记录最近一次返回的状态值

我们的Javascript SDK提供了记录最近一次返回值的功能。即当服务器访问出现错误时，对于相同的feature flag,SDK会首先查看是否有历史数据，如果有则使用历史返回状态，如果没有则使用默认值。以确保feature flag处于一个高可用状态。

#### 设置最小调用间隔

SDK 对于以下方法采用了 throttle 策略， 默认时间窗口为5000ms，5000ms之内的相同请求只会发送一次

- variationAsync
- variation

也可以在初始化时，通过传入可选参数的形式修改默认时间窗口值，如下：
```javascript
// 初始化sdk，传入环境Key
FFCJsClient.initialize('{项目的环境key}'， {throttleWait： 2000});
```

-------

## 后续操作

- [第4步, Feature管理、发布、回退](/quickstart/release-rollback/)
- [第5步, 数据收集(无埋点&自定义)](/quickstart/send-event/)
- [第6步, 数据实验（ab测试）](/quickstart/abtest/)

!!! 推荐章节
    [低代码集成 - SDK](/opensource/sdk/)

    [低代码集成 - Web API](/opensource/webapi/)