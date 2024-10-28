import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownTime(props) {
    const {
        searchTime
    } = props;

    const [time, setTime] = React.useState("");

    const handleChange = (event) => {
        setTime(event.target.value);
        searchTime(event.target.value)
      };

    const timeSlots = [
        { label: '01:00 AM', value: '01:00' },
        { label: '02:00 AM', value: '02:00' },
        { label: '03:00 AM', value: '03:00' },
        { label: '04:00 AM', value: '04:00' },
        { label: '05:00 AM', value: '05:00' },
        { label: '06:00 AM', value: '06:00' },
        { label: '07:00 AM', value: '07:00' },
        { label: '08:00 AM', value: '08:00' },
        { label: '09:00 AM', value: '09:00' },
        { label: '10:00 AM', value: '10:00' },
        { label: '11:00 AM', value: '11:00' },
        { label: '12:00 AM', value: '12:00' },
        { label: '1:00 PM', value: '13:00' },
        { label: '2:00 PM', value: '14:00' },
        { label: '3:00 PM', value: '15:00' },
        { label: '4:00 PM', value: '16:00' },
        { label: '5:00 PM', value: '17:00' },
        { label: '6:00 PM', value: '18:00' },
        { label: '7:00 PM', value: '19:00' },
        { label: '8:00 PM', value: '20:00' },
        { label: '9:00 PM', value: '21:00' },
        { label: '10:00 PM', value: '22:00' },
        { label: '11:00 PM', value: '23:00' },
        { label: '12:00 PM', value: '00:00' },
    ];

  return (
    <div>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Time</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={time}
                label="Time"
                onChange={handleChange}
                >
                    {
                        timeSlots.map((item) => (
                            <MenuItem value = {item.value}>
                                {item.label}
                            </MenuItem> 
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
</div>
  )
}
