import { parse } from 'node:url';
import dayjs from 'dayjs';
import type { Request, Response } from 'express';

// 商品分类
const categories = ['服装', '配饰', '美妆', '家居', '数码', '食品', '运动', '图书'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const colors = ['红色', '蓝色', '绿色', '黑色', '白色', '黄色', '粉色'];

// 分类到图片的映射
const categoryImageMap: Record<string, string> = {
  '服装': '/product_pic/clothes.png',
  '配饰': '/product_pic/jewel配饰.png',
  '美妆': '/product_pic/beauty美妆.png',
  '家居': '/product_pic/furniture.png',
  '数码': '/product_pic/digital.png',
  '食品': '/product_pic/food.png',
  '运动': '/product_pic/sports.png',
  '图书': '/product_pic/book.png',
};

// 分类到商品名称的映射
const categoryProductNames: Record<string, string[]> = {
  '服装': ['T恤', '牛仔裤', '连衣裙', '衬衫', '卫衣', '外套', '短裤', '长裤', '毛衣', '风衣'],
  '配饰': ['项链', '手链', '耳环', '戒指', '手表', '手镯', '胸针', '发夹', '帽子', '围巾'],
  '美妆': ['口红', '粉底液', '眼影', '睫毛膏', '腮红', '眉笔', '卸妆水', '面膜', '精华液', '防晒霜'],
  '家居': ['沙发', '茶几', '餐桌', '椅子', '床', '衣柜', '书桌', '电视柜', '鞋柜', '置物架'],
  '数码': ['手机', '耳机', '平板', '键盘', '鼠标', '充电器', '数据线', '移动电源', '摄像头', '音响'],
  '食品': ['薯片', '鸡爪', '牛肉干', '坚果', '巧克力', '饼干', '果冻', '酸奶', '面包', '方便面'],
  '运动': ['跑鞋', '篮球', '羽毛球拍', '瑜伽垫', '哑铃', '运动服', '护膝', '跳绳', '网球拍', '足球'],
  '图书': ['小说', '教材', '漫画', '杂志', '词典', '历史书', '科幻小说', '散文集', '诗集', '工具书'],
};

// 获取随机商品名称
const getRandomProductName = (category: string): string => {
  const names = categoryProductNames[category] || ['商品'];
  return names[Math.floor(Math.random() * names.length)];
};

// mock 商品数据
const genProductList = (current: number, pageSize: number) => {
  const productListDataSource: API.ProductListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 1000) + 50;
    const stock = Math.floor(Math.random() * 1000) + 10;
    const sales = Math.floor(Math.random() * 500);
    
    const productName = getRandomProductName(category);
    productListDataSource.push({
      key: index,
      id: index + 1,
      name: productName,
      category: category,
      categoryId: Math.floor(Math.random() * categories.length) + 1,
      price: price,
      stock: stock,
      sales: sales,
      status: Math.floor(Math.random() * 2), // 0: 下架, 1: 上架
      images: [
        categoryImageMap[category] || '/product_pic/clothes.png',
      ],
      description: `这是${category}商品的详细描述，包含商品的特点、材质、使用方法等信息。`,
      specs: {
        size: sizes.slice(0, Math.floor(Math.random() * 3) + 2),
        color: colors.slice(0, Math.floor(Math.random() * 3) + 2),
      },
      updatedAt: dayjs().subtract(Math.floor(Math.random() * 30), 'day').format('YYYY-MM-DD HH:mm:ss'),
      createdAt: dayjs().subtract(Math.floor(Math.random() * 60), 'day').format('YYYY-MM-DD HH:mm:ss'),
      owner: '商品管理员',
    });
  }
  productListDataSource.reverse();
  return productListDataSource;
};

let productListDataSource = genProductList(1, 100);

// 保留原有的规则数据用于兼容
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.RuleListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `TradeCode ${index}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 4,
      updatedAt: dayjs().format('YYYY-MM-DD'),
      createdAt: dayjs().format('YYYY-MM-DD'),
      progress: Math.ceil(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.RuleListItem & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      (Object.keys(sorter) as Array<keyof API.RuleListItem>).forEach((key) => {
        const nextSort = next?.[key] as number;
        const preSort = prev?.[key] as number;
        if (sorter[key] === 'descend') {
          if (preSort - nextSort > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (preSort - nextSort > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return (Object.keys(filter) as Array<keyof API.RuleListItem>).some(
          (key) => {
            if (!filter[key]) {
              return true;
            }
            if (filter[key].includes(`${item[key]}`)) {
              return true;
            }
            return false;
          },
        );
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) =>
      data?.name?.includes(params.name || ''),
    );
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }

  const body = b?.body || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    case 'delete':
      tableListDataSource = tableListDataSource.filter(
        (item) => key.indexOf(item.key) === -1,
      );
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule: API.RuleListItem = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: dayjs().format('YYYY-MM-DD'),
          createdAt: dayjs().format('YYYY-MM-DD'),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

// 商品相关 API
function getProduct(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.ProductListItem & {
      sorter: any;
      filter: any;
    };

  // 先筛选，再分页
  let dataSource = [...productListDataSource];
  
  // 按名称筛选
  if (params.name) {
    dataSource = dataSource.filter((data) =>
      data?.name?.includes(params.name || ''),
    );
  }
  
  // 按分类筛选
  if (params.category) {
    dataSource = dataSource.filter((data) =>
      data?.category?.includes(params.category || ''),
    );
  }
  
  // 按状态筛选
  if (params.status !== undefined && params.status !== null && params.status !== '') {
    const statusValue = typeof params.status === 'string' ? parseInt(params.status, 10) : params.status;
    dataSource = dataSource.filter((data) => data?.status === statusValue);
  }
  
  // 处理filter参数（ProTable的筛选）
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return (Object.keys(filter) as Array<keyof API.ProductListItem>).every(
          (key) => {
            if (!filter[key] || filter[key].length === 0) {
              return true;
            }
            // 对于status字段，需要特殊处理（数字类型）
            if (key === 'status') {
              const statusValues = filter[key].map(v => parseInt(v, 10));
              return statusValues.includes(item[key] as number);
            }
            // 对于其他字段，使用字符串匹配
            if (filter[key].includes(`${item[key]}`)) {
              return true;
            }
            return false;
          },
        );
      });
    }
  }
  
  // 排序
  if (params.sorter) {
    // 处理sorter参数，可能是字符串或对象
    let sorter: Record<string, 'ascend' | 'descend'>;
    if (typeof params.sorter === 'string') {
      try {
        sorter = JSON.parse(params.sorter);
      } catch (e) {
        sorter = {};
      }
    } else {
      sorter = params.sorter as Record<string, 'ascend' | 'descend'>;
    }
    
    if (Object.keys(sorter).length > 0) {
      dataSource = dataSource.sort((prev, next) => {
        // 处理每个排序字段
        for (const key of Object.keys(sorter) as Array<keyof API.ProductListItem>) {
          const nextValue = next?.[key];
          const prevValue = prev?.[key];
          
          // 跳过undefined或null值
          if (nextValue === undefined || nextValue === null) return 1;
          if (prevValue === undefined || prevValue === null) return -1;
          
          // 转换为数字进行比较
          const nextNum = typeof nextValue === 'number' ? nextValue : Number(nextValue);
          const prevNum = typeof prevValue === 'number' ? prevValue : Number(prevValue);
          
          // 如果是NaN，跳过
          if (isNaN(nextNum) || isNaN(prevNum)) continue;
          
          let result = 0;
          if (sorter[key] === 'descend') {
            // 降序：大的在前，prev > next 时返回负数
            result = nextNum - prevNum;
          } else {
            // 升序：小的在前，prev < next 时返回负数
            result = prevNum - nextNum;
          }
          
          // 如果结果不为0，立即返回
          if (result !== 0) {
            return result;
          }
        }
        // 所有字段都相等
        return 0;
      });
    }
  }
  
  // 记录总数（在分页之前）
  const total = dataSource.length;
  
  // 分页
  dataSource = dataSource.slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  
  const result = {
    data: dataSource,
    total: total,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postProduct(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }

  const body = b?.body || req.body;
  const { method, name, category, price, stock, status, description, specs, key, id } = body;

  switch (method) {
    case 'delete':
      productListDataSource = productListDataSource.filter(
        (item) => !key.includes(item.key),
      );
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const productCategory = category || categories[0];
        const productName = name || getRandomProductName(productCategory);
        const newProduct: API.ProductListItem = {
          key: productListDataSource.length,
          id: productListDataSource.length + 1,
          name: productName,
          category: productCategory,
          categoryId: Math.floor(Math.random() * categories.length) + 1,
          price: price || Math.floor(Math.random() * 1000) + 50,
          stock: stock || Math.floor(Math.random() * 1000) + 10,
          sales: 0,
          status: status !== undefined ? status : 1,
          images: [
            categoryImageMap[productCategory] || '/product_pic/clothes.png',
          ],
          description: description || '商品描述',
          specs: specs || { size: ['M', 'L'], color: ['黑色', '白色'] },
          updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          owner: '商品管理员',
        };
        productListDataSource.unshift(newProduct);
        return res.json(newProduct);
      })();
      return;

    case 'update':
      (() => {
        let newProduct = {};
        productListDataSource = productListDataSource.map((item) => {
          if (item.key === key || item.id === id) {
            newProduct = { 
              ...item, 
              name, 
              category, 
              price, 
              stock, 
              status, 
              description, 
              specs,
              updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            };
            return newProduct as API.ProductListItem;
          }
          return item;
        });
        return res.json(newProduct);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: productListDataSource,
    pagination: {
      total: productListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
  'GET /api/product': getProduct,
  'POST /api/product': postProduct,
  'PUT /api/product': postProduct,
  'DELETE /api/product': postProduct,
};
