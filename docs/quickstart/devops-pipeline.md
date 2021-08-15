我们目前使用Azure DevOps工具来实现SaaS平台相关功能的自动化发布。其主要步骤为:

dev环境 -> 整合测试 -> approval -> UAT环境 -> 整合测试 -> approval -> Prod环境 -> 开关控制 线上发布功能 1.. N

在各个项目源代码的配置文件中的参数值为空，绝大多数配置参数存在了Azure KeyVault及DevOps的内部管理系统中。这些参数会在pipeline执行的过程中注入到线上环境里。并且在DevOps中，没有足够权限的人是无法访问参数实际值。在最大程度上保证了核心参数的安全性。

整合测试会根据实际测试内容，在pipeline中展示具体结果，如下图所示:

![](/img/quickstart/pipeline-test.png)


相关的Azure DevOps Pipeline的执行配置文件，可以在各个项目中搜索"azure-pipelines.yml"。


未来会慢慢的丰富发布流水线的健壮程度，从而最大化的保证发布安全。更多信息会在未来被持续更新，敬请期待。






