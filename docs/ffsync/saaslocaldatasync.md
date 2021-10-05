

# 本地版搭建

目前我们为本地版的环境搭建提供了docker-compose版，具体的使用方法请见Github地址 

[https://github.com/feature-flags-co/feature-flags-co/tree/main/FeatureFlagsCo.Docker](https://github.com/feature-flags-co/feature-flags-co/tree/main/FeatureFlagsCo.Docker)

# 数据同步

我们使用Docker搭建的本地网络版与云端SaaS版拥有完全相同的技术实现方式及数据存储架构。所以本地版与SaaS版之间的Feature Flags数据同步与
“[feature数据同步](https://docs.feature-flags.co/http://localhost:8000/quickstart/ffsync/envdatasync/)”
的方式完全一致。

> 注：环境的Secret Key并没有被导入，即本地版和SaaS版拥有不同的环境Id及Secret Key

如果有同步管理用、Project信息和Environment信息（如Secret Key)的需求，请联系我们。