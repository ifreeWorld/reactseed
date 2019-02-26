import React from 'react'
import PropTypes from 'prop-types'
import { Form, DatePicker, InputNumber, Modal } from 'antd'
import moment from 'moment'

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
    const {
      visible,
      confirmLoading,
      onCancel,
      onOk,
      form,
      title = '',
      rowData = {},
      editType = 'new'
    } = this.props
    const {
      date = '',
      collector = '',
      cash = '',
      wechat = '',
      alipay = '',
      key = 0
    } = rowData
    const { getFieldDecorator } = form
    return (
      <Modal
        title={title}
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form>
          <Form.Item {...formItemLayout} label="日期" hasFeedback>
            {getFieldDecorator('date', {
              rules: [{ required: true, message: '请选择日期' }],
              initialValue: date ? moment(date, 'YYYY-MM-DD') : ''
            })(<DatePicker disabled={editType === 'edit'} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="收钱吧" hasFeedback>
            {getFieldDecorator('collector', {
              rules: [{ required: true, message: '请输入金额' }],
              initialValue: collector
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="现金" hasFeedback>
            {getFieldDecorator('cash', {
              rules: [{ required: true, message: '请输入金额' }],
              initialValue: cash
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="微信" hasFeedback>
            {getFieldDecorator('wechat', {
              rules: [{ required: true, message: '请输入金额' }],
              initialValue: wechat
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="支付宝" hasFeedback>
            {getFieldDecorator('alipay', {
              rules: [{ required: true, message: '请输入金额' }],
              initialValue: alipay
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="key" hasFeedback style={{ display: 'none' }}>
            {getFieldDecorator('key', {
              rules: [{ required: true, message: '请输入key' }],
              initialValue: key
            })(<InputNumber min={0} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
SaleForm.propTypes = {
  visible: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  form: PropTypes.object,
  title: PropTypes.string,
  rowData: PropTypes.object,
  editType: PropTypes.string
}

export default Form.create({ name: 'saleForm' })(SaleForm)
