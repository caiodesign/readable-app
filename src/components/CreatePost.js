import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCreatePost, fetchUpdatePost } from '../actions/Post'
import { fetchGetCategories } from '../actions/Category'
import * as API from '../utils/Api'


class CreatePost extends Component {
  state = {
    id: '',
    title: '',
    body: '',
    author: '',
    category: '',
  }

  componentDidMount() {
    const {
      categories,
      fetchCategories,
      getCategories,
      isUpdate,
      match,
    } = this.props

    if (categories.length > 0) {
      this.setState({
        category: categories[0].name,
      })
    }

    if (fetchCategories) {
      getCategories()
    }

    if (isUpdate) {
      API.getPostDetail(match.params.id).then(post => (
        this.setState({
          id: post.id,
          title: post.title,
          body: post.body,
          author: post.author,
          category: post.category,
        })
      ))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { categories } = nextProps
    if (categories) this.setState({ category: categories[0].name })
  }

  updateOnClickHandler = () => {
    const { updatePost } = this.state
    updatePost(this.state)
  }

    titleOnChangeHandler = (event) => {
      const { value } = event.target
      this.setState({ title: value })
    }

    bodyOnChangeHandler = (event) => {
      const { value } = event.target
      this.setState({ body: value })
    }

    authorOnChangeHandler = (event) => {
      const { value } = event.target
      this.setState({ author: value })
    }

    categoryOnChangeHandler = (event) => {
      const { value } = event.target
      this.setState({ category: value })
    }

    createPostOnClickHandler = () => {
      const { createPost } = this.props
      const { title, body, author, category } = this.state
      const newPost = {
        title,
        body,
        author,
        category,
      }
      createPost(newPost)
    }

    render() {
      const { isUpdate, categories } = this.props
      const { category, body, title, author } = this.state

      return (
        <div className="container">
          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Post title"
                  onChange={this.titleOnChangeHandler}
                  value={title}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Body</label>
              <div className="col-sm-10">
                <textarea
                  type="text"
                  className="form-control"
                  id="body"
                  placeholder="Post text"
                  onChange={this.bodyOnChangeHandler}
                  value={body}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Category</label>
              <div className="col-sm-4">
                <select
                  className="form-control"
                  id="sel1"
                  onChange={this.categoryOnChangeHandler}
                  value={category}
                  disabled={isUpdate}
                >
                  {categories.map((ctg, index) => (
                    <option key={index} value={ctg.name}>{ctg.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Author</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  placeholder="Author of the post"
                  onChange={this.authorOnChangeHandler}
                  value={author}
                  disabled={isUpdate}
                />
              </div>
            </div>
            <div className="form-group row float-right">
              <div className="col-sm-10 ">
                {isUpdate ? (
                  <Link
                    to="/"
                    className="btn btn-primary"
                    onClick={this.updateOnClickHandler}
                  >
                    Update
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="btn btn-primary"
                    onClick={this.createPostOnClickHandler}
                  >
                    Create
                  </Link>
                )}
              </div>
            </div>
          </form>
        </div>
      )
    }
}


const mapStateToProps = state => ({
  categories: state.category.categories,
  fetchCategories: !state.category.isFetch,
})


const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(fetchCreatePost(post)),
  getCategories: () => dispatch(fetchGetCategories()),
  updatePost: post => dispatch(fetchUpdatePost(post)),
})

CreatePost.propTypes = {
  categories: PropTypes.array,
  fetchCategories: PropTypes.bool,
  getCategories: PropTypes.func,
  isUpdate: PropTypes.bool,
  match: PropTypes.bool,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePost)
