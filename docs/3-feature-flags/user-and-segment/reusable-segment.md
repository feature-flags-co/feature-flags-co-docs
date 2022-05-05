---
sidebar_position: 2
---

import Image from '@site/src/components/Image';

# 可复用的用户分组

## 概览

用户组帮助我们对用户进行分组，在配置开关匹配规则时我们可以将用户组作为条件之一。比如对于 开关 A，我们可以配置其规则为针对 test-group 用户，开关 A 的返回值应该为 v2。该文档解释了如何构建和管理用户组。

## 创建用户组

点击菜单栏的用户组，点击列表页上方的 + 新建 按钮，即可呼出新建用户组弹窗。在弹窗中我们需要指定用户组名称（名称不可重复）及用户组描述（可选）。

<Image maxWidth="750px" width="100%" src="/img/docs/user-segment/create-segment.png" />

## 自定义用户组

在用户组列表页点击任一用户组即可进入用户组详情页，详情页包含两个页签：

- 在《目标条件》页签，我们可以配置该用户组的目标用户。
- 在《设置》页签，我们可以更改该用户组的名称及描述，还可执行删除用户组操作。

### 目标条件

在《目标条件》页签，我们可以像配置feature flags分流条件一样进行配置：

#### 为返回值指定用户

在对应的返回值位置，在右侧的输入框内输入用户的`username`查找或新加用户：
- 当用户已存在时，会在输入时自动提示对应的用户，选中即可。
- 当用户不存在时，输入后点击回车即可。此时输入后的信息会默认为新用户的`userKeyId`

<Image maxWidth="750px" width="100%" src="/img/docs/user-segment/individual-user.png" />



对于新输入的用户，我们可以点击用户后修改其`username`和`email`信息

<Image maxWidth="568px" width="100%" src="/img/docs/user-segment/update-user-info.png" />


#### 设置自定义规则

在页面下方的《使用匹配条件找到目标用户》部分，点击按钮"+ 添加规则"，创建用户组的自定义规则。

如下图所示，我们添加了用户组自定义规则，即这个用户组包括了在列表中的企业Id的所有用户。

<Image maxWidth="568px" width="100%" src="/img/docs/user-segment/customized-rule.png" />



#### 保存设置

:::tip

自定义用户组后，切记点击《保存设置》按钮使其生效

:::

<Image maxWidth="568px" width="100%" src="/img/docs/user-segment/save-rule.png" />


### 设置

在《设置》页签，我们可以更改该用户组的名称及描述，还可执行删除用户组操作。

<Image maxWidth="750px" width="100%" src="/img/docs/user-segment/setting.png" />


## 在 feature flag 详情页面使用用户组

找到一个feature flag并进入其详情页面的《目标条件》，在《使用匹配条件找到目标用户》部分创建一个自定义规则。

在规则中找到《User is in segment》属性，然后将刚刚建立的用户组添加到右侧的segment列表中，如下图所示，我们定义了一个规则：当用户属于Premium客户组时，他使用的是新版功能。

<Image maxWidth="750px" width="100%" src="/img/docs/user-segment/use-segment.png" />

## 查看用户组引用

在用户组详情页我们可以看到该用户组正在被哪些feature flags所引用，并且可以通过点击某一引用跳转至feature flags详情页。

<Image maxWidth="750px" width="100%" src="/img/docs/user-segment/ff-reference.png" />



## 删除用户组


在删除用户组前，我们必须先移除此用户组的所有引用。

<Image maxWidth="750px" width="100%" src="/img/docs/user-segment/delete.png" />
