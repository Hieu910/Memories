import React, { useState } from "react";
import useStyles from "./styles"
import { GoogleLogin } from "react-google-login"
import Icon from "./Icon"; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { AUTH } from "../../redux/actions/actionTypes";
import { Avatar,Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core";
import LockOutlinedIcon  from "@material-ui/icons/LockOutlined"
import Input from "./Input";
import { signup, signin } from "../../redux/actions/auth";

const Auth = ()=>{
    const classes =useStyles()
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        firstName:'',
        lastName:'',
        email: "",
        password: "",
        confirmPassword: ''
    })
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isSignUp){
            dispatch(signup(formData,navigate))
        } 
        else {
            dispatch(signin(formData, navigate));
        }
    }
    console.log(formData);
    const handleChange = (e)=>{
        setFormData((prevValue)=>{
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleShowPassword = ()=>{
        setShowPassword((showPassword)=> !showPassword)
    }
    const switchMode = ()=>{
        setIsSignUp((prevValue)=> !prevValue)
        setShowPassword(false)
    }
    const googleSuccess = async (res)=>{
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({
                type: AUTH,
                payload: { result, token }
            })
            navigate("/")
        } catch (error) {
            console.log(error);
            
        }
    }
    const googleFailure = (error)=>{
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try again later")
    }
    return (
       <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5" >{ isSignUp ? 'Sign Up' : "Sign in"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp && (
                            <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {
                            isSignUp ? "Sign Up": "Sign In"
                        }
                    </Button>
                    <GoogleLogin
                        clientId="20245108248-9ih88hc1kdvl8pn5d86u7g6ih1alomub.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {
                                    isSignUp ? "Already have an account ? Sign In" : "Don't have an account ? Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
       </Container>
    )
}

export default Auth