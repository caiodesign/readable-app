import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCreateComment } from '../actions/Comment'


class CreateComment extends Component {
  state = {
    body: '',
    author: '',
  }

  createComment = () => {
    const { createComment, parentId } = this.props
    const { body, author } = this.state

    createComment({
      body,
      author,
      parentId,
    })

    this.setState({
      body: '',
      author: '',
    })
  }

  bodyOnChangeHandler = (event) => {
    const { value } = event.target
    this.setState({ body: value })
  }

  authorOnChangeHandler = (event) => {
    const { value } = event.target
    this.setState({ author: value })
  }

  render() {
    const { body, author } = this.state

    return (
      <div className="card">
        <div className="card-body">
          <div className="form-group row">
            <div className="col-sm-10">
              <textarea
                type="text"
                className="form-control"
                id="body"
                placeholder="Enter your comment text here"
                onChange={this.bodyOnChangeHandler}
                value={body}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="author"
                placeholder="Enter author here"
                onChange={this.authorOnChangeHandler}
                value={author}
              />
            </div>
          </div>
          <div className="form-group row float-right">
            <div className="col-sm-2 ">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.createComment}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  createComment: comment => dispatch(fetchCreateComment(comment)),
})


CreateComment.propTypes = {
  parentId: PropTypes.string.isRequired,
  createComment: PropTypes.func,
}

export default connect(
  null,
  mapDispatchToProps,
)(CreateComment)
