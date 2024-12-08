import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Img } from 'react-image';
import { Chip, Typography, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import Carousel from 'react-multi-carousel';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
}

export default function Item({ name, address, postcode, description, capacity }) {
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [chips, setChips] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/api/images/getURL?param=${encodeURIComponent(name)}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setImages(response.data);
          setLoading(false)
        } else {
          console.error('Expected an array of images, but received: ', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching image data: ', error.message);
      });
  }, [name]);

  React.useEffect(() => {
    axios
      .get(`/api/chips/getChips?param=${encodeURIComponent(name)}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log(response.data)
          setChips(response.data);
        } else {
          console.error('Expected an array of chips but received: ', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching chip data: ', error.message);
      });
  }, [name]);

  React.useEffect(() => {
    //console.log(chips)
  })

  return (
    <Card variant='outlined' sx={{ width: 400, height: 'auto', borderRadius: 5, boxShadow: 1, paddingBottom: 3 }}>
      {/* Image carousel to display slideshow of venue images */}
      <Carousel responsive={responsive} infinite={true}>
        {images.map((image, index) => {
          if (loading) {
            return (
              <Box key={index} display='flex' sx={{width: '100%', height: 'auto', justifyContent: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 5}}>
                <CircularProgress />
              </Box>
            )
          } else {
            return (
              <Img
                key={index}
                src={`/assets/${image.Image_URL}`}
                alt={`${image.Venue_Name}`}
                // Image height is adaptable but preferably keep it consistent 
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                width={500}
                height={500}
              />
            )
          }
        })}
      </Carousel>
      <CardContent sx={{ padding: 3 }}>
        <Typography gutterBottom variant='h4'>
          {name}
        </Typography>

        <Typography variant='subtitle1' >
          <LocationOnIcon fontSize='10' sx={{ marginRight: 1 }} />
          {address},
        </Typography>
        <Typography gutterBottom variant='subtitle2' sx={{ marginBottom: 3 }}>
          {postcode}
        </Typography>
        {/* Provides easy-to-read and short details about this location */}
        <Box className="chips" sx={{ marginBottom: 2 }}>
          {Array.isArray(chips) && chips.map((chip, index) => (
            <Chip key={index} label={chip.Chip_Description} size="medium" sx={{ marginRight: 1, marginBottom: 1 }}/>
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
      <Divider variant="middle" />
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