import React from 'react'
import { connect } from 'react-redux'
import { Button, DatePicker } from 'antd'
import Service from '../../utils/service'
import SaleManageService from '../../services/saleManageService'
import SaleTable from '../../components/saleTable'
import SaleForm from '../../components/SaleForm'
import styles from './index.css'

const { RangePicker } = DatePicker
class saleManage extends React.Component {
  @Service(SaleManageService) static saleManageService
  constructor() {
    super()
    this.state = {
      confirmLoading: false,
      visible: false
    }
  }
  handleAdd() {
    const form = this.formRef.props.form
    form.resetFields()
    this.setState({
      visible: true
    })
  }
  handleSearch() {
    this.props.dispatch(
      this.saleManageService.getSaleTableInfo({
        filterStartDate: this.props.filter.filterStartDate,
        filterEndDate: this.props.filter.filterEndDate
      })
    )
  }
  handleReset() {
    // this.setState({
    //   filterDate: [],
    //   filterStartDate: '',
    //   filterEndDate: ''
    // })
    this.props.dispatch(
      this.saleManageService.updateSaleTableFilter({
        filterDate: [],
        filterStartDate: '',
        filterEndDate: ''
      })
    )
    this.props.dispatch(this.saleManageService.getSaleTableInfo())
  }
  onChange(dates) {
    const filterStartDate = dates[0] ? dates[0].format('YYYY-MM-DD') : ''
    const filterEndDate = dates[1] ? dates[1].format('YYYY-MM-DD') : ''
    // this.setState({
    //   filterDate: dates,
    //   filterStartDate,
    //   filterEndDate
    // })
    this.props.dispatch(
      this.saleManageService.updateSaleTableFilter({
        filterDate: dates,
        filterStartDate,
        filterEndDate
      })
    )
  }
  onOk() {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      values.date = values.date.format('YYYY-MM-DD')
      values.total =
        values.collector + values.cash + values.wechat + values.alipay
      this.setState({
        confirmLoading: true
      })
      this.props
        .dispatch(this.saleManageService.addSaleTableInfo(values))
        .then(() => {
          this.setState({
            visible: false,
            confirmLoading: false
          })
          form.resetFields()
        })
    })
  }
  onCancel() {
    this.setState({
      visible: false
    })
  }
  saveFormRef(formRef) {
    this.formRef = formRef
  }
  render() {
    return (
      <div className="container">
        <div className={styles.searchRow}>
          <label className={styles.searchLabel}>日期：</label>
          <RangePicker
            value={this.props.filter.filterDate}
            onChange={this.onChange.bind(this)}
          />
          <Button
            onClick={this.handleSearch.bind(this)}
            type="primary"
            style={{ marginLeft: 40 }}
          >
            查询
          </Button>
          <Button
            onClick={this.handleReset.bind(this)}
            style={{ marginLeft: 5 }}
          >
            重置
          </Button>
        </div>
        <Button
          onClick={this.handleAdd.bind(this)}
          type="primary"
          icon="plus"
          style={{ marginBottom: 16 }}
        >
          新建
        </Button>
        <SaleTable />
        <SaleForm
          wrappedComponentRef={this.saveFormRef.bind(this)}
          title="新建"
          editType="new"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.onCancel.bind(this)}
          onOk={this.onOk.bind(this)}
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    filter: state.saleManage.filter || {}
  }
}
export default connect(mapStateToProps)(saleManage)
