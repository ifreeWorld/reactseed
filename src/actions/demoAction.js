export const ADD_ITEM = 'ADD_ITEM'

export default class DemoAction {
  static addItem(payload) {
    return {
      type: ADD_ITEM,
      payload
    }
  }
}
