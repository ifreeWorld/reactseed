const routes = [
  {
    name: '菜单一',
    link: '/link1',
    icon: 'pie-chart'
  },
  {
    name: '菜单二',
    link: '/link2',
    icon: 'desktop'
  },
  {
    name: '菜单三',
    link: '/link3',
    icon: 'user'
  },
  {
    name: '菜单四',
    link: '/link4',
    icon: 'team',
    children: [
      {
        name: '菜单四-1',
        link: '/link4/1'
      },
      {
        name: '菜单四-2',
        link: '/link4/2'
      },
      {
        name: '菜单四-3',
        link: '/link4/3'
      }
    ]
  },
  {
    name: '菜单五',
    link: '/link5',
    icon: 'file'
  }
]
export default routes;
