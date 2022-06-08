
import * as api from "../../api"
import { CREATE_POST, GET_ALL_POSTS, UPDATE_POST, DELETE_POST, LIKE_POST } from "./actionTypes"

export const getAllPosts = () => async (dispatch)=>{
    try {
        const { data } = await api.getPosts()
        dispatch({
            type: GET_ALL_POSTS,
            payload: data
        })
    } catch (error) {
        console.log(error)   
    }
}


export const createPost = (post)=> async (dispatch)=>{
    try {
        const { data } = await api.createPost(post)
        dispatch({
            type: CREATE_POST,
            payload: data
        })
    } catch (error) {
        console.log(error)   
    }
}


export const updatePost = (id,post)=> async (dispatch)=>{
    try {
        const {data} = await api.updatePost(id,post)
    
        dispatch({
            type: UPDATE_POST,
            payload: data
        })
    } catch (error) {
        console.log(error)   
    }
}

export const deletePost = (id)=> async (dispatch)=>{
    try {
        const { data } = await api.deletePost(id)
        dispatch({
            type: DELETE_POST,
            payload: data
        })
    } catch (error) {
        console.log(error)   
    }
}

export const likePost = (id)=> async (dispatch)=>{
    try {
        const {data} = await api.likePost(id)
    
        dispatch({
            type: LIKE_POST,
            payload: data
        })
    } catch (error) {
        console.log(error)   
    }
}