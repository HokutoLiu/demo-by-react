# About this folder
This folder holds configuration files for different environments.
You can use it to provide your app with different settings based on the 
current environment, e.g. to configure different API base urls depending on 
whether your setup runs in dev mode or is built for distribution.
You can include the configuration into your code like this:

此文件夹保存不同环境的配置文件。
您可以使用它来为您的应用程序提供不同的设置
当前的环境，例如要根据不同的配置来配置不同的
无论你的安装程序运行在开发模式、建立分布。
您可以将配置包括到您的代码中：

```javascript
let react = require('react/addons');
let config = require('config');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    let currentAppEnv = config.appEnv;
  }
}
```
