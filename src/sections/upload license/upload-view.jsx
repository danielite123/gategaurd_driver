import axios from 'axios';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function LoginView() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [licenseFiles, setLicenseFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDropProfile = useCallback((acceptedFiles) => {
    setLicenseFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps: getLicenseProps, getInputProps: getLicenseInputProps } = useDropzone({
    onDrop: onDropProfile,
  });

  const handleUpload = async () => {
    if (licenseFiles.length === 0) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', licenseFiles[0]);

    setUploading(true);
    try {
      const response = await axios.put('http://localhost:5000/driver/update-license', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust based on your auth strategy
        },
      });

      if (response.data.success) {
        toast.success('License updated successfully!');
        navigate('/');
      } else {
        toast.error('Failed to update License.');
      }
    } catch (error) {
      toast.error('An error occurred while uploading.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography
            sx={{
              mb: 4,
            }}
            variant="h5"
          >
            Upload License
          </Typography>

          <Box
            {...getLicenseProps()}
            sx={{
              border: '2px dashed #cccccc',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <input {...getLicenseInputProps()} />
            <Typography variant="body1">
              Drag or drop some files here, or click to select files
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {licenseFiles.map((file) => (
                <Grid item key={file.name}>
                  <Box
                    component="img"
                    src={file.preview}
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={uploading}
            sx={{ mt: 3 }}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Card>
      </Stack>
    </Box>
  );
}
