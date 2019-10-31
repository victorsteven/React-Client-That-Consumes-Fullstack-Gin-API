import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import { BEFORE_STATE, FETCH_POSTS, FETCH_POSTS_ERROR, GET_POST_SUCCESS, GET_POST_ERROR, CREATE_POST_SUCCESS, CREATE_POST_ERROR, UPDATE_POST_SUCCESS, UPDATE_POST_ERROR, DELETE_POST_SUCCESS, DELETE_POST_ERROR  } from '../postsTypes'
import  {history} from '../../../../history'

 
export const fetchPosts = () => {
  return (dispatch) => {

    dispatch({ type: BEFORE_STATE })

    axios.get(`${API_ROUTE}/posts`).then(res => {
      dispatch({ type: FETCH_POSTS, payload: res.data.response })
    }).catch(err => {
      dispatch({ type: FETCH_POSTS_ERROR, payload: err.response.data.error })
    })
  }
}

export const fetchPost = id => {
  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE })

    try {
      const res  = await axios.get(`${API_ROUTE}/posts/${id}`)
      dispatch({ type: GET_POST_SUCCESS, payload: res.data.response })
    } catch(err){
      console.log("this is the error for the post: ", err.response.data.error)
      dispatch({ type: GET_POST_ERROR, payload: err.response.data.error })
    }
  }
}

export const createPost = (createPost) => {
  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE })

    try {
      const res = await axios.post(`${API_ROUTE}/posts`, createPost)
      dispatch({ 
        type: CREATE_POST_SUCCESS,  
        payload: res.data.response
      })
      history.push('/');
    } catch(err) {
      dispatch({ type: CREATE_POST_ERROR, payload: err.response.data.error })
    }
  }
}

export const updatePost = (updateDetails, updateSuccess) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE })

    try {
      const res = await axios.put(`${API_ROUTE}/posts/${updateDetails.id}`, updateDetails)
      dispatch({ 
        type: UPDATE_POST_SUCCESS,
        payload: res.data.response
      })
      console.log("This is the post update id", res.data.response.id)
      updateSuccess()
    } catch(err) {
      console.log("this is the error for the update: ", err)
      dispatch({ type: UPDATE_POST_ERROR, payload: err.response.data.error })
    }
  }
}

export const deletePost = (id, deleteSuccess) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE })

    try {
      const res = await axios.delete(`${API_ROUTE}/posts/${id}`)
      dispatch({ 
        type: DELETE_POST_SUCCESS,
        payload: {
          deletedID: id,
          message: res.data.response
        } 
      })
      deleteSuccess()
    } catch(err) {
      dispatch({ type: DELETE_POST_ERROR, payload: err.response.data.error })
    }
  }
}
