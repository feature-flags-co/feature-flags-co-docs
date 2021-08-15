
# NodeJs 

SDK还在开发中，敬请期待。如下为通过Web APIs使用Feature Flags的代码示例

## Axios

    var axios = require('axios');
    var data = JSON.stringify({"WorkspaceSecret":"YWFiM2I5YzUtZmY1MS00ZWMyLTkzZjAtNDc0YzY4MWMyYzUz","FeatureFlagKeyName":"MQ==/NA==/first-test","FFUserName":"hu-beau@outlook.com","FFUserEmail":"hu-beau@outlook.com","FFUserCustomizedPropertiesInJson":"[{\"sex\":\"Male\"}]","FFUserKeyId":"hu-beau@outlook.com"});

    var config = {
    method: 'post',
    url: 'https://sdkwebapi-dev.feature-flags.co/Variation/GetUserVariationResult',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });

