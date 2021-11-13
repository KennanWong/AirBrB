
import React from 'react';

import { List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
// import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import PropTypes from 'prop-types';

Ammenities.propTypes = {
  isInput: PropTypes.bool,
  details: PropTypes.object,
  setDetails: PropTypes.func,
}

export default function Ammenities ({ isInput, details, setDetails }) {
  return (
    <div>
      <h4>Ammenities </h4>
      <List>
        {details.ammenities.map((value, index) => {
          return <Ammenitie isInput={isInput} content={value} key={index} index={index} details={details} setDetails={setDetails}/>
        })}
        {isInput
          ? <AddAmmenitie details={details} setDetails={setDetails}/>
          : <div></div>
        }
      </List>
    </div>
  )
}

Ammenitie.propTypes = {
  content: PropTypes.string,
  isInput: PropTypes.bool,
  index: PropTypes.number,
  details: PropTypes.object,
  setDetails: PropTypes.func,
}

function Ammenitie ({ content, isInput, index, details, setDetails }) {
  return (
    <div>
      {isInput
        ? <div>
          <ListItem
            secondaryAction={
              <IconButton
                onClick={() =>
                  RemoveFromList(index, details, setDetails)
                }
              >
                <DeleteIcon/>
              </IconButton>
            }
          >
            <ListItemIcon>
              <FiberManualRecordIcon fontSize='small'/>
            </ListItemIcon>
            <ListItemText primary={content}/>
          </ListItem>
        </div>
        : <div>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon fontSize='small'/>
            </ListItemIcon>
            <ListItemText primary={content}/>
          </ListItem>
        </div>
        }
    </div>
  )
}

AddAmmenitie.propTypes = {
  details: PropTypes.object,
  setDetails: PropTypes.func,
}

function AddAmmenitie ({ details, setDetails }) {
  const [value, setValue] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  return (
    <ListItem
      secondaryAction={
        <IconButton
          onClick={() => {
            if (value === '') {
              setHasError(true);
            } else {
              AddToList(value, setValue, details, setDetails);
            }
          }}
        >
          <CheckIcon/>
        </IconButton>
    }
    >
      {!hasError
        ? <TextField
          size="small"
          label="Add Ammenitie"
          type="text"
          variant="standard"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        : <TextField
          size="small"
          label="Add Ammenitie"
          type="text"
          variant="standard"
          value={value}
          error
          onChange={(e) => {
            setValue(e.target.value);
            setHasError(false);
          }}
          helperText="Please enter an ammenitie."
        />
      }
    </ListItem>
  )
}

const RemoveFromList = (key, details, setDetails) => {
  const list = details.ammenities;
  list.splice(key, key + 1);
  setDetails({ ...details, ammenities: list });
}

const AddToList = (value, setValue, details, setDetails) => {
  const list = details.ammenities;
  list.push(value);
  setDetails({ ...details, ammenities: list });
  setValue('');
}
