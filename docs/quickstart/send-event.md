数据收集，即通过主动埋点或自动埋点的方式，收集用户的访问页面(pageview), 点击事件(click)和自定义事件(custom event)。需要使用SDK和Web API进行自动或手动的埋点。

=== "Javascript"
    目前Javascript SDK（[Github源码、使用说明、Demo](https://github.com/feature-flags-co/ffc-js-client-sdk)）还不支持自动埋点，需要手动调用`trackCustomEventAsync`函数或`trackCustomEvent`进行埋点，捕捉自定义事件(custom event)。Pageview和Click的自动捕捉会在11月左右发布。如下为在程序中捕捉custom event的代码示例：
    
    ```javascript
    await FFCJsClient.trackCustomEventAsync([
        {
        eventName: "开始使用点击事件"
        }
    ]);
    ```
    > 注：使用此方法前，需要进行初始化和用户注册([第1步, 创建一个功能开关](/quickstart/create-flag/))

=== "Web API"

    对于我们没能及时提供SDK的程序架构，可以使用我们的Web API来获得远端服务器的开关状态反馈。

    Curl
    ```bash
    curl --location 
         --request POST 'https://api.feature-flags.co/ExperimentsDataReceiver/PushData'
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
    POST /Variation/ExperimentsDataReceiver/PushData HTTP/1.1
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


----


## 后续操作

- [第6步, 数据实验（ab测试）](/quickstart/abtest/)
