/* eslint-disable */

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Button, Divider, IconButton } from '@mui/material';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Rating from '@mui/material/Rating';

// MUI icons
import MenuIcon from '@mui/icons-material/Menu';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';

import PropTypes from 'prop-types';

import { CentredFlex } from './Styles';
import { getListings } from '../Helpers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

SearchModal.propTypes = {
  listingsList: PropTypes.array,
  setListingsList: PropTypes.func,
}

export default function SearchModal ({ listingsList, setListingsList }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [search, setSearch] = React.useState('')
  const [price, setPrice] = React.useState([20, 37]);
  const [dates, setDates] = React.useState([null, null]);
  const [bedrooms, setBedrooms] = React.useState([20, 37]);
  const [rating, setRating] = React.useState(0);

  const handlePrice = (event, newValue) => {
    setPrice(newValue);
  };
  const handleBedrooms = (event, newValue) => {
    setBedrooms(newValue);
  };

  const SearchListing = async () => {
    const params = {
      search: search,
      price: price,
      dates: dates,
      bedrooms: bedrooms,
      rating: rating,
    }
    await setListingsList([]);
    await getListings (false, listingsList, setListingsList, params);
    handleClose();
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <MenuIcon/>
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              Additional Search options
            </Typography>
            <Divider/>
            <List>
              <ListItem>
                <TextField
                  id="outlined-basic"
                  label="Seach filter"
                  variant="outlined"
                  onChange={(e) => setSearch(e.target.value)}/>
              </ListItem>
              <ListItem>
                <Box sx={{ width: 250 }}>
                  <Typography gutterBottom>
                    Price
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <AttachMoneyIcon />
                    </Grid>
                    <Grid item xs>
                      <Slider
                        value={price}
                        onChange={handlePrice}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </ListItem>
              <ListItem>
                <Box sx={{ width: 250 }}>
                  <Typography gutterBottom>
                    Dates
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      startText="Check-in"
                      endText="Check-out"
                      value={dates}
                      onChange={(newValue) => {
                        setDates(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <TextField {...startProps} />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField {...endProps} />
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </ListItem>
              <ListItem>
                <Box sx={{ width: 250 }}>
                  <Typography gutterBottom>
                    Bedrooms
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <BedIcon />
                    </Grid>
                    <Grid item xs>
                      <Slider
                        value={bedrooms}
                        onChange={handleBedrooms}
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </ListItem>
              <ListItem>
                <Typography component="legend">Review Rating</Typography>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  precision={0.5}
                />
              </ListItem>
            </List>
            <CentredFlex>
              <Button variant="contained" onClick={SearchListing}>
                Search Listings
              </Button>
            </CentredFlex>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
