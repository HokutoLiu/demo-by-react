# About this folder
This folder will hold all of your **flux** datasources.
You can include them into your components or stores like this:

此文件夹将你所有的* * * *数据流量。
您可以将它们包含到您的组件或商店中，这样：

```javascript
let react = require('react/addons');
let MySource = require('sources/MyAction');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    MySource.getRemoteData();
  }
}
```
