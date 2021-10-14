# 实验数据收集

数据收集，即通过主动埋点或自动埋点的方式，收集用户的访问页面(pageview), 点击事件(click)和自定义事件(custom event)。需要使用SDK和Web API进行自动或手动的埋点。

=== "Javascript"
    目前Javascript SDK（[Github源码、使用说明、Demo](https://github.com/feature-flags-co/ffc-js-client-sdk)）还不支持自动埋点，需要手动调用`trackCustomEventAsync`函数或`trackCustomEvent`进行埋点，捕捉自定义事件(custom event)。Pageview和Click的自动捕捉会在11月左右发布。如下为在程序中捕捉custom event的代码示例：
    
    ```javascript
    // 异步方法
    await FFCJsClient.trackCustomEventAsync([
        {
            eventName: "{事件名称}"
        }
    ]);

    // 同步方法
    FFCJsClient.trackCustomEvent([
        {
            eventName: "{事件名称}"
        }
    ]);
    ```
    > 注：使用此方法前，需要进行初始化和用户注册([第1步, 创建一个功能开关](/quickstart/create-flag/))

=== "Web API"

    对于我们没能及时提供SDK的程序架构，可以使用我们的Web API来获得远端服务器的开关状态反馈。

    Http
    ```bash
    POST /ExperimentsDataReceiver/PushData HTTP/1.1
    Host: api.feature-flags.co
    Content-Type: application/json

    [
        {
            "route": "{pageview的路径}",
            "secret": "{environment key}",
            "type": "{事件类型}",
            "eventName": "{事件名称}",
            "user": {
                "ffUserName": "{用户名}",
                "ffUserEmail": "{用户邮箱（选填）}",
                "ffUserKeyId": "{用户在产品中的唯一Id}",
                "ffUserCustomizedProperties": [
                    {
                        "name": "{用户的自定义属性名称}",
                        "value": "{用户的自定义属性值}"
                    }
                ]
            },
            "appType": "{应用服务类型或技术架构}",
            "customizedProperties": [
                {
                    "name": "{事件的自定义属性名称}",
                    "value": "{事件的自定义属性值}"
                }
            ]
        }
    ]
    ```

上方数据的数据定义如下:

| 名称           |           解释 &  获取方式            |  
| :---------------- | :----------------------------------- |
| `{事件类型}` |  `CustomEvent`, `PageView`, `Click` |
| `{项目的环境key}`       |  点击左侧菜单"账户管理"->在账户管理页面点击"项目"->在项目Tab找到对应的项目与环境，复制Secret下面的字符串  |
| `{用户名}`             |  产品用户系统中的用户名（或其他其他可以帮助用户命名的值）   |
| `{用户邮箱（选填）}`    |  产品用户系统中的用户邮箱（非必填）    |
| `{用户在产品中的唯一Id}` |  产品用户系统中的用户唯一识别号，如Id, Guid, OpenId等   |
| `{用户的自定义属性名称}`与`{用户的自定义属性值}` |  当需要传入用户的自定义属性时，可通过自定义属性数组传入。在后台设置开关目标用户时，会使用`{自定义属性名称}`与`{自定义属性值}`帮助做更丰富的用户匹配判断。   |
| `{pageview的路径}` |  即用户访问的页面的路径（适合网站应用），其他类型应用可填入用户友好的字符串（无特殊限制）   |
| `{事件名称}` | 只在CustomEvent下有用，即CustomEvent的事件名称    |
| `{事件的自定义属性名称}` 与 `{事件的自定义属性值}` |  后期可通过自定义属性做更好的AB实验，获得更有效的结果   |


----


## 后续操作

- [第6步, 数据实验（ab测试）](/quickstart/abtest/)
