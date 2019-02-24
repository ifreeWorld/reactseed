import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  InputNumber
} from 'antd'

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 12
  }
}

class SaleForm extends React.Component {
  render() {
    return (
      <Form>
        <Form.Item {...formItemLayout} label="日期">
          <InputNumber placeholder="请输入现金金额" min={1} />
        </Form.Item>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps)(SaleForm)
