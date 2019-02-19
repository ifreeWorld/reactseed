import React from 'react'

class Demo extends React.Component {
  render() {
    const url = this.props.match.url
    const id = this.props.match.params.id
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 600 }}>
        <div>{url}</div>
        <div>{id}</div>
      </div>
    )
  }
}
export default Demo
