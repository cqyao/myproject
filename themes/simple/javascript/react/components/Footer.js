import { Button, ButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Img } from 'react-image';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React from 'react';


export default function Footer() {
  return(
    <Box sx={{ display: 'flex', bgcolor: "#E8F2FF", height: 'auto', width: "100%", justifyContent: 'space-evenly', padding: 5}} flexDirection="row">
      <Box className="item1" display='flex' flexDirection='column' sx={{ height: 'auto',  alignItems: 'center' }}>
        <Typography variant="h6" color="primary">
          ADDITIONAL INFORMATION
        </Typography>
        <ButtonGroup
          orientation='vertical'
          variant='text'
        >
          <Button>CULTURAL AND RELIGIOUS SERVICES</Button>
          <Button>OUR MORTUARY SERVICES</Button>
          <Button>OUR REFLECTION WALL</Button>
          <Button>LIFE STORY PRESENTATIONS</Button>
        </ButtonGroup>
      </Box>
      <Box className="item2" display='flex' flexDirection='column' sx={{ height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="primary">
          CONTACT INFORMATION
        </Typography>
        <ButtonGroup
          orientation='vertical'
          variant='text'
        >
          <Button size='small'>P: 02 4228 9622</Button>
          <Button size='small'>E: info@hparsons.com.au</Button>
          <Typography variant='body2' alignSelf='center' marginBottom={3} marginTop={3}>ABN: 44 000 470 977</Typography>
          <Button>PRIVACY POLICY</Button>
          <Button>TERMS OF USE</Button>

        </ButtonGroup>
      </Box>
      <Box className="item3" sx={{ display: 'flex' }} flexDirection='column'>
        <Img
          src={"/assets/announcement.png"}
          alt="A Funeral Announcement"
        />
        <Box className="socials" sx={{ display: 'flex', }} flexDirection="row">
          <ButtonGroup variant="text" sx={{ marginTop: 2, marginBottom: 5 }}>
            <Button><InstagramIcon/></Button>
            <Button><FacebookIcon/></Button>
            <Button><YouTubeIcon/></Button>
            <Button><LinkedInIcon/></Button>
          </ButtonGroup>
        </Box>
        <Button variant="contained">START ARRANGING NOW</Button>
      </Box>
    </Box>
  )
};