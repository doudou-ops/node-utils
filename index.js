/**
 * Node.js 实用工具函数库
 * @author 豆豆
 */

/**
 * 日期格式化
 * @param {Date|number|string} date 日期
 * @param {string} format 格式，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
}

/**
 * 获取相对时间
 * @param {Date|number|string} date 日期
 * @returns {string} 相对时间字符串
 */
function getRelativeTime(date) {
  const now = Date.now();
  const timestamp = new Date(date).getTime();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (years > 0) return `${years}年前`;
  if (months > 0) return `${months}个月前`;
  if (days > 0) return `${days}天前`;
  if (hours > 0) return `${hours}小时前`;
  if (minutes > 0) return `${minutes}分钟前`;
  return '刚刚';
}

/**
 * 生成随机字符串
 * @param {number} length 长度
 * @returns {string} 随机字符串
 */
function randomString(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 生成随机数字
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 随机数字
 */
function randomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 防抖函数
 * @param {Function} fn 函数
 * @param {number} delay 延迟毫秒
 * @returns {Function} 防抖后的函数
 */
function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * 节流函数
 * @param {Function} fn 函数
 * @param {number} delay 延迟毫秒
 * @returns {Function} 节流后的函数
 */
function throttle(fn, delay = 300) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 深度克隆
 * @param {*} obj 对象
 * @returns {*} 克隆后的对象
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * 数组去重
 * @param {Array} arr 数组
 * @returns {Array} 去重后的数组
 */
function unique(arr) {
  return [...new Set(arr)];
}

/**
 * 数组扁平化
 * @param {Array} arr 数组
 * @returns {Array} 扁平化后的数组
 */
function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), 
  []);
}

/**
 * 对象转换为 URL 查询字符串
 * @param {Object} obj 对象
 * @returns {string} URL 查询字符串
 */
function toQueryString(obj) {
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

/**
 * 解析 URL 查询字符串
 * @param {string} query URL 查询字符串
 * @returns {Object} 对象
 */
function parseQueryString(query) {
  const params = {};
  const pairs = query.replace(/^\?/, '').split('&');
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  }
  return params;
}

/**
 * 简单的 MD5 加密
 * @param {string} str 字符串
 * @returns {string} MD5 哈希
 */
function md5(str) {
  // 简化版，实际项目中建议使用 crypto 模块
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

/**
 * 验证邮箱
 * @param {string} email 邮箱
 * @returns {boolean} 是否有效
 */
function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 验证手机号（中国）
 * @param {string} phone 手机号
 * @returns {boolean} 是否有效
 */
function isPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}

/**
 * 验证 URL
 * @param {string} url URL
 * @returns {boolean} 是否有效
 */
function isUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 睡眠函数
 * @param {number} ms 毫秒
 * @returns {Promise} Promise
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 获取随机颜色
 * @returns {string} 颜色 hex 值
 */
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * 格式化文件大小
 * @param {number} bytes 字节
 * @returns {string} 格式化后的大小
 */
function formatFileSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * 等待函数
 * @param {Function} condition 条件函数
 * @param {number} timeout 超时毫秒
 * @param {number} interval 检查间隔毫秒
 * @returns {Promise<boolean>} 是否成功
 */
function waitFor(condition, timeout = 30000, interval = 100) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const check = () => {
      if (condition()) {
        resolve(true);
      } else if (Date.now() - startTime >= timeout) {
        reject(new Error('Timeout'));
      } else {
        setTimeout(check, interval);
      }
    };
    check();
  });
}

module.exports = {
  formatDate,
  getRelativeTime,
  randomString,
  randomNumber,
  debounce,
  throttle,
  deepClone,
  unique,
  flatten,
  toQueryString,
  parseQueryString,
  md5,
  isEmail,
  isPhone,
  isUrl,
  sleep,
  randomColor,
  formatFileSize,
  waitFor
};
