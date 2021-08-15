
# JavaScript

使用npm安装javascript的前端sdk

> npm i mjkg-js-client-sdk

此sdk适用于javascript, React.js, Vue.js以及Angular.js

### 初始化用户信息
通过初始化如下json格式的变量，建立一个用户信息实例。

    var user = {
        key: 'test2@from.js',
        customizeProperties: [{
            name: 'age',
            value: '60'
        }]
    };

可根据如下表格传入所需的用户信息:

| 变量名 | 描述 | 
| -- | -- | 
| key | 【必填项】用户在开关工作控件中的唯一Id，类型为string |
| email | 【可选项】用户的邮箱，类型为string |
| userName | 【可选项】用户名，类型为string |
| customizeProperties | 【可选项】一个可以有用户自由添加的自定义属性数组，数组中的每个元素由name与value组成。name为属性名，value为该属性对应的值 |

### 建立与工作空间的连接
初始化敏捷开关连接实例 MJKGJsClient
- 第一个参数为workspaceSecret
- 第二个参数为上一步初始化的用户信息

    MJKGJsClient.initialize("{workspace secret}", user);

### 使用variation函数包裹代码

    if(MJKGJsClient.variation("MQ==__开关列表PR提示版") == true){
        // "开关列表PR提示"功能的代码
    }
    else {
        // 现有功能代码
    }

variation函数中的唯一参数为敏捷开关的key。


### 应用在React上的完整示例
使用此文章的方法创建一个[https://create-react-app.dev/docs/getting-started/](https://create-react-app.dev/docs/getting-started/)React应用程序

    npx create-react-app my-app
    cd my-app

使用npm安装敏捷开关的js客户端sdk

> npm i mjkg-js-client-sdk


下面为App.js的完整代码

    import logo from './logo.svg';
    import './App.css';

    import { MJKGJsClient } from "mjkg-js-client-sdk";

    const App = ({ flags }) => {

        var user = {
            key: 'test2@from.js',
            customizeProperties: [{
            name: 'age',
            value: '60'
            }]
        };
        MJKGJsClient.initialize("{workspace secret}", user);
        var showFeature = MJKGJsClient.variation("MQ==__开关列表PR提示版");

        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                { showFeature == 'true' ? "Learn React With New Version" : "Learn React"} 
                </a>
            </header>
            </div>
        );
    };

    export default App;
