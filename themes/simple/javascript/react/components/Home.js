import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Item from './Item';
import Header from './Header';
import Footer from './Footer';
import Filter from './Filter';
import axios from 'axios';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [capacity, setCapacity] = useState(80);
  const [venues, setVenues] = useState([]);
  const [sort, setSort] = React.useState('name-asc');


  useEffect(() => {
    axios
      .get('/api/venues/getVenue')
      .then((response) => {
        // Check if the response data is an array before setting it
        if (Array.isArray(response.data)) {
          console.log(response.data)
          setVenues(response.data);
        } else {
          console.error('Expected an array, but received:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching venue data: ', error.message);
      });
  }, []);

  const filteredVenues = venues
    .filter((venue) =>
      (venue.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.Address.toLowerCase().includes(searchQuery.toLowerCase())) &&
      venue.Capacity >= capacity
    )
    .sort((a, b) => {
      if (sort === "capacity-desc") return b.Capacity - a.Capacity;
      if (sort === "capacity-asc") return a.Capacity - b.Capacity;
      if (sort === "name-asc") return a.Title.localeCompare(b.Title);
      if (sort === "name-desc") return b.Title.localeCompare(a.Title);
      return 0;
  });

  return (
    <Box>
      <Box sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center', minHeight: '100svh', padding: '70px', gap: '64px', bgcolor: '#FFFCF9', height: 'auto' }}>
        <Header />
        <Box className="display-all" sx={{ width: '100%' }} display="flex" flexDirection="column">
          <Filter setCapacity={setCapacity} setSearch={setSearchQuery} setVenues={setVenues} sortBy={setSort} sort={sort}/>
          <Box className="items" sx={{ height: 'auto', width: '100%' }}>
            <Grid container={true} rowSpacing={5} direction="row">
              {Array.isArray(filteredVenues) && filteredVenues.map((venue, index) => (
                <Grid key={index} size={4} display="flex" justifyContent="center" alignItems="center">
                  <Item
                    name={venue.Title}
                    address={venue.Address}
                    postcode={venue.Postcode}
                    description={venue.Description}
                    capacity={venue.Capacity}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
