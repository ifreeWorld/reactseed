import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ChartCard, yuan, Field, Bar, Pie } from 'ant-design-pro/lib/Charts'
import { Row, Col, Icon, Tooltip, Tabs, Card, DatePicker, Select } from 'antd'
import numeral from 'numeral'
import Service from '../../utils/service'
import SaleAnalysisService from '../../services/saleAnalysisService'
import moment from 'moment'
import styles from './index.css'

const TabPane = Tabs.TabPane
const RangePicker = DatePicker.RangePicker
const Option = Select.Option
class SaleAnalysis extends React.Component {
  @Service(SaleAnalysisService) static saleAnalysisService
  constructor() {
    super()
    let nowYear = new Date().getFullYear()
    this.state = {
      nowYear,
      selectYear: nowYear,
      rangeMode: ['month', 'month'],
      rangeValue: [
        moment(`${nowYear}-01`, 'YYYY-MM'),
        moment(`${nowYear}-12`, 'YYYY-MM')
      ]
    }
  }
  componentDidMount() {
    this.props.dispatch(this.saleAnalysisService.getSaleAnalysisCard())
    this.props.dispatch(
      this.saleAnalysisService.getSaleAnalysisBar({
        startMonth: this.state.rangeValue[0]
          ? this.state.rangeValue[0].format('YYYY-MM')
          : `${this.state.nowYear}-01`,
        endMonth: this.state.rangeValue[1]
          ? this.state.rangeValue[1].format('YYYY-MM')
          : `${this.state.nowYear}-12`
      })
    )
    this.props.dispatch(
      this.saleAnalysisService.getSaleAnalysisPie({
        selectYear: this.state.selectYear
      })
    )
  }
  handlePanelChange(rangeValue, rangeMode) {
    this.setState({
      rangeValue,
      rangeMode: [
        rangeMode[0] === 'date' ? 'month' : rangeMode[0],
        rangeMode[1] === 'date' ? 'month' : rangeMode[1]
      ]
    })
    this.props.dispatch(
      this.saleAnalysisService.getSaleAnalysisBar({
        startMonth: rangeValue[0]
          ? rangeValue[0].format('YYYY-MM')
          : `${this.state.nowYear}-01`,
        endMonth: rangeValue[1]
          ? rangeValue[1].format('YYYY-MM')
          : `${this.state.nowYear}-12`
      })
    )
  }
  handleYearChange(value) {
    this.setState({
      selectYear: value
    })
    this.props.dispatch(
      this.saleAnalysisService.getSaleAnalysisPie({
        selectYear: value
      })
    )
  }
  formatPieData(pieData) {
    const data = pieData || {}
    const { collector = 0, cash = 0, wechat = 0, alipay = 0 } = data
    const formatData = []
    formatData.push(
      {
        x: '收钱吧',
        y: collector
      },
      {
        x: '现金',
        y: cash
      },
      {
        x: '微信',
        y: wechat
      },
      {
        x: '支付宝',
        y: alipay
      }
    )
    return formatData
  }
  formatYearArray(nowYear) {
    const yearArray = []
    for (let i = 2018; i <= nowYear; i++) {
      yearArray.push(i)
    }
    return yearArray
  }
  render() {
    const { pieData = {} } = this.props
    const formatData = this.formatPieData(pieData)
    const yearArray = this.formatYearArray(this.state.nowYear)
    return (
      <div className="">
        <Row style={{ marginBottom: 20 }}>
          <Col span={6}>
            <ChartCard
              title="销售额"
              action={
                <Tooltip title="累计总销售额">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => (
                <span
                  dangerouslySetInnerHTML={{ __html: yuan(this.props.total) }}
                />
              )}
              footer={
                <Field
                  label="日均销售额"
                  value={numeral(this.props.average).format('0,0')}
                />
              }
              contentHeight={46}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col span={24}>
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
              <div className={styles.tabs}>
                <Tabs defaultActiveKey="1" size="large">
                  <TabPane tab="销售额" key="1">
                    <div className={styles.bar}>
                      <Bar
                        height={300}
                        title="销售额趋势"
                        data={this.props.barData}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="采购额" key="2">
                    Content of Tab Pane 2
                  </TabPane>
                </Tabs>
                <div className={styles.rightMonth}>
                  <RangePicker
                    format="YYYY-MM"
                    mode={this.state.rangeMode}
                    value={this.state.rangeValue}
                    onPanelChange={this.handlePanelChange.bind(this)}
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Card
              bordered={false}
              bodyStyle={{ padding: 24 }}
              title="销售额类别占比"
            >
              <div className={styles.yearCard}>
                <div className={styles.yearSelector}>
                  <Select
                    defaultValue={this.state.nowYear}
                    style={{ width: 120 }}
                    onChange={this.handleYearChange.bind(this)}
                  >
                    {yearArray.map((year, index) => (
                      <Option key={index} value={year}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                </div>
                <h4 className={styles.pieTitle}>
                  <span>{`${pieData.year || ''}销售额`}</span>
                </h4>
                <Pie
                  hasLegend
                  subTitle="销售额"
                  晒太阳了
                  total={() => (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: yuan(
                          formatData.reduce((pre, now) => now.y + pre, 0)
                        )
                      }}
                    />
                  )}
                  data={formatData}
                  valueFormat={val => (
                    <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />
                  )}
                  height={294}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

SaleAnalysis.propTypes = {
  total: PropTypes.number,
  average: PropTypes.number,
  barData: PropTypes.array,
  pieData: PropTypes.object
}

const mapStateToProps = state => {
  return {
    total: state.saleAnalysis.total,
    average: state.saleAnalysis.average,
    barData: state.saleAnalysis.barData,
    pieData: state.saleAnalysis.pieData
  }
}
export default connect(mapStateToProps)(SaleAnalysis)
