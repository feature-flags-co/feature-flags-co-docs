## 数据

```json
{
  // 数据源的 key (必填 类型是 **string**)
  "key": "",

  // 数据源的 value (必填 类型是 **float**)
  "value": 0.0,

  // 表达对该数据的维度描述 (可选 用于**报表数据过滤**)
  "dimensions": [{ "key": "维度名称", "value": "维度" }]
}
```

---

<span style="color: darkgreen; font-size: small;">示例(仅供参考，客户需自定义自己的数据维度以及粒度)</span>

上海亚朵酒店的新注册了一个 VIP 用户

```json
{
  "key": "hotel_vip",
  "value": 1,
  "dimensions": [
    { "key": "酒店", "value": "亚朵" }
    { "key": "地点", "value": "上海" }
  ]
}
```

北京希尔顿酒店的有一笔 425.5 元的订单

```json
{
  "key": "hotel_order_revenue",
  "value": 425.5,
  "dimensions": [
    { "key": "酒店", "value": "希尔顿" }
    { "key": "地点", "value": "北京" }
  ]
}
```

## 数据推送

通过公共接口进行数据推送。

### 接口域名

https://api.feature-flags.co

### 必要参数

- envSecret: 环境密钥 (必须放在 header 上)

### 示例

```json
REQUEST
-------
POST {接口域名}/api/public/analytics/track
envSecret: {环境密钥}
Content-Type: application/json

{
  "key": "hotel_new_order",
  "value": 3,
  "dimensions": [
    { "key": "名称", "value": "景咖民宿" },
    { "key": "地点", "value": "三亚" },
  ]
}

RESPONSE
--------
<Response body is empty>

Response code: 200 (OK); Content length: 0 bytes
```

若有需要，客户端应使用 HttpStatusCode 来判断是否调用成功，[2xx](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success) 表示成功，其他表示失败

## 数据源

1. 代表了**以数据的 `key` 来区分特定的一类数据**，比如**新订单数(new_order)**、**新加入会员(new_vip)**、**订单收入(order_revenue)**等
2. 【**待完成 目前需要用户手动添加**】每当我们这边接收到新的数据源定义(即客户端通过数据推送接口推送了 **新的数据 key**), 我们会自动新增一个数据源，该数据源名称与数据源 key 一致 类型默认为数值
3. 在数据源管理面板 我们可以对现有的数据源执行 **查看，创建，更新、删除** 操作 (PS: 对于正在被使用的数据源 是不能删除的)

**FAQ**

1. 数据源名称与数据源 key 的区别？

   `答: 数据源名称是用户自定义的，用于在界面上进行展示; 数据源 key 是由程序员自定义的，用于数据推送接口使用`

## 分析维度

1. 包含了所有的数据维度，用于分析结果的**数据过滤**
2. 每当我们这边接收到新的数据维度定义(即客户端通过数据推送接口推送了(**新的数据维度**)，我们会自动新增一个分析维度
3. 在分析维度管理面板 我们可以对现有的分析维度执行 **查看，创建，更新、删除** 操作 (PS: 对于正在被使用的分析维度 是不能删除的)

## 分析结果

1. 拥有一个分析结果的名称
2. 对应一个数据源
3. 定义了**计量单位、计数方式(目前支持 <span style="color: #4CB287">计数、求和、求均值</span>)、文字颜色**

## 报表

1. 拥有一个报表名称
2. 拥有一个时间范围(必须有开始时间，结束时间可选)
3. 可定义一个或多个分析结果
4. 可选择一个或多个分析维度。目前仅支持**同一维度下只能选择一个维度值**，且多个维度之间是**与**的关系，即同时满足。例如：
<ul style="margin-left: 24px">
  <li><strong>地点维度下</strong>选择了北京之后就无法选择广州了</li>
  <li><strong>酒店维度下</strong>选择了希尔顿之后就不能选择亚朵了</li>
  <li>地点维度选择<strong>北京</strong>，酒店维度选择<strong></strong>**希尔顿**，则看到的是<strong>北京希尔顿酒店</strong>的相关数据</li>
</ul>

关于多个维度之间关系的更具体定义在后续的版本中才会实现，所以目前暂无法实现像下列需求:
<ul style="margin-left: 24px">
  <li>分析<strong>北京除希尔顿酒店</strong>以外的数据</li>
  <li>分析<strong>北京和上海</strong>希尔顿酒店的数据</li>
</ul>