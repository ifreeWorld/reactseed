export const ADD_ITEM = 'ADD_ITEM'

export default class DemoAction {
  static addItem(payload) {
    return {
      type: ADD_ITEM,
      payload
    }
    // return (dispatch) => {
    //   return fetchSecretSauce().then(
    //     sauce => dispatch(makeASandwich(forPerson, sauce)),
    //     error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    //   );
    // };
  }
}
