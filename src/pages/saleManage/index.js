import React from 'react'
import { Button, Modal } from 'antd'
import SaleTable from '../../components/saleTable'

class saleManage extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  handleAdd() {
    this.setState({
      visible: true
    })
  }
  render() {
    return (
      <div className="container">
        <Button
          onClick={this.handleAdd}
          type="primary"
          icon="plus"
          style={{ marginBottom: 16 }}
        >
          新建
        </Button>
        <SaleTable />
      </div>
    )
  }
}

export default saleManage
