### 1. 创建预分流开关
![type:video](/codeless/img/创建预分流开关.mp4)

### 2. 在项目中集成SDK并初始化

抱歉，这个过程还是需要工程师介入。但只需要这一次即可，无需在其他步骤烦劳工程师。


=== "Javascript"

    引入SDK
    ```
    // CDN方式
    <script src="https://assets.feature-flags.co/sdks/ffc-sdk.js" ></script>

    // NPM方式 (javascript & typescript)
    npm install ffc-js-client-sdk --save

    import { FFCJsClient } from 'ffc-js-client-sdk/esm';
    ```



    初始化敏捷开关
    ```javascript
    window.FFCJsClient.initialize(
        '{项目的环境key}',
        {
            userName: '{用户名}',
            key: '{用户在产品中的唯一Id}'
        }
    );
    ```
    初始化使的参数解释，请参考章节[SDK Integration](/quickstart/sdk-integration/)

=== "微信小程序"
    
    微信小程序的SDK新版正在开发中，即将上线

=== "其他SDK"
   
    手机APP的SDK已经规划，我们将会根据客户的反馈一次进行开发与上线。

-------

### 无代码指定AB测试中的版本位置



<!-- 

## 集成SDK到应用程序中

Npm安装插件
```
npm install ffc-js-client-sdk --save
```
Import插件
```
// Html5 import 方法
<script src="../node_modules/ffc-js-client-sdk/umd/index.js" ></script>

// Typescript 以及支持 import 语法的 JavaScript
import { FFCJsClient } from 'ffc-js-client-sdk/esm';
```

初始化敏捷开关
```javascript
// 初始化sdk，传入环境Key
FFCJsClient.initialize('{项目的环境key}');
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

## 创建开关

点击左侧菜单中"开关管理"进入开关列表页面，然后点击右上角的按钮"+ 添加开关"

![](/quickstart/img/1-1创建开关.png)

输入开关的名称，点击"确定"。进入开关编辑页

![](/quickstart/codeless/img/2-codelesssetting.png)

## 设置css selector

使用浏览器的网站监测工具，获得相关功能模块的css selector。将其填入开关设置中，并配置对应的Web Url特征以及控制功能所对应的返回状态。

![type:video](/quickstart/codeless/img/20211018_123847.mp4)
> 上述演示用视频使用的是敏捷开关后台网站应用，请在自己的项目中选择对应的功能模块css selector

## 设置目标条件，控制功能发布

![type:video](/quickstart/codeless/img/20211018_125803.mp4)

## 数据指标与数据实验

### Pageview

![type:video](/quickstart/codeless/img/20211019_112418.mp4)

> 上述演示用视频使用的是敏捷开关后台网站应用，请在自己的项目中选择对应的pageview的web url

### 点击事件

![type:video](/quickstart/codeless/img/20211019_113337.mp4)

> 上述演示用视频使用的是敏捷开关后台网站应用，请在自己的项目中选择对应的功能模块css selector

## 查看数据实验报表

> 文档正在更新中，敬请期待... -->
