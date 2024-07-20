import { Helmet } from 'react-helmet-async';

import { UploadView } from 'src/sections/upload';

// ----------------------------------------------------------------------

export default function UploadPage() {
  return (
    <>
      <Helmet>
        <title> Upload | GateGaurd </title>
      </Helmet>

      <UploadView />
    </>
  );
}
