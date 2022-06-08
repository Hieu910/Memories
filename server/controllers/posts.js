import mongoose from "mongoose";
import { PostMessage } from "../model/postMessage.js"

export const getPosts = async (req,res)=>{
   try {
        const postMessages =await PostMessage.find()
        res.status(200).json(postMessages)
   } catch (error) {
       res.status(404).json({error: error.message});
   }
}

export const createPost =async (req,res)=>{
    try {
        const post = req.body
        const newPost = new PostMessage({...post, creator: req.userId})
        await newPost.save()
        res.status(201).json(newPost)
   } catch (error) {
      res.status(409).json({error: error.message});
   }
}

export const updatePost = async (req,res)=>{
    try {
        const { id } = req.params
        const post = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).send('Id id invalid')
        }
        else{
           const updatedPost = await PostMessage.findByIdAndUpdate(id, post ,{new: true}) 
           res.status(200).json(updatedPost)
        }
   } catch (error) {
    res.status(404).json({error: error.message});
   }
}

export const deletePost = async (req,res)=>{
    try {
        const { id: _id } = req.params
        if(!mongoose.Types.ObjectId.isValid(_id)){
            res.status(404).send('Id id invalid')
        }
        else{
            const deletedPost = await PostMessage.findByIdAndDelete(_id)
            res.status(200).json(deletedPost)
         }
   } catch (error) {
    res.status(404).json({error: error.message});
   }
}
export const likePost = async (req,res)=>{
    try {

        const { id } = req.params
        if(!req.userId){
            return res.json({message: "Unauthenticated"})
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).send('Id id invalid')
        }
        else{
            const post = await PostMessage.findById(id)
            
            const isLiked = post.likes.find((id)=>{
               return id === String(req.userId) 
            })
  
            if(!isLiked){
                post.likes.push(req.userId)
            } else{
                post.likes = post.likes.filter((id)=>{
                    id !== String(req.userId)
                })
            }
            const updatedPost = await PostMessage.findByIdAndUpdate(id, post ,{new: true}) 
           res.status(200).json(updatedPost)
         }
   } catch (error) {
    res.status(404).json({error: error.message});
   }
}