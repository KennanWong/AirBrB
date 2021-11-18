import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
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
import { getListingDetails, getListings } from '../Helpers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #242424',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

SearchModal.propTypes = {
  listingsList: PropTypes.array,
  setListingsList: PropTypes.func,
}

const getMinMax = async (listingsList, param) => {
  if (listingsList.length === 0) {
    return {
      min: 0,
      max: 100,
    };
  }
  let details;
  let min;
  let max;
  if (param === 'price') {
    min = listingsList[0].price;
    max = min;
  } else if (param === 'bedrooms') {
    details = await getListingDetails(listingsList[0].id, null, null);
    min = details.metadata.bedroomsList.length;
    max = min;
  }

  for (let i = 1; i < listingsList.length; i++) {
    let val;
    if (param === 'price') {
      val = listingsList[i].price;
    } else if (param === 'bedrooms') {
      details = await getListingDetails(listingsList[i].id, null, null);
      val = details.metadata.bedroomsList.length;
    }
    if (min > val) {
      min = val;
    }
    if (max < val) {
      max = val;
    }
  }

  if (min === max) {
    min = 0;
  }
  return {
    min: min,
    max: max,
  };
}

export default function SearchModal ({ setListingsList }) {
  const [listingsList, setListings] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
    setBounds();
  };
  const handleClose = () => setOpen(false);

  const [priceBounds, setPriceBounds] = React.useState({
    min: 0,
    max: 100,
  });

  const [bedroomsBounds, setBedroomsBounds] = React.useState({
    min: 0,
    max: 100,
  });

  React.useEffect(async () => {
    await getListings(false, listingsList, setListings, null);
  }, []);

  const [search, setSearch] = React.useState('')
  const [price, setPrice] = React.useState([0, 1000000000000]);
  const [dates, setDates] = React.useState([null, null]);
  const [bedrooms, setBedrooms] = React.useState([0, 1000000000]);
  const [rating, setRating] = React.useState(0);

  const handlePrice = (event, newValue) => {
    setPrice(newValue);
  };
  const handleBedrooms = (event, newValue) => {
    setBedrooms(newValue);
  };

  const setBounds = async () => {
    const tmpPrice = await getMinMax(listingsList, 'price');
    const tmpBeds = await getMinMax(listingsList, 'bedrooms');

    setPriceBounds(tmpPrice);
    setBedroomsBounds(tmpBeds);
    // if (price === [0, 100]) {
    //   console.log('found default filter settings');
    //   setPrice([Number(tmpPrice.min), Number(tmpPrice.max)]);
    // }
    // if (bedrooms === [0, 100]) {
    //   setBedrooms([Number(tmpBeds.min), Number(tmpBeds.max)]);
    // }
  }

  const SearchListing = async () => {
    const params = {
      search: search,
      price: price,
      dates: dates,
      bedrooms: bedrooms,
      rating: rating,
    }
    await setListingsList([]);
    await getListings(false, listingsList, setListingsList, params);
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
                        min={Number(priceBounds.min)}
                        max={Number(priceBounds.max)}
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
                        min={Number(bedroomsBounds.min)}
                        max={Number(bedroomsBounds.max)}
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
