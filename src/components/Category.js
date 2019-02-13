import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchGetPostByCategory } from '../actions/Post'
import CategoryHeader from './CategoryHeader'
import CategoryBody from './CategoryBody'

class Category extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    const { getPostsByCategory, name } = this.props
    getPostsByCategory(name)
  }

  componentWillReceiveProps(nextProps) {
    const { posts } = nextProps
    this.setState({
      posts,
    })
  }


  updatePostsOrder = ({ by, desc }) => {
    let { posts } = this.state

    if (by === 'date' && desc) {
      posts = posts.sort((postA, postB) => {
        if (postA.timestamp > postB.timestamp) return -1

        return 1
      })
    }

    if (by === 'date' && !desc) {
      posts = posts.sort((postA, postB) => {
        if (postA.timestamp < postB.timestamp) return -1

        return 1
      })
    }

    if (by === 'rate' && !desc) {
      posts = posts.sort((postA, postB) => {
        if (postA.voteScore < postB.voteScore) return -1

        return 1
      })
    }

    if (by === 'rate' && desc) {
      posts = posts.sort((postA, postB) => {
        if (postA.voteScore > postB.voteScore) return -1

        return 1
      })
    }

    if (by === 'author' && desc) {
      posts = posts.sort((postA, postB) => {
        if (postA.author > postB.author) return -1

        return 1
      })
    }

    if (by === 'author' && !desc) {
      posts = posts.sort((postA, postB) => {
        if (postA.author < postB.author) return -1

        return 1
      })
    }

    this.setState({ posts })
  }

  render() {
    const { name } = this.props
    const { posts } = this.state

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CategoryHeader
              name={name}
              updatePostsOrder={this.updatePostsOrder}
            />
            { posts.length > 0 && <CategoryBody posts={posts} /> }
          </div>
        </div>
      </div>
    )
  }
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  getPostsByCategory: PropTypes.func,
  posts: PropTypes.array,
}


const mapStateToProps = (state, props) => {
  let { posts } = state.post
  posts = posts.filter(post => post.category === props.name && !post.deleted)
  posts.sort((postA, postB) => {
    if (postA.voteScore > postB.voteScore) return -1

    return 1
  })

  return { posts }
}

const mapDispatchToProps = dispatch => ({
  getPostsByCategory: categoryName => (
    dispatch(fetchGetPostByCategory(categoryName))
  ),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Category)
