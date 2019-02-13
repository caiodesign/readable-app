import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import OrderForm from './OrderForm'

class CategoryHeader extends Component {
  render() {
    const { name, updatePostsOrder } = this.props

    return (
      <div className="card-header">
        <div className="row">
          <div className="col-md-7">
            <Link to={`/${name}`}>
              <h4>{name}</h4>
            </Link>
          </div>
          <div className="col-md-3">
            <OrderForm updateOrder={updatePostsOrder} />
          </div>
          <div className="col-md-2">
            <div
              className="btn-group float-right"
              role="group"
              aria-label="Basic example"
            >
              <Link
                to="/post/create"
                className="btn btn-primary btn-sm"
                title="Add new post"
              >
                <i className="material-icons">add</i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CategoryHeader.propTypes = {
  name: PropTypes.string.isRequired,
  updatePostsOrder: PropTypes.func,
}

export default CategoryHeader
