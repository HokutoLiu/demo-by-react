# About this folder
This folder will hold all of your **flux** actions if you are using flux.
You can include actions into your components or stores like this:

这个文件夹将保持所有的* * * *行动，如果你是使用通量。
您可以包括到您的组件或商店这样的行动：

```javascript
let react = require('react/addons');
let MyAction = require('actions/MyAction');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    MyAction.exampleMethod();
  }
}
```
