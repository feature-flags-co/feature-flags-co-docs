Web API提供开发者自己调用API实现与开关的连接。

## HTTP

    POST /Variation/GetMultiOptionVariation HTTP/1.1
    Host: api.feature-flags.co
    Content-Type: application/json

    {
        "environmentSecret": "{environment key}",
        "featureFlagKeyName": "{开关 keyName}",
        "ffUserName": "{终端用户的username}",
        "ffUserEmail": "{终端用户的email}",
        "ffUserCustomizedProperties": [
            {
                "name":"{自定义属性的名称}", 
                "value":"{自定义属性的值}"
            }
        ],
        "ffUserKeyId": "{终端用户的唯一ID}"
    }