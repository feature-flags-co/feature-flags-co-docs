
事件触发(Feature Trigger), 允许外面的服务对某个feature flag进行开启与关闭的调用。常用场景如:

1. 当CI/CD执行完成后，我们希望开启相关的feature flag服务，让新的特性按feature flag中的设置发送给不同的用户、设备
2. 当服务器发出了与某个新特性相关的alert时，迅速触发事件关掉某个feature flag
3. 等等其他情况

## 添加一个trigger链接

在feature flags列表中，找到一个feature flag并点击进入详细页面。在详细页面中，找到"触发器"tab并点击进入"触发器"分页。

![](/img/featureworkflow/trigger1.png)

点击按钮"+添加触发器"

![](/img/featureworkflow/trigger2.png)

在弹出框中，选择希望触发器更新的状态（目前只提供ON和Off），并添加描述。完成后点击按钮"确定"

![](/img/featureworkflow/trigger3.png)

添加成功后，复制触发器对应的链接，保存到一个安全的位置。从新刷新页面后，此链接将变为***模式。

![](/img/featureworkflow/trigger4.png)


## 使用trigger链接

我们的trigger链接是一个可简单通过HTTP GET请求的链接

    curl --location --request GET 'https://api.feature-flags.co/api/FeatureFlagTriggers/trigger/{token}

## 重置一个trigger链接

点击某个触发器中的"重置"按钮，可以重置触发器链接。确认后，触发器当前URL将失效，重置后请立即复制并保存URL。

![](/img/featureworkflow/trigger5.png)

## 关闭与激活trigger

点击触发器下的"关闭"按钮，即可关闭trigger。关闭后，调用触发器时将不会产生任何效果。

![](/img/featureworkflow/trigger6.png)

且关闭后，左侧的图标将变灰。点击"激活"按钮，可重新使触发器可用。

![](/img/featureworkflow/trigger7.png)

## 删除trigger

点击trigger下的"删除"图标按钮，即可删除触发器。删除后，调用触发器时将不会产生任何效果。

![](/img/featureworkflow/trigger8.png)
