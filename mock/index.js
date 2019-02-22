import Mock from 'mockjs'
import qs from 'qs'

Mock.setup({
  timeout: '0-100'
})

Mock.mock(/\/test/, (option) => {
  const params = qs.parse(option.url.split('?')[1], { ignoreQueryPrefix: true })
  return {
    error: 0,
    msg: '',
    data: {
      result: `mock_${params.inputText || ''}_${Mock.mock('@now')}`
    }
  }
})
