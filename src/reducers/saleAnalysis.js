import { GET_SALE_ANALYSIS_CARD, GET_SALE_ANALYSIS_BAR, GET_SALE_ANALYSIS_PIE } from '../actions/saleAnalysisAction'
const initialState = {
  total: 0,
  average: 0,
  barData: [],
  pieData: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SALE_ANALYSIS_CARD:
      return {
        ...state,
        total: action.payload.total,
        average: action.payload.average
      }
    case GET_SALE_ANALYSIS_BAR:
      return {
        ...state,
        barData: action.payload
      }
    case GET_SALE_ANALYSIS_PIE:
      return {
        ...state,
        pieData: action.payload
      }
    default:
      return state;
  }
}
