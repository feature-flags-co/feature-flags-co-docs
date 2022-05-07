---
sidebar_position: 4
---


# Python SDK

:::tip

因为首发在Github，所以初版为英文。中文版正在翻译中，敬请稍后。

:::

## Release Version (latest)


Release version: [ffc-server-python-sdk-v1.0.0](https://github.com/feature-flags-co/ffc-server-python-sdk/releases/tag/ffc-server-python-sdk-v1.0.0)

PYPI link：https://pypi.org/project/ffc-server-python-sdk/
PYPI version: 1.0.0

Break changes
No break changes

New features
default remote server at https://api.featureflag.co/
data sync with streaming
data storage in memory
feature flag evaluation
support segment rules
event insight
bootstrapping in sync and async mode
Updates
No updates

## Introduction

This is the Python Server SDK for the feature management platform [featureflag.co](https://featureflag.co/). It is
intended for use in a multiple-users python server applications.

This SDK has two main purposes:

- Store the available feature flags and evaluate the feature flags by given user in the server side SDK
- Sends feature flags usage, and custom events for the insights and A/B/n testing.

## Data synchonization

We use websocket to make the local data synchronized with the server, and then store them in the memory by default.
Whenever there is any changes to a feature flag or his related data, the changes would be pushed to the SDK, the average
synchronization time is less than **100** ms. Be aware the websocket connection can be interrupted by any error or
internet interruption, but it would be restored automatically right after the problem is gone.

## Offline mode support

In the offline mode, SDK DOES not exchange any data with [featureflag.co](https://featureflag.co/), this mode is only use for internal test for instance.

To open the offline mode:
```python
config = Config(env_secret, offline=True)
```

## Evaluation of a feature flag

SDK will initialize all the related data(feature flags, segments etc.) in the bootstrapping and receive the data updates
in real time, as mentioned in the above

After initialization, the SDK has all the feature flags in the memory and all evaluation is done locally and synchronously, the average evaluation time is < **10** ms.

## Installation
install the sdk in using pip, this version of the SDK is compatible with Python 3.6 through 3.9.

```
pip install ffc-server-python-sdk
```

## SDK

Applications SHOULD instantiate a single instance for the lifetime of the application. In the case where an application
needs to evaluate feature flags from different environments, you may create multiple clients, but they should still be
retained for the lifetime of the application rather than created per request or per thread.

### Bootstrapping

The bootstrapping is in fact the call of constructor of `FFCClient`, in which the SDK will be initialized, using
streaming from [featureflag.co](https://featureflag.co/).

The constructor will return when it successfully connects, or when the timeout(default: 15 seconds) expires, whichever comes first. If it has not succeeded in connecting when the timeout elapses, you will receive the client in an uninitialized state where feature flags will return default values; it will still continue trying to connect in the background unless there has been a network error or you close the client(using `stop()`). You can detect whether initialization has succeeded by calling `initialize()`.

The best way to use the SDK as a singleton, first make sure you have called `ffcclient.set_config()` at startup time. Then `ffcclient.get()` will return the same shared `ffcclient.client.FFCClient` instance each time. The client will be initialized if it runs first time.
```python
from ffcclient.config import Config
from ffcclient import get, set_config 

set_config(Config(env_secret))
client = get()

if client.initialize:
    # your code

```
You can also manage your `ffcclient.client.FFCClient`, the SDK will be initialized if you call `ffcclient.client.FFCClient` constructor.
```python
from ffcclient.config import Config
from ffcclient.client import FFCClient

client = FFCClient(Config(env_secret), start_wait=15)

if client.initialize:
    # your code

```
If you prefer to have the constructor return immediately, and then wait for initialization to finish at some other
point, you can use `ffcclient.client.FFCClient.update_status_provider` object, which provides an asynchronous way, as follows:

``` python
from ffcclient.config import Config
from ffcclient.client import FFCClient

client = FFCClient(Config(env_secret), start_wait=0)
if client._update_status_provider.wait_for_OKState():
    # your code

```


### Evaluation

SDK calculates the value of a feature flag for a given user, and returns a flag vlaue/an object that describes the way 
that the value was determined.

`User`: A dictionary of attributes that can affect flag evaluation, usually corresponding to a user of your application.
This object contains built-in properties(`key`, `name`, `email` and `country`). The only mandatory property is the key,
which must uniquely identify each user; this could be a username or email address for authenticated users, or a ID for anonymous users.

All other built-in properties are optional, it's strongly recommended to set **name** in order to search your user quickly
You may also define custom properties with arbitrary names and values.

```python
if client.initialize:
    user = {'key': user_key, 'name': user_name}
    flag_value = client.variation(flag_key, user)
    # your if/else code according to flag value

```
If evaluation called before SDK client initialized or you set the wrong flag key or user for the evaluation, SDK will return 
the default value you set. The `FlagState` will explain the details of the last evaluation including error raison.

SDK support the String, Boolean, and Number as the return type of flag values, see pydoc for more details.

### Experiments (A/B/n Testing)
We support automatic experiments for pageviews and clicks, you just need to set your experiment on our SaaS platform, then you should be able to see the result in near real time after the experiment is started.

In case you need more control over the experiment data sent to our server, we offer a method to send custom event.
```python
client.track_metric(user, event_name, numeric_value);
```
**numeric_value** is not mandatory, the default value is **1**.

Make sure `track_metric` is called after the related feature flag is evaluated by simply calling `variation` or `variation_detail`
otherwise, the custom event won't be included into the experiment result.