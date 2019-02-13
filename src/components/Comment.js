import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TimeAgo from 'react-timeago'
import {
  fetchDeleteComment,
  fetchDownVoteComment,
  fetchUpdateComment,
  fetchUpVoteComment,
} from '../actions/Comment'


class Comment extends Component {
  state = {
    isEditable: false,
    comment: {},
  };

  componentDidMount() {
    const { comment } = this.props
    this.setState({ comment })
  }

  componentWillReceiveProps(nextProps) {
    const { comment } = nextProps
    this.setState({ comment })
  }

  bodyOnChangeHandler = (event) => {
    const newState = {}
    const { value } = event.target
    newState.comment.body = value
    this.setState(newState)
  };

    upVoteOnClickHandler = (event) => {
      const { upVoteComment, comment } = this.props
      event.preventDefault()
      upVoteComment(comment.id)
    };

    downVoteOnClickHandler = (event) => {
      const { downVoteComment, comment } = this.props
      event.preventDefault()
      downVoteComment(comment.id)
    };

    editOnClickHandler = () => (
      this.setState(prevState => ({ isEditable: !prevState.isEditable }))
    )

    updateCommentOnClickHandler = () => {
      const { updateComment } = this.props
      const { comment } = this.state
      updateComment(comment)
      this.setState(prevState => ({
        isEditable: !prevState.isEditable,
      }))
    };

    deleteCommentOnClickHandler = () => {
      const { deleteComment, comment } = this.props
      deleteComment(comment.id)
    };

    render() {
      const { comment, isEditable } = this.state
      const { isEditEnabled, isDeleteEnabled } = this.props

      return (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-1">
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
              <div className="col-md-11">
                <div className="row">
                  <div className="col-md-12">
                    {isEditable === true ? (
                      <div>
                        <div className="form-group row">
                          <div className="col-sm-12">
                            <textarea
                              type="text"
                              className="form-control"
                              id="body"
                              placeholder="Enter your comment text here"
                              value={comment.body}
                              onChange={this.bodyOnChangeHandler}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.updateCommentOnClickHandler}
                        >
                          Update
                        </button>
                        <br />
                      </div>
                    ) : (
                      <div>
                        <p>
                          { comment.body }
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="col-md-9">
                    <br />
                    <p className="small">
                      Author:
                      { comment.author }
                      - Modified:
                      <TimeAgo date={new Date(comment.timestamp)} />
                      <br />
                      Votes:
                      { comment.voteScore }
                    </p>
                  </div>
                  <div className="col-md-3">

                    {isDeleteEnabled && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm float-right"
                      >
                        <i
                          tabIndex={0}
                          role="button"
                          className="material-icons"
                          onClick={this.deleteCommentOnClickHandler}
                        >
                          delete
                        </i>
                      </button>
                    )}
                    {isEditEnabled && (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm float-right"
                        onClick={this.editOnClickHandler}
                      >
                        <i className="material-icons">mode_edit</i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  upVoteComment: PropTypes.func,
  downVoteComment: PropTypes.func,
  updateComment: PropTypes.func,
  deleteComment: PropTypes.func,
  isEditEnabled: PropTypes.bool,
  isDeleteEnabled: PropTypes.bool,
}

const mapDispatchToProps = dispatch => ({
  upVoteComment: commentId => dispatch(fetchUpVoteComment(commentId)),
  downVoteComment: commentId => dispatch(fetchDownVoteComment(commentId)),
  deleteComment: commentId => dispatch(fetchDeleteComment(commentId)),
  updateComment: comment => dispatch(fetchUpdateComment(comment)),
})

export default connect(
  null,
  mapDispatchToProps,
)(Comment)
