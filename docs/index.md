

# 快速入门

## 案例

敏捷开关这款产品尤其适用**在有限的时间内在无/低技术人员参与下**实现最高效的迭代，对企业决策者、产品经理、产品运营、以及开发者都会有极大的帮助，尤其是对于中小企业整体快速迭代与市场增长起着至关重要的促进作用。

在产品推广中我们通常先要找到最能理解产品价值的那一小部分人。所以我们决定对不同的人群，发放官网的不同话术版本。通过测量访问者点击“使用产品”按钮和“查看文档”按钮的转化率（我们称之为兴趣转化率），来快速的缩小早期主要推广的人群。

我们准备了2个话术版本:

- A版 : 以产品经理、运营为导向的热迭代话术版本
- B版 : 以技术、运维为导向的热迭代话术版本

我们通关敏捷开关做如下分流:

1. 自主通过官网地址访问网站的人，我们80%分流给A版，20%分流给B版。因为我们主动推给了很多部门负责人和c字头开始的企业高管和老板
2. 通过非技术博主文章访问的人，我们100%分流给A版
3. 通过csdn技术博主文章访问的人，我们100%分流给B版

两个版本分流给不同的群体后，我们使用敏捷开关中的“数据实验”功能，高频率的查看兴趣转化率。一天后，我们观察到A版的转化率更高。考虑到实验人群分布的问题，我们在第二天快速的调整了分流与分量（让更多的人去访问B版），以最快的速度验证是否与实验人群分布有关。

我们通过反复的迭代（分流分群、验证、调整、重新分流分群、再验证），做出了我们的初步决策和总结，将A3版(即A版的第3次话术迭代版)作为了下次更大范围推广的官网版本。

一篇受众量有限的推文的时效性很短（往往就5天），我们必须在有限的时间内实现最高效的迭代才有可能取得成果，整个过程是比较紧张的。但上述过程通过敏捷开关只需要点击几下按钮进行简单的设置，一点点的代码嵌入就可以完成，无需技术团队介入无需重新部署就可以实现快速调整市场测试策略。

## 案例实现

### 注册用户，创建项目与环境

如果还没有建立账户的读者，可以先[注册新用户](https://portal.feature-flags.co/login/register) 。对于用户注册、账户管理的具体细节，可参考教程[多租户与项目管理](https://docs.feature-flags.co/account-setting/)。

### 功能开关的创建与使用

登入开关管理页面后首先我们要创建一个敏捷开关，这个开关如上文所示用来分流不同的用户群体以便不同的用户群体看到不同版本的官网。
点击“添加开关”按钮，然后在对话框入中输入开关的名字，点击“确定”即可。

![](/img/quickstart/add-new-bouton.png)

在刚创建的开关中进入“设置“页面我们开始设置分流，在返回状态管理下设置两个返回值对应不同的官网版本（A版以产品经理、运营为导向的热迭代话术版本，B版以技术、运维为导向的热迭代话术版本），然后点击“提交”即可，这两个新设置的值会通过SDK返回。

![](/img/quickstart/add-return-value.png)

接下来我们设置“开关用户”属性来区别不同的用户群体。进入"开关用户管理页面"，点击“属性管理”按钮添加一个新属性。属性会通过SDK交互，在这个案例里我们添加的属性可以传递官网url中的参数，这样我们就可以定位不同的用户群体。

![](/img/quickstart/add-new-attri.png)

最后在我们刚创建的开关中的“目标条件”页面设置三组相应的规则。首先添加两组定向的分流规则分别对应A版群体产品经理、运营以及B版群体技术、运维，然后再添加默认规则对应从官网地址直接访问的用户，最后点击“保存设置”完成开关创建。

![](/img/quickstart/add-new-rules.png)

<!--功能开关的创建、使用、用户分流:
![type:video](./videos/开关的建立与分流分组.mp4)
-->
### 低代码包裹不同版本

创建好开关后，需要研发团队将这些开关植入到产品代码中。让开关函数包裹代码，使用户可以通过后台控制功能特性的分流、分群和完成数据实验。

=== "Javascript"
    [点击查看GitHub上的开源代码与示例](https://github.com/feature-flags-co/ffc-js-client-sdk)  ,  Github上的demo文件夹内有示例代码

    Github中的基础文档可以帮助运行示例程序，了解更多的使用细节。下面为注入程序的关键代码和注释。

    初始化敏捷开关
    ```javascript
    // 初始化sdk，传入环境Secret Key和用户信息
    FFCJsClient.initialize('YThmLWRmZjUtNCUyMDIxMDkxNzA3NTYyMV9fMl9fMjJfXzExNl9fZGVmYXVsdF82NTM3Mg==');
    ```
    在用户登录后传递用户信息给敏捷开关SDK
    ```javascript
    // 初始化用户信息，通常这一步会在登录后被调用
    FFCJsClient.initUserInfo({
        userName: 'sdk-sample-js-1252',
        email: '',
        key: 'sdk-sample-js-1252',
        customizeProperties: [
            {
                name: "外放地址",
                value: "?from=zhihu&group=pm"
            }
        ]
    });
    ```
    从敏捷开关服务器获取分配给用户的变量值，并根据业务逻辑执行不同的功能模块
    ```javascript
    const result = FFCJsClient.variation('主页---话术版本', '产品经理版1');
    if (result === '产品经理版1') {
        document.getElementById('version-a').style.display = 'block';
    }
    else if (result === '程序员版1') {
        document.getElementById('version-b').style.display = 'block';
    }
    else if (result === '产品经理版2') {
        document.getElementById('version-c').style.display = 'block';
    }
    else {
        document.getElementById('version-a').style.display = 'block';
    }
    ```
    如果需要同步请求的函数，可以在源码"/src/index.js"文件中寻找"variationAsync"函数

    捕捉点击按钮的事件(custom event)
    ```javascript
    await FFCJsClient.trackCustomEventAsync([
        {
        eventName: "开始使用点击事件"
        }
    ]);
    如果需要异步请求的函数，可以在源码"/src/index.js"文件中寻找"trackCustomEvent"函数
    ```

=== "Vue"
    [点击查看GitHub上的开源代码与示例](https://github.com/feature-flags-co/ffc-vue) 
    ```javascript
    
    ```
=== "微信小程序"
    [点击查看GitHub上的开源代码与示例](https://github.com/feature-flags-co/ffc-sdk-wechat-miniprogram) 
    
    Github中的基础文档可以帮助运行示例程序，了解更多的使用细节。下面为注入程序的关键代码和注释。

    在小程序根部的app.js中初始化敏捷开关

    在app.js文件中添加
    ```javascript
    onLaunch() {
        // 初始化FFC连接
        FFC.init(
            // environment key
            "YThmLWRmZjUtNCUyMDIxMDkxNzA3NTYyMV9fMl9fMjJfXzExNl9fZGVmYXVsdF82NTM3Mg=="
        );
    }
    ```
    在用户登录后传递用户信息给敏捷开关SDK
    ```javascript
    // 初始化用户信息，通常这一步会在登录后被调用
    FFC.initFFUserInfo({
        "ffUserName": "sdk-sample-miniprogram",
        "ffUserEmail": "",
        "ffUserKeyId": "sdk-sample-miniprogram", // 项目环境内用户唯一Id
        "ffUserCustomizedProperties": [  // 用户自定义属性
        {
        name: "外放地址",
        value: "?from=zhihu&group=pm"
        }
        ]
    });
    ```
    从敏捷开关服务器获取分配给用户的变量值，并根据业务逻辑执行不同的功能模块
    ```javascript
    FFC.checkVariation(
        '主页---话术版本',
        e => {
        let versions = [false, false, false];
        let variations = ['产品经理版1', '程序员版1', '产品经理版2'];
        versions[variations.indexOf(e.variationValue)] = true;
        this.setData({
            showVersion: versions 
        })
    });
    ```
    如果需要异步请求的函数，可以在源码"/ffcplugin/index.js"文件中寻找"checkVariationAsync"函数
    
    捕捉点击按钮的事件(custom event)
    ```javascript
    FFC.track('开始使用点击事件')
    ```

我们正在丰富Python, Angular的文档，并且在对React进行SDK的实现。



### 分流、分群，数据实验














<!-- 

## 高频/精细的发布功能, 安全/无忧的运营产品

让功能的发布/下线/回退 精细化到每个用户、每一个模块、每一分钟、每一种技术环境、每一个实用场景。

我们将以微信小程序为案例，描述敏捷开关是如何作用于功能模块，让发布功能做的更高频/惊喜，让运营变的更安全/无忧。

## 需求分析

小程序"demo"希望添加一个新的功能，团队希望新功能可以进行快速迭代、试错。希望实现:

- 功能产品可以尽快得到市场反馈，从而快速调整方向
- 尽量把产品新功能的BUG扼杀在摇篮中

## 在Portal中创建并初始化配置开关

- 为了尽快得到市场反馈，团队决定让市场专员使用mock数据的版本去市场展示获得反馈。
- 用灰度发布的模式，先发布1%给早期用户，如果有BUG，我们可以在用户数量上降低影响。

于是我们可以将开关定义如下三个状态:

- `true & real data`, 使用真实数据向匹配用户开放功能
- `true & demo data`, 使用mock数据向匹配用户开放功能
- `false`,  不展示功能

并在一开始将`RD`，`PM`组的用户返回`true & real data`，其他用户返回`false`。

![type:video](./videos/建立开关并初始化配置.mp4)


## 使用开关将我们的功能包裹

完整代码请查看 [gtihub敏捷开关微信小程序插件demo](https://github.com/feature-flags-co/ffc-sdk-wechat-miniprogram/tree/main/demo) 

### 引入"敏捷开关"微信小程序插件进入我们的demo项目

![type:video](./videos/引入微信小程序SDK.mp4)

### 注入敏捷开关代码，包裹功能

![type:video](./videos/使用开关将我们的功能包裹.mp4)

## 发布未完成的功能

为了最快的向市场求证新功能的定位是否准确，我们将使用模拟数据的版本暴露给市场专员，让他们可以拿着小程序去做市场反馈。

此时，我们将模拟数据功能暴露给`BD`组的用户

![type:video](./videos/发布未完成的功能.mp4)


## 发布完成的初版功能给1%的市场用户

我们根据市场专员的反馈进行了及时调整，并尽快出了第一个版本。为了避免新版本的BUG影响用户对品牌的信任，我们决定只将新功能发给1%的市场用户。

![type:video](./videos/发布完成的初版功能给1%的市场用户.mp4)


## 逐步发布功能给剩下的用户

![type:video](./videos/逐步发布功能给剩下的用户.mp4)








## 实现方法
 -->
