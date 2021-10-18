## 集成SDK到应用程序中

=== "Javascript网站应用"
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

## 添加数据收集指标

> 文档正在更新中，敬请期待...

## 创建数据实验

> 文档正在更新中，敬请期待...

## 查看数据实验报表

> 文档正在更新中，敬请期待...
