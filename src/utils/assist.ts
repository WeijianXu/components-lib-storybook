import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

/**
 * 获取组件名称
 * 1. 当组件编译后，存在 name 被改掉的情况，使用 _componentTag；
 *
 * @param node 组件节点
 * @returns 组件名称
 */
export function getComponentName(node?: Vue): string | undefined {
  if (!node) {
    return;
  }
  const { name, _componentTag } = node.$options as any;
  if (name === _componentTag) {
    return name;
  }
  if (_componentTag) {
    return _componentTag;
  }
  return name;
}
let cached: number;
export function getScrollBarSize(fresh?: boolean) {
  if (isServer) return 0;
  if (fresh || cached === undefined) {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle: { [key: string]: any } = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached;
}
/**
 * 向上查找组件，找到第一个匹配的组件
 *
 * @param rootNode 当前组件实例
 * @param componentName 需要查找的组件
 * @returns 查找到的组件实例
 */
export function findComponentUpward(rootNode: Vue, componentName: string | string[]): Vue | null {
  let parentNode = rootNode.$parent;
  let name = getComponentName(parentNode);
  while (parentNode && (!name || componentName !== name)) {
    parentNode = parentNode.$parent;
    if (parentNode) {
      name = getComponentName(parentNode);
    }
  }
  return parentNode;
}

/**
 * 检测数据类型
 * @param obj
 * @returns 数据类型
 */
function typeOf(obj: any): string {
  const toString = Object.prototype.toString;
  const map: { [index: string]: string } = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
}

export function firstUpperCase(str: string): string {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}

/**
 * 向下查找子组件，找到第一个匹配的，深度优先遍历
 *
 * @param rootNode 当前组件实例
 * @param componentName 需要查找的组件
 * @returns 查找到的组件实例，未查到返回 null
 */
export function findComponentDownward(rootNode: Vue, componentName: string): Vue | null {
  const children = rootNode.$children;

  let childNode = null;
  if (children && children.length) {
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      const name = getComponentName(child);
      if (name === componentName) {
        childNode = child;
      } else {
        // 递归查询
        childNode = findComponentDownward(child, componentName);
        if (childNode) break;
      }
    }
  }
  return childNode;
}

/**
 * 向上查找组件，找到所有匹配的组件
 *
 * @param rootNode 当前组件实例
 * @param componentName 需要查找的组件
 * @returns 查找到的组件实例
 */
export function findComponentsUpward(rootNode: Vue, componentName: string | string[]): Vue[] {
  const parents = [];
  const parent = rootNode.$parent;
  if (parent) {
    if (getComponentName(parent) === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  }
  return [];
}

/**
 * 向下查找子组件，找到所有匹配的，深度优先遍历
 *
 * @param rootNode 当前组件实例
 * @param componentName 需要查找的组件
 * @returns 查找到的组件实例，未查到返回 null
 */
export function findComponentsDownward(rootNode: Vue, componentName: string): Vue[] {
  return rootNode.$children.reduce((components: Vue[], child: Vue) => {
    if (getComponentName(child) === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}

/* istanbul ignore next */
const trim = function (string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

/* istanbul ignore next */
export function hasClass(el: Element, cls: string): boolean {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/**
 * 添加样式类
 *
 * @param el HTML元素
 * @param cls 样式类名
 */
export function addClass(el: Element, cls: string): void {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/**
 * 删除指定样式类
 *
 * @param el HTML元素
 * @param cls 样式类名
 */
export function removeClass(el: Element, cls: string): void {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

// eslint-disable-next-line no-useless-escape
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name: string) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1');
}

/**
 * 获取计算后的具体样式值
 *
 * @param element 元素
 * @param styleName 样式名
 * @returns 该样式值
 */
export function getStyle(element: any, styleName: any): string | null {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    const computed = document.defaultView?.getComputedStyle(element, '');
    return element.style[styleName] || (computed ? computed[styleName] : null);
  } catch (e) {
    return element.style[styleName];
  }
}

export const dimensionMap = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};

export default {
  findComponentUpward,
  findComponentDownward,
  findComponentsUpward,
  findComponentsDownward,

  hasClass,
  addClass,
  removeClass,

  getStyle,
  oneOf,
};

// 判断参数是否是其中之一
export function oneOf(value: any, validList: Array<string>) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

// deepCopy
export function deepCopy(data: any): any {
  const t = typeOf(data);
  let o: any;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

// scrollTop animation
export function scrollTop(
  el: Window | Element,
  from = 0,
  to: number,
  duration = 500,
  // eslint-disable-next-line @typescript-eslint/ban-types
  endCallback?: Function,
): void {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      (window as any).webkitRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  function scroll(start: number, end: number, step: number): void {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else if ('scrollTop' in el) {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}
