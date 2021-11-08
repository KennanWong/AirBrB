/* eslint-disable */

import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Listing ({ details }) {
  console.log('Details: ', details);
  const navigate = useNavigate();
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => navigate(`/listing/${details.id}`)}>
          { (details.thumbnail !== '')
            ? <CardMedia
                component="img"
                height="140"
                src={details.thumbnail}
                alt={details.title}
              />
            : <CardMedia
                component="img"
                height="140"
                image={".../Images/home-icon.png"}
                alt={details.title}
              />
          }
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {details.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
