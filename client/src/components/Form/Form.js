import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { useDispatch , useSelector} from "react-redux";
import { createPost,updatePost } from "../../redux/actions/posts";


const Form = ({currentId, setCurrentId}) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"))
  
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: ""
  });
  const post = useSelector((state)=>{
    return state.posts.find((post)=>{
     return post._id === currentId 
    })
  })
  
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
      e.preventDefault()
      if(currentId){
        dispatch(updatePost(currentId,{...postData, name: user?.result?.name}))
      }
      else{
        dispatch(createPost({...postData, name: user?.result?.name}))
      }
      clearData()
  };
  const handleChange =(e)=>{
    setPostData((postData)=>{
      return {
    ...postData,
    [e.target.name]: e.target.value,
   }});
  }
  const clearData = ()=>{
      setPostData({
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
      })
      setCurrentId(null)
  }
    useEffect(()=>{
      if(post){
        setPostData(post)
      }
    },[post])

    if (!user?.result?.name) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please Sign In to use other functions.
          </Typography>
        </Paper>
      );
    }

  return (
    <>
      <Paper className={classes.paper}>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
        >
          <Typography variant="h6">{currentId ? "Update a memory" : "Creating a memory"}</Typography>
  
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            value={postData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            value={postData.message}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            value={postData.tags}
            onChange={handleChange}
            fullWidth
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setPostData((postData)=>{ return { ...postData, selectedFile: base64 } });
              }}
            />
          </div>
          <Button className={classes.buttonSubmit} color="primary" variant="contained" size="large" type="submit" fullWidth>Submit</Button>
          <Button color="secondary" variant="contained" size="small" fullWidth onClick={clearData}>Clear</Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
