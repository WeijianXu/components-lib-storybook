// import Vue from 'vue';
import { Route } from 'vue-router';

declare namespace tpl {
  export interface MenuItem {
    [index: string]: unknown;
    text?: string | ((params: { $route: Route; menu: MenuItem; type: 'menu' | 'bread' }) => string); // 文本描述
    name: string; // 名称，唯一
    icon?: number | string; // 图标，sz-design 提供的图标
    customIcon?: string; // 自定义图标类型，该值为自定义图标样式名，与 icon 属性不能同时设置
    to?: string | Route; // 跳转路径
    // 定制面包屑、侧边栏的路径，可以加上参数，避免点击后无参数
    renderPath?: (params: {
      $route: Route;
      menu: MenuItem;
      type: 'menu' | 'bread';
    }) => string | Route;
    children?: MenuItem[]; // 是否含有子菜单
    width?: string; // 宽度设置
    show?: boolean; // 是否显示菜单项
    hideChildren?: boolean; // 是否隐藏子菜单
    moduleCode?: string; // 菜单权限码
    roleCole?: string; // 角色码，非必须
    // 查询参数，存储于本地sessionStorage
    search?: { [index: string]: any; key: string; value: any }[];
  }
}
