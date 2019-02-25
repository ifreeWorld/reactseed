import React from 'react'
import { connect } from 'react-redux'
import { ChartCard, yuan, Field } from 'ant-design-pro/lib/Charts'
import { Row, Col, Icon, Tooltip } from 'antd'
import numeral from 'numeral'
import 'antd/es/card/style/index.css'

class SaleAnalysis extends React.Component {
  render() {
    return (
      <div className="">
        <Row>
          <Col span={6}>
            <ChartCard
              title="销售额"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => (
                <span dangerouslySetInnerHTML={{ __html: yuan(126560) }} />
              )}
              footer={
                <Field
                  label="日均销售额"
                  value={numeral(12423).format('0,0')}
                />
              }
              contentHeight={46}
            >
            </ChartCard>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps)(SaleAnalysis)
