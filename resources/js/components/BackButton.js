import { Button } from '@mui/material';
import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function BackButton(props) {
    const {
        navigate
    } = props;
  return (
    <div>
        <Button variant = "contained" sx = {{backgroundColor:"#cf0412"}} onClick={() => {window.location.href = navigate}} startIcon={<ArrowBackIosNewIcon />}>
            Back
        </Button>
    </div>
  )
}
