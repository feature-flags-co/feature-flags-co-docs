

在一个项目内创建多个环境时，往往需要将其他环境内已建好的Feature flags和用户复制到新的环境中，这篇文章主要介绍如何通过下载、上传文件实现。

第一步，切换到需要被复制的环境，点击菜单项"数据同步"。点击"下载"按钮，下载环境中的feature flags及用户数据，直到文件下载完成。

![](/img/quickstart/datasync/downloadfile.png)

第二步，切换到新建的环境（即希望feature flags数据复制到的环境），点击菜单项"数据同步" -> 点击"上传"按钮 -> 在右侧弹出的窗口中，点击按钮"点击选择并上传文件"。

![](/img/quickstart/datasync/uploadfile1.png)

第三步，在弹出的上传文件弹框中，选择第一步下载的文件上传。上传后等待直至成功提示显示，并在"点击选择并上传文件"按钮下方出现文件名称。此时表示文件已上传成功

![](/img/quickstart/datasync/uploadfile2.png)

第四步，切换到"开关管理页面"，验证在新环境中是否已经包含了被复制的Feature Flags数据。

![](/img/quickstart/datasync/verify1.png)

第五步，切换到"开关用户管理"页面，验证在新环境中是否已经包含了被复制的Feature Flags用户数据。

![](/img/quickstart/datasync/verify2.png)

> 注：Flags的访问数据与用户行为数据，目前还不具备复制能力
