---
sidebar_position: 4
---


# Python SDK

:::tip

当前文档的版本Release版本（1.0.0）[点击查看GitHub的Release地址](https://github.com/feature-flags-co/ffc-server-python-sdk/releases/tag/ffc-server-python-sdk-v1.0.0)。
:::


## 概述

Python Server SDK 基于feature flag 管理平台 [featureflag.co](https://featureflag.co/)，主要用于python多用户环境下的应用程序

SDK 主要完成以下工作:

- 存储可用的feature flag，为给定的目标用户计算feature flag的值
- 为A/B/n测试和数据分析向[featureflag.co](https://featureflag.co/)发送必要的数据

##  数据同步

SDK 使用 WebSocket 来保持与服务端的数据同步，从服务端获取的数据均会存入内存。无论何时当任意 feature flag 发生变化时，变更会被接近实时地推送到 SDK，经过测试，同步过程平均耗时少于 **100 ms**。当网络发生中断时 SDK 会尝试以渐增的时间间隔与服务器重新建立连接，及时恢复数据同步。

## 离线模式

SDK支持离线模式。在离线模式下，SDK不会与 [featureflag.co](https://featureflag.co/)交换任何数据, 这个模式目前只用于内部测试

开启离线模式:
```python
config = Config(env_secret, offline=True)
```

## feature flag 的计算

所有数据都同步到本地内存，所有计算过程也都在本地，并且是实时同步数据。计算过程时间通常小于 **10 ms**。

## 安装SDK
使用pip安装SDK，当前版本兼容Python3.6-3.9。
```
pip install ffc-server-python-sdk
```

## SDK
SDK是线程安全的。使用SDK时，在应用程序生命周期内应当只创建一个实例。如果需要计算不同环境下的feature flag，可以创建不同的实例，但是每个实例应当在整个生命周期中予以保留，不要为每个请求或是线程创建实例。



### 初始化 SDK
SDK的初始化时通过调用`ffcclient.FFCClient`对象的构造函数完成。在此过程中， SDK会和[featureflag.co](https://featureflag.co/)同步数据。

如果数据同步成功或是连接超时（默认15秒），构造函数都会返回。当连接超时后，日志会提示SDK初始化没有完成，如果此时计算feature flag的值，会返回您设置的默认值。SDK会继续尝试连接处非遇到严重的网络问题，或是您主动关闭SDK(调用`stop()`函数)。您可以通过`initialize()`函数确定SDK是否成功初始化。

我们推荐使用singleton模式初始化SDK，首先通过`ffcclient.set_config()`设置好配置，然后每次使用`ffcclient.get()获得共享的SDK实例，SDK会在第一次调用的该函数时完成初始化。
```python
from ffcclient.config import Config
from ffcclient import get, set_config 

set_config(Config(env_secret))
client = get()

if client.initialize:
    # your code

```
您也可以直接调用`ffcclient.client.FFCClient`的构造函数初始化SDK。
```python
from ffcclient.config import Config
from ffcclient.client import FFCClient

client = FFCClient(Config(env_secret), start_wait=15)

if client.initialize:
    # your code

```
如果您不希望等待初始化完成后再获取SDK实例，您可以通过使用`ffcclient.client.FFCClient.update_status_provider` 对象获取SDK的状态，该对象提供了异步的SDK初始化。

``` python
from ffcclient.config import Config
from ffcclient.client import FFCClient

client = FFCClient(Config(env_secret), start_wait=0)
if client._update_status_provider.wait_for_OKState():
    # your code

```


### 获取 feature flag 的值
SDK在本地计算给地目标用户的feature flag，然后返回一个数值或是一个描述feature flag返回值详情的对象

`User`: 目标用户，一组可以用于feature flag评估的属性，通常是您程序中的用户信息。
这个对象包含4个内置属性(`key`, `name`, `email` 和 `country`)。 其中`key`和`name`属性是必须的，`key`用于标识目标用户，`name`属性方便查找目标用户。

其他的内置属性都是可选的，您还可以K/V的方式自定义属性。

```python
if client.initialize:
    user = {'key': user_key, 'name': user_name, 'age': age}
    flag_value = client.variation(flag_key, user)
    # your if/else code according to flag value

```
如果在SDK初始化前对feature flag取值或是设置了错误的flag key或是目标用户，SDK会返回您设置的默认值。`ffcclient.common_types.FlagState`对象封装了上一次计算的细节，比如错误的原因等等。

可以使用`ffcclient.client.FFCClient.get_all_latest_flag_variations`函数获取特定环境下所有可用feature flag的值，SDK返回 `ffcclient.common_types.AllFlagStates`对象，它包含了所有feature flag计算过程中的细节信息。
```python
if client.initialize:
    user = {'key': user_key, 'name': user_name}
    all_flag_values = client.get_all_latest_flag_variations(user)
    ed = all_flag_values.get(flag_key)
    flag_value = ed.variation
    # your if/else code according to flag value

    
```

### A/B/n测试
只需要在我们的平台上创建并开始A/B/n测试就可以实时获得结果。

A/B/n测试支持pageviews和clicks事件的自动捕捉。如果需要捕捉自定义事件，SDK提供了`track_metric`函数。
```python
client.track_metric(user, event_name, numeric_value)
```
**numeric_value**参数为可选项，默认值为 **1**.

确保`track_metric`在对应的feature flag计算完以后再调用，否者该事件不会被实验统计。