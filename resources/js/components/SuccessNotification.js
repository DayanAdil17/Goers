import React from 'react'
import { Snackbar, Alert } from '@mui/material'

export default function SuccessNotification(props) {
    const {
        openSnack,
        message,
        closeSnack,
        navigate
    } = props;

    const handleCloseSnack = (event, reason) => {
        // apply condition to close the snack where we click away and when the time is run out, then navigate to main page back
        if (reason === 'clickaway') {
            return;
        }
        closeSnack(false);
        if(navigate != null)
        {
            window.location.href = navigate;
        }
    };

  return (
    <div>
        <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleCloseSnack} severity="success" variant="filled" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    </div>
  )
}
