import * as API from '../utils/Api'

export const SET_CATEGORIES = 'SET_CATEGORIES'

export const setCategories = categories => ({ type: SET_CATEGORIES, categories })

export const fetchGetCategories = () => dispatch => (
  API.getCategories().then((data) => {
    dispatch(setCategories(data.categories))
  })
)
