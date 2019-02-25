const routes = [
  {
    name: '销售页',
    link: '/sale',
    icon: 'icon-sale',
    children: [
      {
        name: '销售分析',
        link: '/sale/analysis'
      },
      {
        name: '销售管理',
        link: '/sale/manage'
      }
    ]
  },
  {
    name: '采购页',
    link: '/shop',
    icon: 'icon-shop',
    children: [
      {
        name: '采购分析',
        link: '/shop/analysis'
      },
      {
        name: '采购管理',
        link: '/shop/manage'
      }
    ]
  },
  {
    name: 'demo页',
    link: '/demo',
    icon: 'team',
    children: [
      {
        name: 'demo页-1',
        link: '/demo/1'
      },
      {
        name: 'demo页-2',
        link: '/demo/2'
      },
      {
        name: 'demo页-3',
        link: '/demo/3'
      }
    ]
  }
]
export default routes;
