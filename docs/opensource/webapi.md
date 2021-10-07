Web API提供开发者自己调用API实现与开关的连接。

## HTTP

    POST /Variation/GetMultiOptionVariation HTTP/1.1
    Host: api.feature-flags.co
    Content-Type: application/json

    {
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
    }

## 返回值

```json
{
    "localId": 1,
    "displayOrder": 1,
    "variationValue": "状态值"
}
```

| 变量          |           描述               |
| :---------------- | :----------------------------------- |
| localId             | 开关内部的返回状态的Id |
| displayOrder        | 开关设置中显示状态的顺序 |
| variationValue       | 状态值 |