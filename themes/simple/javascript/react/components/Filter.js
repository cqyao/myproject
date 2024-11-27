import * as React from 'react';
import Box from '@mui/material/Box';
import { ButtonGroup, Button, TextField, Typography, FormGroup, FormControlLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider'
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';

const checkedRegions = []

export default function Filter({ setCapacity, setSearch }) {
  const [sort, setSort] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(80);
  const handleSlider = (_, newValue) => {
    setValue(newValue);
    setCapacity(newValue);
  };
  const [ state, setState ] = React.useState({
    wollongong: false,
    shellharbour: false,
    shoalhaven: false,
    kiama: false,
  })
  const { wollongong, shellharbour, shoalhaven, kiama } = state;

  // For opening filter popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // For closing filter popover. Note: clicking outside of popover closes it
  const handleClose = () => {
    setAnchorEl(null);
  };

  // For clearing all filters
  const handleClear = () => {
    setValue(80);
    setCapacity(80);
  }

  // For checkboxes
  const handleChange = (event, region) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    if (checkedRegions.includes(event.target.name)) {
      const index = checkedRegions.indexOf(event.target.name);
      checkedRegions.splice(index, 1)
    } else {
      checkedRegions.push(event.target.name)
    }
    console.log(checkedRegions)
  }

  const open = Boolean(anchorEl);
  return (
    <Box className="filters" sx={{ display: 'flex', height: 100, width: '100%', padding: 2, gap: 2, paddingLeft: 12 }} flexDirection="row">
      {/* Search bar */}
      <TextField
        id="search-bar"
        label="Search..."
        variant="outlined"
        size="small"
        onInput={(e) => {
          setSearch(e.target.value);
        }}
        sx={{ position: 'absolute', right: '0', paddingRight: 20 }}
      />
      <Button
        id="filterButton"
        onClick={handleClick}
        variant="outlined"
        sx={{
          width: 200,
          height: 35,
          gap: 2,
        }}
      >
        <TuneIcon />
        Filter by
      </Button>
      {/* Modal for the filters */}
      <Popover
        id="filter-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ marginTop: 1, borderRadius: 2, width: 1000, paddingLeft: 5, paddingRight: 5, paddingBottom: 8 }}>
          <Typography variant='subtitle2' sx={{ marginBottom: 2 }}>Filters</Typography>
          <Divider sx={{ marginBottom: 1 }} />
          <Box className="actions" sx={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <Box className="sliders" display='flex' flexDirection='column' width='25%'>
              <Typography variant='subtitle1'>Capacity</Typography>
              <Slider
                aria-label="Capacity"
                defaultValue={80}
                shiftStep={20}
                step={20}
                min={0}
                max={300}
                onChange={handleSlider}
                size="small"
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  variant="body2"
                >0</Typography>
                <Typography
                  variant="body2"
                >{value}</Typography>
              </Box>
            </Box>
            <Box className="locations">
              <Typography variant='subtitle1'>Region</Typography>
              <FormGroup row={true}>
                <FormControlLabel control={<Checkbox checked={wollongong} onChange={handleChange}/>} name="wollongong" label={<Typography variant='overline'>Wollongong</Typography>} />
                <FormControlLabel control={<Checkbox checked={kiama} onChange={handleChange}/>} name="kiama" label={<Typography variant='overline'>Kiama</Typography>} />
                <FormControlLabel control={<Checkbox checked={shellharbour} onChange={handleChange}/>} name="shellharbour" label={<Typography variant='overline'>Shellharbour</Typography>} />
                <FormControlLabel control={<Checkbox checked={shoalhaven} onChange={handleChange}/>} name="shoalhaven" label={<Typography variant='overline'>Shoalhaven</Typography>} />
              </FormGroup>
            </Box>
          </Box>
          <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
          <Button variant='contained' sx={{ position: 'absolute', right: '0', marginRight: 5 }} onClick={handleClose}>Show results</Button>
          <Button variant='text' onClick={handleClear}>Clear all</Button>
        </Box>
      </Popover>
      <Select
        labelId='sortSelect-label'
        id='sortSelect'
        value={sort}
        label="Sort by"
        sx={{
          width: 150,
          height: 35,
          gap: 1
        }}
      >
        <MenuItem value={1}>Reviews</MenuItem>
        <MenuItem value={2}>Capacity</MenuItem>
        <MenuItem value={3}>Recommended</MenuItem>
      </Select>
    </Box>
  )
}