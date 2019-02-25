export const GET_SALE_TABLE_INFO = 'GET_SALE_TABLE_INFO'
export const UPDATE_SALE_TABLE_FILTER = 'UPDATE_SALE_TABLE_FILTER'

export default class SaleManageAction {
  static getSaleTableInfo(payload) {
    return {
      type: GET_SALE_TABLE_INFO,
      payload
    }
  }
  static updateSaleTableFilter(payload) {
    return {
      type: UPDATE_SALE_TABLE_FILTER,
      payload
    }
  }
}
