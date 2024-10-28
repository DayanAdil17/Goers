import { Grid, Paper, TextField, Button, MenuItem, IconButton, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { Add, Delete } from '@mui/icons-material';

import SuccessNotification from './components/SuccessNotification'
import BackButton from './components/BackButton'

export default function AddRestaurant() {
    const [restaurantName, setRestaurantName] = useState('');
    const [schedule, setSchedule] = useState([{ day: '', open: null, close: null }]);
    const [openSnack, setOpenSnack] = useState(false)

    const handleAddRow = () => {
        setSchedule([...schedule, { day: '', open: null, close: null }]);
    };

    const handleDeleteRow = (index) => {
        setSchedule(schedule.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[index][field] = value; // Ensure the time value is updated
        setSchedule(updatedSchedule);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const formattedSchedule = schedule.map((slot) => {
            let openTime = null;
            let closeTime = null;

            if (slot.open) {
                openTime = new Date(`1970-01-01T${slot.open}:00Z`);
                openTime.setHours(openTime.getHours() + 7); // Adjust for timezone
            }

            if (slot.close) {
                closeTime = new Date(`1970-01-01T${slot.close}:00Z`);
                closeTime.setHours(closeTime.getHours() + 7); // Adjust for timezone
            }

            return {
                day: slot.day,
                open: openTime ? openTime.toISOString().slice(11, 16) : null,
                close: closeTime ? closeTime.toISOString().slice(11, 16) : null,
            };
        });

        const data = {
            restaurantName,
            openingSchedule: formattedSchedule,
        };
        console.log(data);
        // API call to submit data
        axios.post(`/add-restaurant-data`, data).then(res => {
            setOpenSnack(true)
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <Paper elevation={4} sx={{ padding: 5 }}>
                    <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={2}>
                        <Grid item xs={12}>
                            <BackButton navigate="/" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h3'>
                                ADD RESTAURANT
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Restaurant Name"
                                value={restaurantName}
                                fullWidth
                                onChange={(e) => setRestaurantName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {schedule.map((slot, index) => (
                                <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop:10 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Day"
                                            select
                                            value={slot.day}
                                            fullWidth
                                            onChange={(e) => handleChange(index, 'day', e.target.value)}
                                        >
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                                <MenuItem key={day} value={day}>
                                                    {day}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TimeField
                                            label="Opening Time"
                                            value={slot.open ? new Date(`1970-01-01T${slot.open}:00Z`) : null}
                                            onChange={(time) => handleChange(index, 'open', time ? time.toISOString().slice(11, 16) : null)}
                                            fullWidth
                                            format="HH:mm"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TimeField
                                            label="Close Time"
                                            value={slot.close ? new Date(`1970-01-01T${slot.close}:00Z`) : null}
                                            onChange={(time) => handleChange(index, 'close', time ? time.toISOString().slice(11, 16) : null)}
                                            fullWidth
                                            format="HH:mm"
                                        />
                                    </Grid>

                                    <IconButton onClick={() => handleDeleteRow(index)} color="secondary">
                                        <Delete />
                                    </IconButton>
                                </div>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleAddRow} startIcon={<Add />} variant="contained">
                                Add Time Slot
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit}>
                                <Button variant="contained" color="primary" fullWidth type = "submit" >
                                    Submit
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
            <SuccessNotification openSnack = {openSnack} closeSnack = {setOpenSnack} message = "Data successfully stored" navigate = "/" />
        </LocalizationProvider>
    );
}
