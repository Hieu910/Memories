import { CREATE_POST, GET_ALL_POSTS, UPDATE_POST, DELETE_POST, LIKE_POST } from "../actions/actionTypes"

const postReducer = (state =[],action)=>{
    switch(action.type){
        case GET_ALL_POSTS:
            return action.payload
        case CREATE_POST:
            return [
                ...state,
                action.payload
            ]
        case UPDATE_POST:
            return state.map((post)=>{
              return  post._id === action.payload._id ? action.payload : post 
            })
        case DELETE_POST:
            return state.filter((post)=>{
                return post._id !== action.payload._id
            })
        case LIKE_POST:
            return state.map((post)=>{
                return  post._id === action.payload._id ? action.payload : post 
            })
        default: return state
    }
   
}

export default postReducer