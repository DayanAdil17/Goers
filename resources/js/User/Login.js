import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

import SuccessNotification from '../components/SuccessNotification'

var md5 = require('md5');


export default function Login() {
  const [userName, setUserName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loginStatus, setLoginStatus] = React.useState("")

  console.log("The user database =>", userDatabase);

  const login = (e) => {
    e.preventDefault()
    if(userName != null && password != null)
    {
      const user = userDatabase.filter(data => data.userName == userName && data.password == md5(password))

      let data = {
        userName : userName,
        password : password
      }

      axios.post('/login_check',data).then(()=>{
        window.location.href = "/"
      })

    }
  }

  return (
    <Grid 
      container 
      direction="row" 
      justifyContent="center" 
      alignItems="center" 
      spacing={2} 
      sx={{ minHeight: "100vh" }} // Ensures the container fills the viewport height
    >
      <Grid item xs={12} sm={11} md={11}>
        <Paper elevation={4} sx={{ padding: 5 }}>
          <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h4' sx = {{fontWeight: 'bold'}}>
                LOGIN
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" label="User Name" fullWidth value = { userName } onChange = {(event) => { setUserName(event.target.value) }} />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" type = "password" label="Password" fullWidth value = { password } onChange = {(event) => { setPassword(event.target.value) }} />
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={login}>
                <Button variant="contained" fullWidth sx = {{backgroundColor:"#23c702"}} type = "submit">
                  Login
                </Button>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={() => {window.location.href="/register"}}>
                Register
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      
    </Grid>
  )
}
