import React from 'react';
import Box from '@mui/material/Box';
import { Img } from 'react-image';
import { ButtonGroup, Button, TextField } from '@mui/material';


export default function Header() {
  return (
    <Box display="flex" component="header" sx={{ flexDirection: 'row' }}>
      <Img
        src={"/assets/logo.png"}
        alt="HParsons logo"
        style={{ 
          marginRight: 20, 
          width: 250,
          height: 'auto',
        }}
      />
      <Box sx={{ alignContent: 'center' }}>
        <ButtonGroup variant='text' size='large'>
          <Button>Home</Button>
          <Button>Arrange a Funeral</Button>
          <Button>Funeral Notices</Button>
          <Button>Our Locations</Button>
          <Button>Planning Ahead</Button>
          <Button>More</Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}
