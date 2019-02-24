import SaleManageAction from '../actions/saleManageAction'

export default class SaleManageService {
  getSaleTableInfo(params) {
    return async (dispatch, getState, { request }) => {
      const res = await request.get('/getSaleTableInfo', { params })
      return dispatch(SaleManageAction.getSaleTableInfo(res.data))
    }
  }
}
