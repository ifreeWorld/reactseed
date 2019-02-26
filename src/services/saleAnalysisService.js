import SaleAnalysisAction from '../actions/saleAnalysisAction'

export default class SaleManageService {
  getSaleAnalysisCard() {
    return async (dispatch, getState, { request }) => {
      const res = await request.get('/getSaleAnalysisCard')
      if (res.error === 0) {
        return dispatch(SaleAnalysisAction.getSaleAnalysisCard(res.data))
      }
    }
  }
  getSaleAnalysisBar(params) {
    return async (dispatch, getState, { request }) => {
      const res = await request.get('/getSaleAnalysisBar', params)
      if (res.error === 0) {
        return dispatch(SaleAnalysisAction.getSaleAnalysisBar(res.data))
      }
    }
  }
  getSaleAnalysisPie(params) {
    return async (dispatch, getState, { request }) => {
      const res = await request.get('/getSaleAnalysisPie', params)
      if (res.error === 0) {
        return dispatch(SaleAnalysisAction.getSaleAnalysisPie(res.data))
      }
    }
  }
}
