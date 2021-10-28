


敏捷开关是一个开源的feature flags + AB测试解决方案。他允许团队中任意指定人员将产品的功能在任意时间实时的发布给任意用户（活用户群），同理也可以将发布出去的功能进行细粒度的秒级回退。使产研过程中的权利向产品经理前倾，追求超级低代码、无埋点、无门槛的对照数据实验(AB测试)工具。

<!-- 本文中介绍了两种使用产品的方案

1. `对照数据实验（AB测试）`，此方案提供了无埋点、无门槛的AB测试解决方案。即在不麻烦工程师和数据分析师的情况下，对不同的特性做AB测试，并直接获得有统计标注的结果。
2. `Feature flags + AB测试`，此方案为工程师团队提供了全面的低代码feature flags解决方案，并描述了如何使用feature flags来帮助团队更顺畅的做AB测试。 -->


<!-- ## 对照数据实验(AB测试)

详情请查看章节[对照数据实验(AB测试)](/codeless/index) -->

## Feature flags + AB测试
** Feature flags + AB测试**将介绍如何从0到1的创建、使用敏捷开关，并基于开关做数据实验：

- [第1步, 创建一个功能开关](/quickstart/create-flag/)
- [第2步, 创建自定义属性](/quickstart/add-attribute/)
- [第3步, 集成开关到产品中（SDK、Web API）](/quickstart/sdk-integration/)
- [第4步, Feature管理、发布、回退](/quickstart/release-rollback/)
- [第5步, 数据收集(无埋点&自定义)](/quickstart/send-event/)
- [第6步, 数据实验（ab测试）](/quickstart/abtest/)


### Feature flags团队协作管理

敏捷开关为feature flags团队协作管理提供了诸如合并请求、事件触发、操作日志等功能。

详情请查看章节[Feature团队协作流](/featureworkflow/)

### Feature flags的好处

Feature flags从多个维度保障了产品的高速迭代（或者称为迭代心跳率）:

- 高频发布、加速创新，用开关区分功能，减少合并冲突，更完美的实现"基于主干分支（Trunk-Based Dev）"的高速开发模式。
- 消除风险和压力，通过事先在生产中测试代码来减少事故。当bug出现时，秒级回退功能至原有状态（旧版本或彻底隐藏）。
- 缩短市场验证和试错的周期，在产品发布前最大化的获取关键市场反馈，更早的把赚钱的功能发布给客户，少开发无用功。
- 让数据驱动产品迭代，对新feature做针对性的数据收集与AB实验，实时灵活调整实验策略，加速新功能的市场验证。
- 改善业务协作，赋予相关工作人员直接控制产品功能的权力，可更高效的获得真实的数据反馈，减少开发人员的负担。
- 让工程师快乐和高效，提高开发人员的生产力、创造力和舒适度，让开发人员可以更安静的度过每个夜晚和假期。
- 等等


<!-- ### 无代码秒级下线新功能

![type:video](/quickstart/codeless/img/秒级下线.mp4) -->

## 适用人群

敏捷开关不仅帮助研发团队研发出高质量的产品功能，也可以更好的帮助产品经理对产品的迭代运筹帷幄。市场、运营、甚至销售都可以通过控制产品功能、做数据实验，来获得更好的工作效果。

<!-- 

## 实用案例

![type:video](./videos/quickstart1080_4700.mp4)

## 案例分享

### 案例1 - 敏捷开关早期目标人群定位

敏捷开关这款产品尤其适用于**在有限的时间内，在无/低技术人员参与下，**实现最高效的迭代，对企业决策者、产品经理、产品运营、以及开发者都会有极大的帮助，尤其是对于中小企业整体快速迭代与市场增长起着至关重要的促进作用。

在产品推广中我们通常先要找到最能理解产品价值的那一部分人。所以我们决定对不同的群体发放官网的不同话术版本。通过测量访问者点击“使用产品”按钮和“查看文档”按钮的转化率（我们称之为兴趣转化率），来快速的锁定早期主要推广的目标群体。

我们准备了2个话术版本:

- A版 : 以产品经理、运营为导向的热迭代话术版本
- B版 : 以技术、运维为导向的热迭代话术版本

我们通过敏捷开关做如下用户分流:

1. 通过官网地址访问网站的人，80%分流给A版，20%分流给B版。我们主动推给了很多部门负责人和C字头的企业高管和老板
2. 通过非技术博主文章访问的人，100%分流给A版
3. 通过csdn技术博主文章访问的人，100%分流给B版

两个版本分流给不同的群体后，使用敏捷开关中的“数据实验”功能，高频率的查看兴趣转化率。一天后，我们观察到A版的转化率更高。考虑到实验人群分布的问题，我们在第二天快速调整了分流（70%A版，30%B版，让更多的人去访问B版），以最快的速度验证实验人群分布与兴趣转化率的关系。

我们通过反复的迭代（分流分群、验证、调整、重新分流分群、再验证），做出了初步决策和总结，推出了A2版(即A版的第2次话术迭代版)作为更大范围推广的官网版本。最后我们对A版的两个版本也进行了分流，50%仍然访问A1，50%访问新版本A2。

一篇推文的时效性很强，必须在有限的时间内实现最高效的迭代才有可能取得成果，整个过程是比较紧张的。但上述过程通过敏捷开关只需要点击几下按钮进行简单的设置，一点点的代码嵌入就可以完成，**无需技术团队介入, 无需重新部署**就可以实现市场测试策略的快速调整。


### 案例2 - 助力数据科学家快速测试、迭代模型

在推荐、搜索等应用场景中，模型的重要性不言而喻。数据科学家们通过对数据、算法、特征及参数的调优, 来优化模型的预测效果以达到对产品各种核心指标的提升。但是在模型的端到端训练和上线的过程中, 数据科学家们往往要面对相似的痛点:

- 线下模型评估结果不等于上线效果。模型线下的评估，例如AUC等模型指标，能够很客观的反映出新老模型对于训练数据集的预测能力。但是受限于数据本身的条件约束，例如数据陈旧或者数据采集过程中存在的偏见等，会难以预测模型上线后真实的效果。这会使得很多线下指标优秀的模型在上线后并没有带来相应的产品核心指标的拉升。
- 难以量化模型上线影响力。量化新模型对于产品价值的提升通常是无法只依赖于线下指标的结果。但是在快速迭代开发的产品中，产品核心指标的变化来自于产品各个方向的努力且有一定的延迟性。新模型上线很有可能掺杂其他产品模块的更新和优化进而很难评估新模型对于核心指标的影响力。

应对这些问题，线上环境的A/B测试是现行业中标准的解决方案来对新老模型进行上线前的评估测试。敏捷开关天然自带的A/B测试功能，通过亲切友好的UI界面极大的简化了部署、用户分流、紧急回退等A/B测试的核心功能。并通过数据反馈，近实时的提供测试集和对照集的产品核心指标数据。帮助数据科学家更好的了解模型在线上真实的表现和对产品的影响。

敏捷开关的核心优势：

- 自定义开关来应对多种模型的同步a/b测试。
- 实时调节开关的用户流量，及时关闭有问题的测试组。
- 数据收集并提供核心指标，例如访问流量、点击率等可自定义的近实时数据，帮助用户分析不同模型的线上真实反馈。
- 提供多维度a/b测试栈。将UI、模型、功能等分散在不同的测试栈中，相互之间可以并行不同栈之间的测试，大幅度提高用户流量的利用率，加快产品的迭代速度。

 -->

<!-- 
## 案例实现

### 注册用户，创建项目与环境

如果还没有建立账户的读者，可以先[注册新用户](https://portal.feature-flags.co/login/register) 。对于用户注册、账户管理的具体细节，可参考教程[多租户与项目管理](https://docs.feature-flags.co/account-setting/)。

### 功能开关的创建与使用

登入“开关管理”页面后首先我们要创建一个开关，这个开关如上文所示用来分流不同的用户群体以便让不同的用户群体看到不同版本的官网。
点击“添加开关”按钮，然后在对话框入中输入开关的名称，点击“确定”即可。
![](/img/quickstart/add-new-bouton.png){.img-fluid}

在刚创建的开关中进入“设置“页面我们开始设置分流，在“返回状态管理”下设置返回值对应不同的官网版本（A版以产品经理、运营为导向的热迭代话术版本，B版以技术、运维为导向的热迭代话术版本），然后点击“提交”，返回值会通过SDK返回给用户。

![](/img/quickstart/add-return-value.png){.img-fluid}

接下来我们设置“开关用户”属性来区别不同的用户群体。进入"开关用户管理页面"，点击“属性管理”按钮添加一个新属性。属性会通过SDK交互，在这个案例里我们添加的属性可以传递官网url中的参数，这样我们就可以定位不同的用户群体。

![](/img/quickstart/add-new-attri.png){.img-fluid}

最后在我们刚创建的开关中的“目标条件”页面设置三组相应的规则。首先添加两组定向的分流规则分别对应A版群体产品经理、运营以及B版群体技术、运维，然后再添加默认规则对应从官网地址直接访问的用户，最后点击“保存设置”完成开关设置。

![](/img/quickstart/add-new-rules.png){.img-fluid}

<!--功能开关的创建、使用、用户分流:
![type:video](./videos/开关的建立与分流分组.mp4)
-->
<!-- ### 低代码包裹不同版本

创建好开关后，需要研发团队将这些开关植入到产品代码中。让开关函数包裹代码，使用户可以通过后台控制功能特性的分流、分群和完成数据实验。

=== "Javascript"
    [点击查看GitHub上的开源代码与示例](https://github.com/feature-flags-co/ffc-js-client-sdk) 

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
    如果需要异步请求的函数，可以在源码"/src/index.js"文件中寻找"variationAsync"函数

    捕捉点击按钮的事件(custom event)
    ```javascript
    await FFCJsClient.trackCustomEventAsync([
        {
        eventName: "开始使用点击事件"
        }
    ]);
    ```
    如果需要同步请求的函数，可以在源码"/src/index.js"文件中寻找"trackCustomEvent"函数

=== "Vue"
    [点击查看GitHub上的开源代码与示例](https://github.com/feature-flags-co/ffc-vue) 

    Github中的基础文档可以帮助运行示例程序，了解更多的使用细节。下面为注入程序的关键代码和注释。

    初始化敏捷开关
    ```javascript
    // 初始化sdk，传入环境Secret Key和用户信息
    FFCPlugin.initialize({ environmentSecret: 'YThmLWRmZjUtNCUyMDIxMDkxNzA3NTYyMV9fMl9fMjJfXzExNl9fZGVmYXVsdF82NTM3Mg==' })
    ```

    在用户登录后传递用户信息给敏捷开关SDK
    ```javascript
    // 初始化用户信息，通常这一步会在登录后被调用
    FFCPlugin.initUserInfo({
    userName: 'sdk-sample-js-1252',
    email: 'ts',
    key: 'sdk-sample-js-1252',
    customizeProperties: [
        {
        name: "外放地址",
        value: "?from=zhihu&group=pm"
        }
    ]
    })
    ``` 

    从敏捷开关服务器获取分配给用户的变量值，并根据业务逻辑执行不同的功能模块
    ```javascript
    async variation()
    {
    const result = await this.$FfcPlugins.variationAsync(
        "主页---话术版本",
        "产品经理版1"
    );
    this.version = result.variationValue;
    }
    ```

    捕捉点击按钮的事件(custom event)
    ```javascript
    async trackCustomEvent(){
    const data = [
        {
        eventName: "开始使用点击事件",
        },
    ];
    const result = await this.$FfcPlugins.trackCustomEventAsync(data);
    if (result) {
        alert("事件发送成功");
    } else {
        alert("事件发送失败");
    }
    }
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

分流、分群、数据实验的整体流程，可以参考本页开头的视频。 -->











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


