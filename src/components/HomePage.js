import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Category from './Category'
import { fetchGetCategories } from '../actions/Category'


class HomePage extends Component {
  componentDidMount() {
    const { fetchCategories, getCategories } = this.props
    if (fetchCategories) {
      getCategories()
    }
  }

  render() {
    const { categories } = this.props

    return (
      <div className="container">
        {categories && categories.map((category, index) => (
          <div key={index}>
            <Category name={category.name} />
            <br />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
  fetchCategories: !state.category.isFetch,
})

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(fetchGetCategories()),
})


HomePage.propTypes = {
  getCategories: PropTypes.func,
  fetchCategories: PropTypes.bool,
  categories: PropTypes.array,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage)
