'use client';

import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SideMenu from '@/components/SideMenu';
import { Pie, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement
);

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

  // Updated time series data with two datasets
  const timeSeriesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Actual Releases',
        data: [12, 19, 15, 16, 8, 22],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Planned Releases',
        data: [15, 18, 14, 20, 12, 25],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        borderDash: [5, 5], // This creates a dashed line for planned releases
      },
    ],
  };

  // Add bar chart data
  const organizationData = {
    labels: ['Platform Ops', 'Dev Ops', 'Net Ops'],
    datasets: [
      {
        label: 'Number of Users',
        data: [2, 4, 2],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />

      <Box sx={{ 
        flexGrow: 1, 
        p: 3,
        height: '200vh', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: 'background.default'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 2,
            color: 'text.primary'
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
          backgroundColor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          width: '400px',
          mt: 3
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Enterprise Wide Vulnerabilities</Typography>
          <Pie data={chartData} />
        </Box>
        
        {/* Add the line chart box */}
        <Box sx={{
          backgroundColor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          width: '800px',
          mt: 3
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Releases over Time</Typography>
          <Line data={timeSeriesData} />
        </Box>
        
        {/* Add the bar chart box */}
        <Box sx={{
          backgroundColor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          width: '800px',
          mt: 3
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Authorized Users by Team</Typography>
          <Bar data={organizationData} />
        </Box>
        
      </Box>
    </Box>
  );
};

export default Dashboard;