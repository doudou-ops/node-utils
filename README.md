# node-utils 🛠️

>实用的 Node.js 工具函数库

## 安装

```bash
npm install node-utils
```

## 使用

```javascript
const utils = require('node-utils');

// 日期格式化
utils.formatDate(new Date()); // '2026-03-29 22:30:00'

// 随机字符串
utils.randomString(16); // 'aB3kF9xP2mN5qR8t'

// 防抖
const debouncedFn = utils.debounce(fn, 300);

// 验证邮箱
utils.isEmail('test@example.com'); // true

// 睡眠
await utils.sleep(1000);
```

## API

### 日期相关

- `formatDate(date, format)` - 日期格式化
- `getRelativeTime(date)` - 获取相对时间
- `formatFileSize(bytes)` - 格式化文件大小

### 字符串相关

- `randomString(length)` - 生成随机字符串
- `md5(str)` - MD5 加密
- `isEmail(email)` - 验证邮箱
- `isPhone(phone)` - 验证手机号（中国）
- `isUrl(url)` - 验证 URL

### 数组相关

- `unique(arr)` - 数组去重
- `flatten(arr)` - 数组扁平化

### 对象相关

- `deepClone(obj)` - 深度克隆
- `toQueryString(obj)` - 对象转 URL 查询字符串
- `parseQueryString(query)` - 解析 URL 查询字符串

### 函数相关

- `debounce(fn, delay)` - 防抖
- `throttle(fn, delay)` - 节流
- `waitFor(condition, timeout, interval)` - 等待条件

### 其他

- `randomNumber(min, max)` - 生成随机数字
- `randomColor()` - 获取随机颜色
- `sleep(ms)` - 睡眠

## License

MIT
