
# HTTP

    POST /Variation/GetUserVariationResult HTTP/1.1
    Host: sdkwebapi-dev.feature-flags.co
    Content-Type: application/json

    {
        "WorkspaceSecret": "YWFiM2I5YzUtZmY1MS00ZWMyLTkzZjAtNDc0YzY4MWMyYzUz",
        "FeatureFlagKeyName": "MQ==/NA==/first-test",
        "FFUserName": "hu-beau@outlook.com",
        "FFUserEmail": "hu-beau@outlook.com",
        "FFUserCustomizedPropertiesInJson": "[{\"sex\":\"Male\"}]",
        "FFUserKeyId": "hu-beau@outlook.com"
    }
