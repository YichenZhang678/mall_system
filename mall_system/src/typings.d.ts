declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module 'mockjs';
declare module 'react-fittext';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

// API 类型定义
declare namespace API {
  /** 当前用户类型 */
  export type CurrentUser = {
    name: string;
    avatar: string;
    userid: string;
    email: string;
    signature: string;
    title: string;
    group: string;
    tags: {
      key: string;
      label: string;
    }[];
    notifyCount: number;
    unreadCount: number;
    country: string;
    geographic: {
      province: {
        label: string;
        key: string;
      };
      city: {
        label: string;
        key: string;
      };
    };
    address: string;
    phone: string;
    access?: string;
  };

  /** 登录参数 */
  export type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  /** 登录结果 */
  export type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  /** 分页参数 */
  export type PageParams = {
    current?: number;
    pageSize?: number;
  };

  /** 规则列表项 */
  export type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: string;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  /** 规则列表 */
  export type RuleList = {
    data?: RuleListItem[];
    total?: number;
    success?: boolean;
    pageSize?: number;
    current?: number;
  };
}
