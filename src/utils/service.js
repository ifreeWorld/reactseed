const Service = ServiceName => {
  return (target, name) => {
    // Object.defineProperty(target, name, {
    //   value: new ServiceName()
    // })
    target.prototype[name] = new ServiceName()
  }
}
export default Service
