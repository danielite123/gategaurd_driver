import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

import GeoapifyAutocomplete from './GeoapifyAutocomplete'; // Assuming it's in the same directory

const GEOAPIFY_API_KEY = import.meta.env.VITE_REACT_APP_GEOAPIFY_API_KEY;

function MyMapComponent({ center, setCenter, currentLocation, setCurrentLocation }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);

  return currentLocation ? <Marker position={currentLocation} /> : null;
}

export default function MapView(props) {
  const { sx, ...other } = props;
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef();
  const destinationRef = useRef();

  const handleOriginSelect = (place) => {
    originRef.current = place;
  };

  const handleDestinationSelect = (place) => {
    destinationRef.current = place;
  };

  async function calculateRoute() {
    if (!originRef.current || !destinationRef.current) {
      console.error('Origin or destination is empty');
      return;
    }

    const response = await fetch(
      `https://api.geoapify.com/v1/routing?waypoints=${originRef.current.geometry.coordinates.join(
        ','
      )}|${destinationRef.current.geometry.coordinates.join(
        ','
      )}&mode=drive&apiKey=${GEOAPIFY_API_KEY}`
    );

    const data = await response.json();

    if (response.ok) {
      const route = data.features[0];
      const distanceInKm = (route.properties.distance / 1000).toFixed(2);
      const durationInMinutes = (route.properties.time / 60).toFixed(2);

      setDistance(`${distanceInKm} km`);
      setDuration(`${durationInMinutes} mins`);
    } else {
      console.error('Error fetching directions:', data);
    }
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
              <MapContainer center={center} zoom={15} style={{ width: '100%', height: '500px' }}>
                <TileLayer
                  url={`https://maps.geoapify.com/v1/tile/osm/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`}
                />
                <MyMapComponent
                  center={center}
                  setCenter={setCenter}
                  currentLocation={currentLocation}
                  setCurrentLocation={setCurrentLocation}
                />
              </MapContainer>
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
              <GeoapifyAutocomplete onSelect={handleOriginSelect} />
              <GeoapifyAutocomplete onSelect={handleDestinationSelect} />
              <Button variant="contained" onClick={calculateRoute}>
                Calculate Route
              </Button>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Distance
                </Typography>

                <Label color="success">{distance}</Label>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Duration
                </Typography>

                <Label color="success">{duration}</Label>
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
