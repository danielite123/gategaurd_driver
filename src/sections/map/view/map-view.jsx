/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import { Skeleton } from '@chakra-ui/react';
import React, { useRef, useState, useEffect } from 'react';
import {
  Marker,
  GoogleMap,
  Autocomplete,
  useJsApiLoader,
  DirectionsRenderer,
} from '@react-google-maps/api';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function MapView(props) {
  const { sx, ...other } = props;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ['places'],
  });
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef();

  const destinationRef = useRef();

  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) {
      console.error('Origin or destination is empty');
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { query: originRef.current.value },
        destination: { query: destinationRef.current.value },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionResponse(result);
          setDistance(result.routes[0].legs[0].distance.text);
          setDuration(result.routes[0].legs[0].duration.text);
        } else {
          console.error('Directions request failed due to ');
        }
      }
    );
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  }, []);

  if (loadError) {
    console.error('Error loading Google Maps API:', loadError);
    return <div>Error loading map. Please try again later.</div>;
  }

  if (!isLoaded) {
    console.log('Google Maps API is not loaded yet...');
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    ); // Or any other loading indicator
  }
  return (
    <Container
      sx={{
        minHeight: 1,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container rowSpacing={{ xs: 5, md: 0 }} columnSpacing={{ xs: 0, md: 5 }}>
        <Grid xs={12} md={8}>
          <Box
            gap={5}
            display="grid"
            sx={{
              borderRadius: 2,
              border: (theme) => ({
                md: `dashed 1px ${theme.palette.divider}`,
              }),
            }}
          >
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: 'background.neutral',
                ...sx,
              }}
              {...other}
            >
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '500px' }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                {currentLocation && <Marker position={currentLocation} />}
                {directionResponse && <DirectionsRenderer directions={directionResponse} />}
              </GoogleMap>
            </Box>
          </Box>
        </Grid>

        <Grid
          xs={12}
          md={4}
          sx={{
            p: { md: 2 },
            borderRadius: 2,
            border: (theme) => ({
              md: `dashed 1px ${theme.palette.divider}`,
            }),
          }}
        >
          <div>
            <Typography variant="h6">Destination</Typography>

            <Stack spacing={3} mt={5}>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  From
                </Typography>

                <Label color="success">Gidan Kwano</Label>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  To
                </Typography>

                <Label color="success">Bosso</Label>
              </Stack>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Distance
                </Typography>

                <Label color="success">ikm</Label>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Duration
                </Typography>

                <Label color="success">2hrs</Label>
              </Stack>

              <Divider sx={{ borderStyle: 'dashed' }} />
            </Stack>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

MapView.propTypes = {
  sx: PropTypes.object,
};
