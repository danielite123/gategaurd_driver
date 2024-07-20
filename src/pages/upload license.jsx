import { Helmet } from 'react-helmet-async';

import { UploadView } from 'src/sections/upload license';

// ----------------------------------------------------------------------

export default function UploadLicensePage() {
  return (
    <>
      <Helmet>
        <title> Upload | GateGaurd </title>
      </Helmet>

      <UploadView />
    </>
  );
}
