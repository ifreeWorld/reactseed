import { ADD_ITEM } from '../actions/demoAction'
const initialState = {
  textList: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        textList: state.textList.concat(action.payload)
      }
    default:
      return state;
  }
}
