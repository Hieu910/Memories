import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles"
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({setCurrentId})=>{
    const classes = useStyles()
    const posts = useSelector((state)=>{
       return state.posts
    })

    return (
        <>
          { !posts.length ? <CircularProgress/> : (
              <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                    {
                        posts.map((post)=>(
                            <Grid key={post._id} xs={12} sm={6} item>
                                <Post setCurrentId={setCurrentId} post={post}></Post>
                            </Grid>
                        ))
                    }
              </Grid>
          )}
        </>
       
    )
}

export default Posts