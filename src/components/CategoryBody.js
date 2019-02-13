import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

class CategoryBody extends Component {
  render() {
    const { posts } = this.props

    return (
      <div className="card-body">
        <div className="row">
          {posts.map((post, index) => (
            <div className="col-md-6" key={index}>
              <Post post={post} isEditEnabled isDeleteEnabled />
              <br />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

CategoryBody.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default CategoryBody
