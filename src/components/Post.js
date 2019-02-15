import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchGetAllComentsByPost } from '../actions/Comment'
import {
  fetchDeletePost,
  fetchDownVotePost,
  fetchUpVotePost,
} from '../actions/Post'

class Post extends Component {
  componentDidMount() {
    const { getAllCommentsByPost, post } = this.props
    getAllCommentsByPost(post.id)
  }

  upVoteOnClickHandler = (event) => {
    event.preventDefault()
    const { post, upVotePost } = this.props
    upVotePost(post.id)
  }

  downVoteOnClickHandler = (event) => {
    event.preventDefault()
    const { post, downVotePost } = this.props
    downVotePost(post.id)
  }

  deletePostOnClickHandler = () => {
    const { post, deletePost } = this.props
    deletePost(post.id)
  }

  render() {
    const { post, isDeleteEnabled, isEditEnabled, comments } = this.props

    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <Link to={`/${post.category}/${post.id}`}>
              <h5>{post.title}</h5>
            </Link>
            {isDeleteEnabled && (
              <Link
                to="/"
                type="button"
                className="btn btn-close"
                tabIndex={0}
                role="button"
                onClick={this.deletePostOnClickHandler}
              >
                <span>
                  X
                </span>
              </Link>
            )}
          </div>
          <p className="card-text">{post.body}</p>
          {isEditEnabled && (
            <Link
              to={`/post/update/${post.id}`}
              className="btn btn-primary btn-sm float-right"
            >
              <i
                className="material-icons"
              >
                mode_edit
              </i>
            </Link>
          )
          }
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-md-2 float-">
              <div className="btn-group-vertical btn-group-sm">
                <button
                  type="button"
                  className="btn btn-dark btn-sm float-left"
                >
                  <i
                    tabIndex={0}
                    role="button"
                    className="material-icons"
                    onClick={this.upVoteOnClickHandler}
                  >
                    keyboard_arrow_up
                  </i>
                </button>
                <button
                  type="button"
                  className="btn btn-dark btn-sm float-left"
                >
                  <i
                    tabIndex={0}
                    role="button"
                    className="material-icons"
                    onClick={this.downVoteOnClickHandler}
                  >
                    keyboard_arrow_down
                  </i>
                </button>
              </div>
            </div>
            <div className="col-md-9">
              <p>
                Author:
                {post.author}
                <br />
                Created:
                <TimeAgo date={new Date(post.timestamp)} />
                <br />
                Votes:
                {post.voteScore}
                | #Comments:
                {comments.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, props) => {
  const comments = state.comment.comments.filter(comment => (
    comment.parentId === props.post.id && !comment.deleted
  ))

  return { comments }
}

const mapDispatchToProps = dispatch => ({
  getAllCommentsByPost: postId => dispatch(fetchGetAllComentsByPost(postId)),
  upVotePost: postId => dispatch(fetchUpVotePost(postId)),
  downVotePost: postId => dispatch(fetchDownVotePost(postId)),
  deletePost: postId => dispatch(fetchDeletePost(postId)),
})

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getAllCommentsByPost: PropTypes.func,
  upVotePost: PropTypes.func,
  downVotePost: PropTypes.func,
  deletePost: PropTypes.func,
  isDeleteEnabled: PropTypes.bool,
  isEditEnabled: PropTypes.bool,
  comments: PropTypes.array,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post)
