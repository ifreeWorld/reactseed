import React from 'react'
import { connect } from 'react-redux'
import {
  Divider,
  Table
} from 'antd'
import Service from '../../utils/service'
import SaleManageService from '../../services/saleManageService'
import styles from './index.css'

const expectTotal = [2000, 4500]
class SaleTable extends React.Component {
  @Service(SaleManageService) static saleManageService
  constructor() {
    super()
    this.state = {
      columns: [
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          defaultSortOrder: 'descend',
          sorter: (rowA, rowB) => {
            return rowA.date > rowB.date ? 1 : -1
          },
          render: (text, row) => {
            return <a>{text}</a>
          }
        },
        {
          title: '总额(元)',
          dataIndex: 'total',
          key: 'total',
          render: (text, row) => {
            if (text < expectTotal[0]) {
              return <span className={styles.lowTotal}>{text}</span>
            } else if (text >= expectTotal[0] && text < expectTotal[1]) {
              return <span>{text}</span>
            } else if (text >= expectTotal[1]) {
              return <span className={styles.highTotal}>{text}</span>
            }
          },
          sorter: (rowA, rowB) => {
            return rowA.total > rowB.total ? 1 : -1
          }
        },
        {
          title: '收钱吧(元)',
          dataIndex: 'collector',
          key: 'collector'
        },
        {
          title: '现金(元)',
          dataIndex: 'cash',
          key: 'cash'
        },
        {
          title: '微信(元)',
          dataIndex: 'wechat',
          key: 'wechat'
        },
        {
          title: '支付宝(元)',
          dataIndex: 'alipay',
          key: 'alipay'
        },
        {
          title: '操作',
          key: 'operation',
          dataIndex: 'operation',
          render: (text, row) => (
            <span>
              <a onClick={() => this.edit(row)}>编辑</a>
              <Divider type="vertical" />
              <a onClick={() => this.delete(row)}>删除</a>
            </span>
          )
        }
      ]
    }
  }
  componentDidMount() {
    this.props.dispatch(this.saleManageService.getSaleTableInfo({}))
  }
  edit(row) {
  }
  delete(row) {
  }
  render() {
    return (
      <Table
        dataSource={this.props.tableList}
        columns={this.state.columns}
        // bordered
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    tableList: state.saleManage.tableList || []
  }
}
export default connect(mapStateToProps)(SaleTable)
