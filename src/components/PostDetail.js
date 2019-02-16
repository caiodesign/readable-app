
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CommentsContainer from './CommentsContainer'
import Post from './Post'
import { fetchPostDetail } from '../actions/Post'


class PostDetail extends Component {
  state = {
    post: {},
  }

  componentDidMount() {
    const { getPostDetail, match } = this.props
    getPostDetail(match.params.id)
  }

  componentWillReceiveProps(newProps) {
    const { post } = newProps
    if (post) this.setState({ post })
  }

  render() {
    const { post } = this.state
    const { comments } = this.props

    return (
      <div className="relative">
        {post.id ? (
          <div className="container">
            <Post post={post} isEditEnabled isDeleteEnabled />
            <br />
            {comments && (
              <CommentsContainer
                comments={comments}
                post={post}
              />
            )}
          </div>
        ) : (
          <div className="notFound">
            <h1>Post not found!</h1>
            <p>:(</p>
          </div>
        )
      }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const comments = state.comment.comments.filter(comment => (
    comment.parentId === props.match.params.id && !comment.deleted
  ))

  comments.sort((commentA, commentB) => {
    if (commentA.voteScore > commentB.voteScore) return -1

    return 1
  })

  return {
    comments,
    post: state.post.posts.filter(post => post.id === props.match.params.id)[0],
  }
}

PostDetail.propTypes = {
  comments: PropTypes.array,
  getPostDetail: PropTypes.func,
  match: PropTypes.bool,
}

const mapDispatchToProps = dispatch => ({
  getPostDetail: postId => dispatch(fetchPostDetail(postId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail)
