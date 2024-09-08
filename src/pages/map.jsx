import { Helmet } from 'react-helmet-async';

import { MapView } from 'src/sections/map/view/index';

// ----------------------------------------------------------------------

export default function MapPage() {
  return (
    <>
      <Helmet>
        <title> Map View | Num Ride </title>
      </Helmet>

      <MapView />
    </>
  );
}
