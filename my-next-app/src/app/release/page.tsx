'use client';

import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SideMenu from '@/components/SideMenu';




const Release = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />

      <Box sx={{ 
        flexGrow: 1, 
        p: 3,
        height: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#f5f5f5'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 2,
            color: 'black'
          }}
        >
          Release Management
        </Typography>
        
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link 
            underline="hover" 
            color="inherit" 
            href="#" 
            sx={{ '&:hover': { cursor: 'pointer' } }}
          >
            Enterprise
          </Link>
          
        </Breadcrumbs>
        
        {/* Add the chart box */}
        <Box sx={{
          backgroundColor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          width: '800px',
          mt: 3
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>Upcoming Releases</Typography>
          <p>Show a list or schedule of upcoming releases with an approve/deny button in each row.</p>
        </Box>
        
      </Box>
    </Box>
  );
};

export default Release;