import { GET_SALE_TABLE_INFO } from '../actions/saleManageAction'
const initialState = {
  tableList: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SALE_TABLE_INFO:
      return {
        tableList: action.payload
      }
    default:
      return state;
  }
}
