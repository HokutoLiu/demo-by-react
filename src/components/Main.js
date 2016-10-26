require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

// 获取images数据
var imageDatas = require('../sources/imageData.json');


/**
 * 利用只执行函数，将图片名信息转成图片URL路径信息
 * @param  {[type]} imageDatasArr： images数据数组
 * @return {[type]} imageDatasArr： 含有图片URL路径信息images数据数组
 */
imageDatas = (function getImageURL(imageDatasArr){
	for (var i = 0; i < imageDatasArr.length; i++) {
		var singleImageData = imageDatasArr[i];

		singleImageData.imageURL = require('../images/' + singleImageData.fileName);

		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);

/**
 * 获取区间内的一个随机数
 * @param  {[type]} low 开始范围
 * @param  {[type]} high 结束范围
 * @return {[type]} 随机数
 */
function getRangeRandom(low, high){
  return Math.floor(Math.random() * (high - low) + low);
}

/**
 * 获取 0-30 之间的一个任意正负值
 * @return num  0-30 之间的一个任意正负值
 */
function get30DegRandom() {
  return Math.floor((Math.random() > 0.5 ? '':'-') + Math.floor(Math.random() * 30));
}

// 图片组件
var ImgFigure = React.createClass({
  /**
   * ImgFigure的点击处理函数
   * @param  {Event} e  
   * @return 
   */
  handleClick: function (e) {
    // 判断居中还是翻转
    if(this.props.arrange.isCenter){
      this.props.inverse();
    } else {
      this.props.center();
    }
    
    e.stopPropagation();
    e.preventDefault();
  },

  render: function(){
    var styleObj = {};

    // 如果props属性中指定了这张图片的位置，则使用
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }

    // 如果图片的旋转角度有值且不为0，天假旋转角度
    if(this.props.arrange.rotate){
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function(value) {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }.bind(this));
    }

    let imgFigureClassName = "img-figure";
    // 判断是否需要添加 图片反面样式
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

    if (this.props.arrange.isCenter) {
      styleObj["zIndex"] = 11;
    }

    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imageURL} 
          alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick} >
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure >
    );
  }
});

/**
 * 控制图片组件
 */
var ControllerUnit = React.createClass({
  handleClick: function (e) {
     // 如果点击的是当前选中态的按钮，则翻转图片，否则居中图片
    if(this.props.arrange.isCenter){
      this.props.inverse();
    } else {
      this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  },
  render: function(){
    var controllerUnitClassName = "controller-unit";

    // 如果对应的是居中图片，显示控制按钮的居中态
    if(this.props.arrange.isCenter){
      controllerUnitClassName += " is-center";

      // 如果同时对应的是翻转图片， 显示控制按钮的翻转台
      if (this.props.arrange.isInverse) {
        controllerUnitClassName += " is-inverse";
      }
    }

    return (
      <span className={controllerUnitClassName} onClick={this.handleClick}></span>
    );
  }
});

// 总入口组件
var AppComponent = React.createClass({
  /**
   * 常数
   */
  Constant: {
    centerPos: {
      left: 0,
      right: 0
    },
    hPosRange: {   // 水平方向的取值范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {    // 垂直方向的取值范围
      x: [0, 0],
      topY: [0, 0]
    }
  },

  /**
   * 翻转图片
   * @param  {num} index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
   * @return {Function}       这是一个必报函数，其内return一个真正待被执行的函数
   */
  inverse: function(index){
    return function () {
      var imgsArrangeArr = this.state.imgsArrangeArr;

      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });

    }.bind(this);
  },

  /*
   * 重新布局所有图片
   * @param centerIndex 指定居中排布哪个图片
   * @return 
   */
  rearrange: function(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2), // 取一个或不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

      // 首先居中 centerIndex 的图片,且居中的图片不需要旋转
      imgsArrangeCenterArr[0] = {
        pos: centerPos,
        rotate: 0,
        isCenter: true
      };

      // 去除要布局上侧的图片的状态信息
      topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

      // 布局位于上侧图片
      imgsArrangeTopArr.forEach(function (value, index) {
        imgsArrangeTopArr[index] = {
          pos: {
            top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
            left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
          },
          rotate: get30DegRandom(),
          isCenter: false
        }
      });

      // 布局左右两侧的图片
      for (var i = 0 ,j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
        var hPosRangeLORX = null;

        // 前半部分布局在左边，右半部分布局在右边
        if(i < k){
          hPosRangeLORX = hPosRangeLeftSecX;
        } else {
          hPosRangeLORX = hPosRangeRightSecX;
        }

        // 图片布局信息
        imgsArrangeArr[i] = {
          pos: {
            top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
            left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
          },
          rotate: get30DegRandom(),
          isCenter: false
        }
      }

      // 合并去除的状态
      if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
        imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
      }

      imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

      // 设置组件状态渲染dom界面
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
  },

  /**
   * 利用 rearrange函数，居中对应index的图片
   * @param  {num} index 要居中图片对应index
   * @return {Function} 
   */
  center: function (index) {
    return function () {
      this.rearrange(index);
    }.bind(this);
  },

  /**
   * 设置状态，状态改变就会重新渲染dom
   * @return {[type]}
   */
  getInitialState: function(){
    return {
      imgsArrangeArr:[
       /* {
          pos: { // 定位
            left: 0,
            top: 0
          },
          rotate: 0 ,// 旋转角度
          isInverse: false, // 图片正反面
          isCenter: false // 图片是否居中
        }*/
      ]
    };
  },

  /**
   * react加载组件后， 为每张图片计算器位置的范围
   * @return {[type]}
   */
  componentDidMount: function(){
    // 首先拿到舞台的大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2)
        ;

    // 拿到一个imageFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2)
        ;

    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    // 计算水平方向, 左侧右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW; // 最左侧x 
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3; // 左侧中心区x
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW; // 最右侧x 
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW; // 右侧中心区x
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH; // ?

    // 计算垂直方向： 上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;//?
    this.Constant.vPosRange.x[1] = halfStageW;//?

    var imgsArrangeArr = this.state.imgsArrangeArr;

    // 排布图片
    this.rearrange(getRangeRandom(0,imgsArrangeArr.length));// 初始第一张在中间
  },

  render: function() {

    var controllerUnits = [], // 图片控制器集合
        imgFigures = []; // 图片组件集合

    // 通过bind绑定this，使得forEach函数内的this是指向外部组件，才可以调用状态
    imageDatas.forEach(function(value ,index){
      // 判断是否绑定了imgsArrangeArr状态
      if(!this.state.imgsArrangeArr[index]){
        // 初始化imgsArrangeArr状态
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false 
        }
      }

      imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index}
          arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
          center={this.center(index)} />);

      controllerUnits.push(<ControllerUnit key={index} 
          arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
          center={this.center(index)} 
          />);

    }.bind(this));
    
    // 返回要渲染的界面内容
    return (
      <section className="stage" ref="stage">
        <section className="image-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
});

AppComponent.defaultProps = {
};

export default AppComponent;
