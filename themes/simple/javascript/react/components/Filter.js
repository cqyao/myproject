import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, FormGroup, FormControlLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider'
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';

export default function Filter({ setCapacity, setSearch, sortBy, sort, setCheckedRegions }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(80);
  const [state, setState] = React.useState({
    wollongong: false,
    shellharbour: false,
    shoalhaven: false,
    kiama: false,
    southcoast: false,
  })
  const { wollongong, shellharbour, shoalhaven, kiama, southcoast } = state;

  const handleSlider = (_, newValue) => {
    setValue(newValue);
    setCapacity(newValue);
  };

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
    setCheckedRegions([]);
    setState({
      wollongong: false,
      shellharbour: false,
      shoalhaven: false,
      kiama: false,
      southcoase: false,
    });
  };

  // For sorting
  const handleSort = (event) => {
    const value = event.target.value;
    sortBy(value);
  };

  // For checkboxes
  const handleChange = (event) => {
    const { name, checked } = event.target;

    setState({
      ...state,
      [name]: checked,
    });

    setCheckedRegions((prevRegions) =>
      checked
        ? [...prevRegions, name]
        : prevRegions.filter((region) => region !== name)
    );
  };

  const open = Boolean(anchorEl);
  return (
    <Box className="filters" sx={{ display: 'flex', height: 100, width: '100%', padding: 2, gap: 2, paddingLeft: 12, alignItems: 'center' }} flexDirection="row">

      {/* Search bar */}
      <TextField
        id="search-bar"
        label="Search..."
        variant="outlined"
        size="small"
        onInput={(e) => {
          setSearch(e.target.value);
        }}
        sx={{ position: 'absolute', right: '0', paddingRight: 20, }}
      />

      {/* Filter By button */}
      <Button
        id="filterButton"
        onClick={handleClick}
        variant="outlined"
        sx={{
          width: 200,
          height: 35,
          gap: 2,
          borderRadius: 2,
        }}
      >
        <TuneIcon />
        Filter by
      </Button>

      {/* Sort By button */}
      <Box display='flex' sx={{ width: 'auto', height: 35, alignItems: 'center', border: 1, borderColor: 'grey', borderRadius: 2, gap: 1, paddingLeft: 2 }} flexDirection='row'>
        <SortIcon />
        <Typography>Sort By</Typography>
        <Select
          labelId='sortSelect-label'
          id='sortSelect'
          value={sort}
          label="Sort by"
          sx={{
            width: 200,
            height: 35,
            gap: 1,
            border: 0
          }}
          onChange={handleSort}
        >
          <MenuItem value="capacity-desc">Capacity, high to low</MenuItem>
          <MenuItem value="capacity-asc">Capacity, low to high</MenuItem>
          <MenuItem value="name-asc">Name, A to Z</MenuItem>
          <MenuItem value="name-desc">Name, Z to A</MenuItem>
        </Select>
      </Box>

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
                max={200}
                onChange={handleSlider}
                size="small"
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  variant="body2"
                >0</Typography>
                <Typography
                  variant="body2"
                >-</Typography>
                <Typography
                  variant="body2"
                >{value}</Typography>
              </Box>
            </Box>
            <Box className="locations">
              <Typography variant='subtitle1'>Region</Typography>
              <FormGroup row={true}>
                <FormControlLabel control={<Checkbox checked={wollongong} onChange={handleChange} />} name="wollongong" label={<Typography variant='overline'>Wollongong</Typography>} />
                <FormControlLabel control={<Checkbox checked={kiama} onChange={handleChange} />} name="kiama" label={<Typography variant='overline'>Kiama</Typography>} />
                <FormControlLabel control={<Checkbox checked={shellharbour} onChange={handleChange} />} name="shellharbour" label={<Typography variant='overline'>Shellharbour</Typography>} />
                <FormControlLabel control={<Checkbox checked={shoalhaven} onChange={handleChange} />} name="shoalhaven" label={<Typography variant='overline'>Shoalhaven</Typography>} />
                <FormControlLabel control={<Checkbox checked={southcoast} onChange={handleChange} />} name="southcoast" label={<Typography variant='overline'>South Coast</Typography>} />
              </FormGroup>
            </Box>
          </Box>
          <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
          <Button variant='contained' sx={{ position: 'absolute', right: '0', marginRight: 5 }} onClick={handleClose}>Show results</Button>
          <Button variant='text' onClick={handleClear}>Clear all</Button>
        </Box>
      </Popover>
      {/* End modal */}
    </Box>
  )
}