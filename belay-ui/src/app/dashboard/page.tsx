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

  const leadTimeData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Lead Time (hours)',
      data: [24, 18, 32, 16],
      borderColor: 'rgb(153, 102, 255)',
      tension: 0.1,
    }]
  };

  const mttrData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'MTTR (hours)',
      data: [4.5, 3.2, 2.8, 2.1, 1.9],
      borderColor: 'rgb(255, 159, 64)',
      tension: 0.1,
    }]
  };

  const changeFailureData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Change Failure Rate (%)',
      data: [15, 12, 8, 7],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
    }]
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
        alignItems: 'stretch',
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
        
        {/* Grid container for charts */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 3,
          width: '100%',
        }}>
          {/* Pie chart */}
          <Box sx={{
            backgroundColor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
              Enterprise Wide Vulnerabilities
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
            </Box>
          </Box>

          <Box sx={{
            backgroundColor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            minHeight: '400px',
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Lead Time for Changes</Typography>
            <Line data={leadTimeData} options={{ responsive: true }} />
          </Box>

          <Box sx={{
            backgroundColor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            minHeight: '400px',
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Mean Time to Recovery</Typography>
            <Line data={mttrData} options={{ responsive: true }} />
          </Box>

          <Box sx={{
            backgroundColor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            minHeight: '400px',
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Change Failure Rate</Typography>
            <Bar data={changeFailureData} options={{ responsive: true }} />
          </Box>
          
          {/* Line chart - spans 2 columns when space allows */}
          <Box sx={{
            backgroundColor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            minHeight: '400px',
            gridColumn: { md: 'span 2' }
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Releases over Time</Typography>
            <Line data={timeSeriesData} />
          </Box>
          
          {/* Bar chart - spans 2 columns when space allows */}
          <Box sx={{
            backgroundColor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            minHeight: '400px',
            gridColumn: { md: 'span 2' }
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Authorized Users by Team</Typography>
            <Bar data={organizationData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;