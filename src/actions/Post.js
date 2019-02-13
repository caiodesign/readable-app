import * as uuid from 'uuid'
import * as API from '../utils/Api'

export const SET_POSTS = 'SET_POSTS'
export const ADD_CATEGORY_POSTS = 'ADD_CATEGORY_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const CREATE_POST = 'CREATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_VOTE_POST = 'ADD_VOTE_POST'
export const REMOVE_VOTE_POST = 'REMOVE_VOTE_POST'
export const REPLACE_POST = 'REPLACE_POST'

export const addCategoryPosts = ({ posts, categoryName }) => (
  { type: ADD_CATEGORY_POSTS, posts, categoryName }
)

export const setPosts = posts => ({ type: SET_POSTS, posts })

export const updatePost = post => ({ type: UPDATE_POST, post })

export const createPost = post => ({ type: CREATE_POST, post })

export const removePost = id => ({ type: REMOVE_POST, id })

export const addVote = ({ id }) => ({ type: ADD_VOTE_POST, id })

export const removeVote = ({ id }) => ({ type: REMOVE_VOTE_POST, id })

export const replacePost = post => ({ type: REPLACE_POST, post })

export const fetchCreatePost = ({ title, body, author, category }) => (dispatch) => {
  const id = uuid.v1()
  const timestamp = Date.now()

  return API.addPost({ id, timestamp, title, body, author, category }).then(() => (
    dispatch(createPost({ id, timestamp, title, body, author, category }))
  ))
}

export const fetchGetPostByCategory = categoryName => dispatch => (

  API.getPostsByCategory(categoryName).then(posts => (
    dispatch(addCategoryPosts({ posts, categoryName }))
  ))
)

export const fetchUpVotePost = id => dispatch => (
  API.upVotePost(id).then(() => {
    dispatch(addVote({ id }))
  })
)

export const fetchDownVotePost = id => dispatch => (
  API.downVotePost(id).then(() => {
    dispatch(removeVote({ id }))
  })
)


export const fetchPostDetail = id => dispatch => (
  API.getPostDetail(id).then((post) => {
    dispatch(replacePost(post))
  })
)

export const fetchDeletePost = id => dispatch => (
  API.deletePost(id).then(() => {
    dispatch(removePost(id))
  })
)

export const fetchUpdatePost = ({ title, body, id }) => dispatch => (
  API.updatePost({ id, title, body }).then(post => (
    dispatch(updatePost(post))
  ))
)
