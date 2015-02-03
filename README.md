# 动画骨架

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

update: 2015-02-3
