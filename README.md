# 动画骨架
动画基础库支持根据时间或步数来控制动画进度 - (js 不可避免丢帧问题), 回调函数简单, 仅返回进度百分比, 开发者可根据百分比做任意动画.

## 使用代码
demo 元素在 500ms 内, 向右移动 260px 距离.

```javascript
var duration = 500; // 500ms
var delta = 260;
var dom = document.getElementById('demo');
FX(duration, function(percentage) {
  dom.style.transform = 'translateX(' + delta * percentage + 'px)';
});
```

## API

* var fx = FX(duration, handler[, byStep]);
* fx.play();
* fx.pause( boolean );
* fx.resume();

## 其它
可使用 generateBezier.js 生成需要使用的缓动函数(二次贝塞尔曲线); 两个控制点可以在 http://cubic-bezier.com/ 生成!


注: generateBezier.js 来自 velocity.js
update: 2015-02-3
