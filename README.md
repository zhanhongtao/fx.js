# 动画

```javascript
var delta = 260;
var dom = document.getElementById('demo');
FX(200, function(x) {
  dom.style.marginLeft = delta * x + 'px';
});
```

## 文档

1. var fx = FX(duration, handle, step);
2. fx.parse();
3. fx.resume();

## 其它

