## 多状态表达API的Integration Test

敏捷开关的稳定性非常重要，我们需要尽可能的确保敏捷开关功能的健壮性。因此我们需要尽可能详细的加入测试用例，并对每个用例做自动化测试。保证每一个版本的发布，都是经过了尽可能详细的测试验证。

多状态表达的Integration Test可以在源代码的如下路径找到:
`~\FeatureFlagsCo.APIs\FeatureFlags.APIs.Tests\Postman` 

可以通过向Postman导入文件"feature-flags.co.postman_collection.json"来查看具体的测试内容。

![](/img/test/postman_inttest_multioption_randomtest.png)

此测试程序将会在DevOps Pipeline中的dev和uat环节自动被调用，以尽量确保我们向生产环境发布一个安全可用的版本。