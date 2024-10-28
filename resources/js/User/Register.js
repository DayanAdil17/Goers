import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios'

import SuccessNotification from '../components/SuccessNotification'

export default function Register() {
    const [userName, setUserName] = React.useState("")
    const [fullName, setFullName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [openSnack, setOpenSnack] = React.useState(false)

    const handleRegistration = (e) => {
        e.preventDefault()

        var data = {
            userName : userName,
            fullName : fullName,
            password : password
        }

        axios.post('/registration',data).then((res)=>{
            setOpenSnack(true);
        });
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
                REGISTER
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" label="User Name" fullWidth value = { userName } onChange={(event) => { setUserName(event.target.value) } } />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" label="Full Name" fullWidth value = { fullName } onChange = {(event) => { setFullName(event.target.value) }} />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" label="Password" type = "password" fullWidth value = { password } onChange ={(event) => { setPassword(event.target.value) }} />
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleRegistration}>
                <Button variant="contained" fullWidth type = "submit">
                    Register
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <SuccessNotification openSnack = {openSnack} closeSnack = {setOpenSnack} message = "User registered successfully" navigate="/login" />
    </Grid>
  )
}
