import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OrderForm from './OrderForm'
import CreateComment from './CreateComment'
import Comment from './Comment'

class CommentsContainer extends Component {
    state = {
      isCreateCommentOpen: false,
      comments: [],
    };

    componentWillReceiveProps(nextProps) {
      const { comments } = nextProps
      this.setState({ comments })
    }

    createCommentOnClickHandler = () => {
      this.setState((prevState) => {
        const newState = prevState
        newState.isCreateCommentOpen = !newState.isCreateCommentOpen

        return newState
      })
    }

    updateCommentsOrder = ({ by, desc }) => {
      const { comments } = this.state
      let commentsOrdered = comments

      if (by === 'date' && desc) {
        commentsOrdered = comments.sort((commentA, commentB) => {
          if (commentA.timestamp > commentB.timestamp) return -1

          return 1
        })
      }

      if (by === 'date' && !desc) {
        commentsOrdered = comments.sort((commentA, commentB) => {
          if (commentA.timestamp < commentB.timestamp) return -1

          return 1
        })
      }

      if (by === 'rate' && !desc) {
        commentsOrdered = comments.sort((commentA, commentB) => {
          if (commentA.voteScore < commentB.voteScore) return -1

          return 1
        })
      }

      if (by === 'rate' && desc) {
        commentsOrdered = comments.sort((commentA, commentB) => {
          if (commentA.voteScore > commentB.voteScore) return -1

          return 1
        })
      }

      if (by === 'author' && !desc) {
        commentsOrdered = comments.sort((commentA, commentB) => {
          if (commentA.author < commentB.author) return -1

          return 1
        })
      }

      if (by === 'author' && desc) {
        commentsOrdered = comments.sort((commentA, commentB) => {
          if (commentA.author > commentB.author) return -1

          return 1
        })
      }

      this.setState({ comments: commentsOrdered })
    };

    render() {
      const { post } = this.props
      const { isCreateCommentOpen, comments } = this.state

      return (
        <div className="card">
          <h4 className="card-header">
            <div className="row">
              <div className="col-md-7">
                  Comments
              </div>
              <div className="col-md-3">
                <OrderForm
                  updateOrder={this.updateCommentsOrder}
                />
              </div>
              <div className="col-md-2">
                <div className="btn-group float-right" role="group">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={this.createCommentOnClickHandler}
                  >
                    <i className="material-icons">add</i>
                  </button>
                </div>
              </div>
            </div>
          </h4>
          <div className="card-body">
            {isCreateCommentOpen === true && (
              <div>
                <CreateComment parentId={post.id} />
                <br />
              </div>
            )}
            {comments && (
              comments.map((comment, index) => (
                <div key={index}>
                  <Comment
                    comment={comment}
                    isEditEnabled
                    isDeleteEnabled
                  />
                  <br />
                </div>
              ))
            )}
          </div>
        </div>
      )
    }
}

CommentsContainer.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array,
}

export default CommentsContainer
