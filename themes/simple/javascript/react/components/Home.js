import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import styles from '../page.module.css';
import Item from './Item';
import Header from './Header';
import Footer from './Footer';
import Filter from './Filter';
import axios from 'axios';

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [ capacity, setCapacity ] = React.useState(80);
  const [ venues, setVenues ] = React.useState([]);

  // useEffect(() => {
  //   axios.get('api/venues')
  //   .then(response => {
  //     setVenues(response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching venue data: ', error);
  //   });
  // }, []);

  // This function is for search and filter controls
  const filteredVenue = venue.locations.filter((location) =>
    // Matches either the name or address (example: 'Princes' or 'Dapto')
    (location.name.toLowerCase().includes(searchQuery.toLowerCase()) || location.address.toLowerCase().includes(searchQuery.toLowerCase()))
    // Match the capacity value
    && location.capacity >= capacity
  );

  return (
    <Box>
      <Box sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center', minHeight: '100svh', padding: '70px', gap: '64px', bgcolor: '#FFFCF9', height: 'auto' }}>
        <Header />
        <Box className="display-all" sx={{ width: '100%' }} display="flex" flexDirection="column">
          <Filter setCapacity={setCapacity} setSearch={setSearchQuery} />
          <Box className="items" sx={{ height: 'auto', width: '100%' }}>
            <Grid container={true} rowSpacing={5} direction='row' sx={{}}>
              {filteredVenue.map((location, index) => (
                <Grid key={index} size={4} display='flex' justifyContent='center' alignItems='center' sx={{}}>
                  <Item key={index} name={location.name} address={location.address} postcode={location.postcode} description={location.description} capacity={location.capacity} chips={location.chips} />
                </Grid>
              ))}
            </Grid>
            {/* <Grid container={true} rowSpacing={5} direction='row' sx={{}}>
              {venues.map((venue, index) => (
                <Grid key={index} size={4} display='flex' justifyContent='center' alignItems='center' sx={{}}>
                  <Item key={index} name={venue.Title} address={venue.Address} description={venue.Description} capacity={venue.Capacity} />
                </Grid>
              ))}
            </Grid> */}
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}