export const GET_SALE_ANALYSIS_CARD = 'GET_SALE_ANALYSIS_CARD'
export const GET_SALE_ANALYSIS_BAR = 'GET_SALE_ANALYSIS_BAR'
export const GET_SALE_ANALYSIS_PIE = 'GET_SALE_ANALYSIS_PIE'

export default class SaleAnalysisAction {
  static getSaleAnalysisCard(payload) {
    return {
      type: GET_SALE_ANALYSIS_CARD,
      payload
    }
  }
  static getSaleAnalysisBar(payload) {
    return {
      type: GET_SALE_ANALYSIS_BAR,
      payload
    }
  }
  static getSaleAnalysisPie(payload) {
    return {
      type: GET_SALE_ANALYSIS_PIE,
      payload
    }
  }
}
