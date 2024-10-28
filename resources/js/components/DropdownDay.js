import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownDay(props) {
    const{
        searchDay
    } = props;
    const [day, setDay] = React.useState('');
    const handleChange = (event) => {
        setDay(event.target.value);
        searchDay(event.target.value)
      };
  return (
    <div>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={day}
                label="Day"
                onChange={handleChange}
                >
                    <MenuItem value={"Mon"}>Monday</MenuItem>
                    <MenuItem value={"Tue"}>Tuesday</MenuItem>
                    <MenuItem value={"Wed"}>Wednesday</MenuItem>
                    <MenuItem value={"Thu"}>Thursday</MenuItem>
                    <MenuItem value={"Fri"}>Friday</MenuItem>
                    <MenuItem value={"Sat"}>Saturday</MenuItem>
                    <MenuItem value={"Sun"}>Sunday</MenuItem>
                </Select>
            </FormControl>
        </Box>
    </div>
  )
}
