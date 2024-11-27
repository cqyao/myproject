import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Img } from 'react-image';
import { Chip, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import Box from '@mui/material/Box';

const labels = ["Outdoor TV", "4K display", "Modern", "Catered"]

export default function Item({ name, address, postcode, description, capacity, chips }) {
  return(
    <Card variant='outlined' sx={{ width: 400, height: 'auto', borderRadius: 5, boxShadow: 1, paddingBottom: 3 }}>
      <Img
        src={`/assets/${name}.webp`}
        alt="Wollongong venue"
        style={{
          width: '100%',
          height: 'auto',
        }}
        width={500}
        height={500}
      />
      <CardContent sx={{ padding: 3}}>
        <Typography gutterBottom variant='h4'>
          {name}
        </Typography>
        
        <Typography variant='subtitle1' >
          <LocationOnIcon fontSize='10' sx={{ marginRight: 1 }}/>
          {address}, 
        </Typography>
        <Typography gutterBottom variant='subtitle2' sx={{ marginBottom: 3 }}>
          {postcode}
        </Typography>
        {/* Provides easy-to-read and short details about this location */}
        <Box className="chips" sx={{ marginBottom: 2 }}>
          {chips.map((label, index) => (
            <Chip key={index} label={label} size="small" sx={{ marginRight: 1, marginBottom: 1 }}/>
          ))}
        </Box>
        <Typography
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 5,
          }}
          variant='body2'
          gutterBottom
          >
            {description}
          </Typography>
      </CardContent>
      <Divider variant="middle"/>
      <CardActions display='flex' sx={{ padding: 3, justifyContent: 'space-between' }}>
        <Typography variant='overline' display='flex' sx={{ alignItems: 'center' }}>
          <Groups2TwoToneIcon sx={{ marginRight: 1 }} />
          Up to {capacity} guests
        </Typography>
        <Button size="medium" variant="contained">Read more</Button>
      </CardActions>
    </Card>
  )
}