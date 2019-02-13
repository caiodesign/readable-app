import React, { Component } from 'react'
import PropTypes from 'prop-types'


class OrderForm extends Component {
  state = {
    orderBy: {
      rateDesc: true,
      dateDesc: true,
      authorDesc: true,
    },
  }

  rateOnClickHandler = () => {
    const { updateOrder } = this.props
    const { orderBy } = this.state

    this.setState((prevState) => {
      const newState = prevState
      newState.orderBy.rateDesc = !prevState.orderBy.rateDesc

      return newState
    })

    updateOrder({ by: 'rate', desc: orderBy.rateDesc })
  }


  dateOnClickHandler = () => {
    const { updateOrder, orderBy } = this.props
    this.setState((prevState) => {
      const newState = prevState
      newState.orderBy.dateDesc = !prevState.orderBy.dateDesc

      return newState
    })

    updateOrder({ by: 'date', desc: orderBy.dateDesc })
  }


  authorOnClickHandler = () => {
    const { updateOrder, orderBy } = this.props
    this.setState((prevState) => {
      const newState = prevState
      newState.orderBy.authorDesc = !prevState.orderBy.authorDesc

      return newState
    })

    updateOrder({ by: 'author', desc: orderBy.authorDesc })
  }

  render() {
    const { orderBy } = this.state

    return (
      <div className="row">
        <div className="col-md-4">
          <button
            type="button"
            className="btn btn btn-dark btn-sm"
            title="Order by rate"
            onClick={this.rateOnClickHandler}
          >
            Rate
            {orderBy.rateDesc ? (
              <i className="material-icons">keyboard_arrow_up</i>
            ) : (
              <i className="material-icons">keyboard_arrow_down</i>
            )}
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            className="btn btn btn-dark btn-sm"
            title="Order by date"
            onClick={this.dateOnClickHandler}
          >
            Date
            {orderBy.dateDesc ? (
              <i className="material-icons">keyboard_arrow_up</i>
            ) : (
              <i className="material-icons">keyboard_arrow_down</i>
            )}
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            className="btn btn btn-dark btn-sm"
            title="Order by author"
            onClick={this.authorOnClickHandler}
          >
            Author
            {orderBy.authorDesc ? (
              <i className="material-icons">keyboard_arrow_up</i>
            ) : (
              <i className="material-icons">keyboard_arrow_down</i>
            )}
          </button>
        </div>
      </div>
    )
  }
}

OrderForm.propTypes = {
  updateOrder: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
}
export default OrderForm
