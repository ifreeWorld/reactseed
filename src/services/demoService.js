import DemoAction from '../actions/demoAction'

export default class DemoService {
  test(inputText) {
    return async (dispatch, getState, { request }) => {
      /* eslint-disable */
      console.log(getState().demo.textList)
      const res = await request.get('/test', { params: { inputText } })
      return dispatch(DemoAction.addItem(res.data.result))
    }
  }
}
