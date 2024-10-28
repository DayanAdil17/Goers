import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';

import TableRestaurant from './components/TableRestaurant';
import DropdownDay from './components/DropdownDay'
import DropdownTime from './components/DropdownTime'

export default function Dashboard() {
  const [restaurants, setRestaurants] = React.useState([]);
  const [searchName, setSearchName] = React.useState("")
  const [searchDay, setSearchDay] = React.useState("")
  const [searchTime, setSearchTime] = React.useState("")

  const fetchFilteredRestaurants = async () => {
    try {
        const response = await axios.get('/restaurants', {
            params: {
                name: searchName == null ? null : searchName,
                day: searchDay == null ? null : searchDay,
                time: searchTime == null ? null : searchTime
            }
        });
        setRestaurants(response.data);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
    }
  };

  useEffect(() => {
    fetchFilteredRestaurants();
  }, [searchName, searchDay, searchTime]);

  return (
    <div>
      <Grid container direction = "row" alignItems={'center'} justifyContent = {'center'} spacing = {2}>
        <Grid item xs = {6}>
          <TextField label = "Search by name" value = {searchName} onChange = {(event) => {setSearchName(event.target.value)}} fullWidth />
        </Grid>
        <Grid item xs = {3}>
          <DropdownDay searchDay = {setSearchDay} />
        </Grid>
        <Grid item xs = {3}>
          <DropdownTime searchTime = {setSearchTime} />
        </Grid>
        <Grid item xs = {12}>
          <TableRestaurant data = {restaurants} />
        </Grid>
        {
          (() => {
            if(userData.role == "ADMIN")
            {
              return(
                <Grid item xs = {12}>
                  <Button variant = "contained" fullWidth onClick={() => {window.location.href='/add-restaurant'}} sx = {{backgroundColor:"#23c702"}} startIcon = {<AddIcon />}>
                    Add Restaurant
                  </Button>
                </Grid>
              )
            }
          })()
        }
      </Grid>
    </div>
  )
}
