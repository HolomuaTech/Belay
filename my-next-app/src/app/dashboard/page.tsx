'use client';

import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SideMenu from '@/components/SideMenu';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Sample data for the pie chart
  const chartData = {
    labels: ['Criticals', 'Lows', 'Mediums'],
    datasets: [
      {
        data: [10, 100, 30],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
      },
    ],
  };

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
          Enterprise Dashboard
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
          width: '400px',
          mt: 3
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>Enterprise Wide Vulnerabilities</Typography>
          <Pie data={chartData} />
        </Box>
        
      </Box>
    </Box>
  );
};

export default Dashboard;