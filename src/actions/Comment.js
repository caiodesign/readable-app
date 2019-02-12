import * as uuid from 'uuid'
import * as API from '../utils/Api'

export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const ADD_VOTE_COMMENT = 'ADD_VOTE_COMMENT'
export const REMOVE_VOTE_COMMENT = 'REMOVE_VOTE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENTS = 'ADD_COMMENTS'


export const removeComment = id => ({ type: REMOVE_COMMENT, id })

export const createComment = comment => ({ type: CREATE_COMMENT, comment })

export const addVote = id => ({ type: ADD_VOTE_COMMENT, id })

export const removeVote = id => ({ type: REMOVE_VOTE_COMMENT, id })

export const updateComment = comment => ({ type: UPDATE_COMMENT, comment })

export const setComments = comments => ({ type: SET_COMMENTS, comments })

export const addComments = ({ comments, postId }) => ({ type: ADD_COMMENTS, comments, postId })

export const fetchGetAllComentsByPost = id => dispatch => (
  API.getAllComentsByPost(id).then((comments) => {
    dispatch(addComments({ postId: id, comments }))
  })
)

export const fetchDownVoteComment = id => dispatch => (
  API.downVoteComment(id).then(() => {
    dispatch(removeVote(id))
  })
)

export const fetchUpVoteComment = id => dispatch => (
  API.upVoteComment(id).then(() => {
    dispatch(addVote(id))
  })
)

export const fetchDeleteComment = id => dispatch => (
  API.deleteComment(id).then(() => {
    dispatch(removeComment(id))
  })
)

export const fetchCreateComment = ({ body, author, parentId }) => (dispatch) => {
  const id = uuid.v1()
  const timestamp = Date.now()

  return API.addComment({ id, timestamp, body, author, parentId }).then((comment) => {
    dispatch(createComment(comment))
  })
}

export const fetchUpdateComment = ({ id, body }) => (dispatch) => {
  const timestamp = Date.now()

  return API.updateComment({ id, timestamp, body }).then(() => {
    dispatch(updateComment({ id, timestamp, body }))
  })
}
