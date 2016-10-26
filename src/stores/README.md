# About this folder
This folder will hold all of your **flux** stores.
You can include them into your components like this:

这个文件夹将保存所有的* * * *商店。
你可以将它们包含到你的组件中，这样：

```javascript
let react = require('react/addons');
let MyStore = require('stores/MyStore');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    MyStore.doSomething();
  }
}
```
