import SaleManageAction from '../actions/saleManageAction'

export default class SaleManageService {
  getSaleTableInfo(params) {
    return async (dispatch, getState, { request }) => {
      const res = await request.get('/getSaleTableInfo', params)
      if (res.error === 0) {
        return dispatch(SaleManageAction.getSaleTableInfo(res.data))
      }
    }
  }
  addSaleTableInfo(params) {
    return async (dispatch, getState, { request }) => {
      await request.post('/addSaleTableInfo', params)
      const state = getState()
      const { filterStartDate = '', filterEndDate = '' } = state.saleManage.filter
      const res = await request.get('/getSaleTableInfo', {
        filterStartDate,
        filterEndDate
      })
      if (res.error === 0) {
        return dispatch(SaleManageAction.getSaleTableInfo(res.data))
      }
    }
  }
  updateSaleTableInfo(params) {
    return async (dispatch, getState, { request }) => {
      await request.post('/updateSaleTableInfo', params)
      const state = getState()
      const { filterStartDate = '', filterEndDate = '' } = state.saleManage.filter
      const res = await request.get('/getSaleTableInfo', {
        filterStartDate,
        filterEndDate
      })
      if (res.error === 0) {
        return dispatch(SaleManageAction.getSaleTableInfo(res.data))
      }
    }
  }
  deleteSaleTableInfo(params) {
    return async (dispatch, getState, { request }) => {
      await request.post('/deleteSaleTableInfo', params)
      const state = getState()
      const { filterStartDate = '', filterEndDate = '' } = state.saleManage.filter
      const res = await request.get('/getSaleTableInfo', {
        filterStartDate,
        filterEndDate
      })
      if (res.error === 0) {
        return dispatch(SaleManageAction.getSaleTableInfo(res.data))
      }
    }
  }
  updateSaleTableFilter(params) {
    return dispatch => {
      return dispatch(SaleManageAction.updateSaleTableFilter(params))
    }
  }
}
