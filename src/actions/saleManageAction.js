export const GET_SALE_TABLE_INFO = 'GET_SALE_TABLE_INFO'

export default class SaleManageAction {
  static getSaleTableInfo(payload) {
    return {
      type: GET_SALE_TABLE_INFO,
      payload
    }
  }
}
