---
sidebar_position: 3
---

import Image from '@site/src/components/Image';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

| 阅读和实践需要约10分钟

快速入门中，我们将快速的实现一个python程序新特性的发布与回滚(功能的开与关)。

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

## 在Python应用中集成并使用 feature flag

:::tip

该快速入门教程所用SDK的版本为1.0.0[点击查看GitHub的Release地址](https://github.com/feature-flags-co/ffc-server-python-sdk/releases/tag/ffc-server-python-sdk-v1.0.0)。

[关于完整的 SDK 介绍与使用，可以点击查看教程《Python SDK》](/docs/sdks/sdks/python)。

本教程用两个简单的python function模拟如何使用feature flag发布与回滚新特性

```python
def new_function():
    print('Hello, new function')

def old_function():
    print('Oh, this is old function')
```

:::



## 安装SDK
使用pip安装SDK。
```
pip install ffc-server-python-sdk
```

## 引入 SDK

```python
from ffcclient.config import Config
from ffcclient import get, set_config
client = get()
```

## 配置并获得SDK client实例

```python
config = Config(env_secret)
set_config(config)


```

其中，`env_secret` 可以在《组织机构》页面的《项目》标签下找到，如下图所示：

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/secret.png" />

## 获取 feature flag 的值

首先创建一个目标用户
```python
user = {'key': user_key, 'name': user_name}
```

目标用户是一组可以用于feature flag评估的属性，通常是您程序中的用户信息。
这个对象包含4个内置属性(`key`, `name`, `email` 和 `country`)。 其中`key`和`name`属性是必须的，`key`用于标识目标用户，`name`属性方便查找目标用户

其他的内置属性都是可选的，您还可以K/V的方式自定义属性。比如定义如下目标用户，`age`为自定义属性。
```python
user = {'key': user_key, 'name': user_name, 'age': user_age}
```

接下来根据目标用户获得feature flag的值，`flag_key`是您刚才输入的feature flag对应的 keyName，通过`initialize`属性可以判断SDK是否成功初始化，`variation`函数用于计算feature flag的值。
```python
if client.initialize:
    flag_value = client.variation(flag_key, user)
    if flag_value == 'true':
        new_function()
    else: 
        old_function()


```
计算feature flag后的返回值默认情况下string类型，由于输入的feature flag两个返回值是 `true` 和 `false`，可以使用`is_enabled`简化代码
```python
if client.initialize and client.is_enabled(flag_key, user):
    new_function()
else: 
    old_function()
```

## 发布/回滚(开/关) feature

将上述代码提交到主分支发布以后，由于创建feature flag 的默认返回值为 false，运行程序会显示 `old_function`的输出结果 Oh, this is old function（模拟旧版功能）。

回到敏捷开关 Portal 的后台界面，进入自己创建的 feature flag 详情页面的 《目标条件》Tab，在《默认返回值》中将返回值设置为 `true` 后，点击按钮《保存设置》。

<Image maxWidth="660px" width="100%" src="/img/docs/quick-start/wechat/update-to-true.png" />

重新运行上述程序，会显示`new_function`的输出结果Hello, new function（模拟新版功能）。我们成功的控制了功能模块的发布！

当`new_function`由于某些原因无法正常运行的时候，我们可以将《默认返回值》改回`false`或是直接关闭开关，这样程序就回滚到原来的版本！

在python server side环境中，新feature发布/回滚并不需要重新部署应用，feature flag可以极大的提升开发的效率，节约成本！ 