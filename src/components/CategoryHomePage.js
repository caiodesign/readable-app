import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Category from './Category'

class CategoryHomePage extends Component {
  render() {
    const { match } = this.props

    return (
      <div className="container">
        {match.params.categoryName && (
          <Category name={match.params.categoryName} />
        )}
      </div>
    )
  }
}

CategoryHomePage.propTypes = {
  match: PropTypes.object,
}

export default CategoryHomePage
