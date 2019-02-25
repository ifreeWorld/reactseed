import { GET_SALE_TABLE_INFO, UPDATE_SALE_TABLE_FILTER } from '../actions/saleManageAction'
const initialState = {
  tableList: [],
  filter: {
    filterDate: [],
    filterStartDate: '',
    filterEndDate: ''
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SALE_TABLE_INFO:
      return {
        ...state,
        tableList: action.payload
      }
    case UPDATE_SALE_TABLE_FILTER:
      return {
        ...state,
        filter: {
          filterDate: action.payload.filterDate,
          filterStartDate: action.payload.filterStartDate,
          filterEndDate: action.payload.filterEndDate
        }
      }
    default:
      return state;
  }
}
