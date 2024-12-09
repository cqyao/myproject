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
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

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
          setChips(response.data);
        } else {
          console.error('Expected an array of chips but received: ', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching chip data: ', error.message);
      });
  }, [name]);

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    return <Button
      onClick={() => onClick()}
      sx={{
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'white',
        minWidth: 60,
        height: 60,
        borderRadius: '50%',
        // Show feedback when user hovers over the arrow keys. May help to increase visibility on white images as well
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <ArrowCircleRightIcon />
    </Button>;
  };

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    return <Button
      onClick={() => onClick()}
      sx={{
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'white',
        minWidth: 60,
        height: 60,
        borderRadius: '50%',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <ArrowCircleLeftIcon size={20} />
    </Button>;
  };

  return (
    <Card variant='outlined' sx={{ width: 400, height: 'auto', borderRadius: 5, boxShadow: 1, paddingBottom: 3 }}>
      {/* Image carousel to display slideshow of venue images */}
      <Carousel
        responsive={responsive}
        infinite={true}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
      >
        {images.map((image, index) => {
          // Currently the images load fast enough to not show this loading spinner but it may be useful in production
          if (loading) {
            return (
              <Box key={index} display='flex' sx={{ width: '100%', height: 'auto', justifyContent: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 5 }}>
                <CircularProgress />
              </Box>
            )
          } else {
            return (
              // Couldn't use Next image so had to use React's Img instead.
              <Img
                key={index}
                src={`/assets/${image.Image_URL}`}
                alt={`${image.Venue_Name}`}
                // Image height is adaptable but it might be better to keep it consistent so that heights aren't different among venue cards.
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
            <Chip key={index} label={chip.Chip_Description} size="medium" sx={{ marginRight: 1, marginBottom: 1 }} />
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