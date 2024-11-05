'use client';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography, Breadcrumbs, Link, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Switch, styled, Button, Tooltip } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SideMenu from '@/components/SideMenu';
import { useRef, useState, forwardRef } from 'react';



import { DataGrid, GridColDef } from '@mui/x-data-grid';

const TooltipButton = forwardRef<HTMLButtonElement, any>((props, ref) => (
  <Button {...props} ref={ref} />
));
TooltipButton.displayName = 'TooltipButton';

export default function Users() {
  const AuthSwitch = styled(Switch)(({ theme }) => ({
    width: 60,
    height: 24,
    padding: 5,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(4px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(30px)',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.success.main,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.error.main,
      borderRadius: 20,
    },
  }));

  const [rowData, setRowData] = useState([
    { id: 1, username: 'jsmith', firstName: 'John', lastName: 'Smith', deploy: 'Authorized' },
    { id: 2, username: 'mjohnson', firstName: 'Mary', lastName: 'Johnson', deploy: 'Unauthorized' },
    { id: 3, username: 'rwilliams', firstName: 'Robert', lastName: 'Williams', deploy: 'Authorized' },
    { id: 4, username: 'pbrown', firstName: 'Patricia', lastName: 'Brown', deploy: 'Unauthorized' },
    { id: 5, username: 'jdavis', firstName: 'James', lastName: 'Davis', deploy: 'Unauthorized' },
    { id: 6, username: 'jmiller', firstName: 'Jennifer', lastName: 'Miller', deploy: 'Authorized' },
    { id: 7, username: 'dwilson', firstName: 'David', lastName: 'Wilson', deploy: 'Unauthorized' },
  ]);

  const handleAuthChange = (id: number) => {
    setRowData(prevRows => 
      prevRows.map(row => 
        row.id === id 
          ? { ...row, deploy: row.deploy === 'Authorized' ? 'Unauthorized' : 'Authorized' }
          : row
      )
    );
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'User ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { 
      field: 'authorize', 
      headerName: 'Authorize', 
      width: 160,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <AuthSwitch 
              checked={params.row.deploy === 'Authorized'}
              onChange={() => handleAuthChange(params.row.id)}
            />
          }
          label={params.row.deploy === 'Authorized' ? 'On' : 'Off'}
          labelPlacement="end"
          sx={{
            ml: 0,
            '& .MuiFormControlLabel-label': {
              color: params.row.deploy === 'Authorized' ? 'success.main' : 'error.main',
              fontWeight: 'bold',
              fontSize: '0.875rem'
            }
          }}
        />
      ),
    },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 130,
      renderCell: (params) => (
        <Tooltip title="Delete this user">
          <Button 
            variant="contained" 
            size="small"
            sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}
            onClick={() => {
              console.log('Delete clicked for ID:', params.row.id);
            }}
          >
            Delete User
          </Button>
        </Tooltip>
      ),
    }
  ];

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
        backgroundColor: 'background.default'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 2,
            color: 'text.primary'
          }}
        >
          User Management
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
            Team
          </Link>
          <Link 
            underline="hover" 
            color="inherit" 
            href="#" 
            sx={{ '&:hover': { cursor: 'pointer' } }}
          >
            Repository
          </Link>
        </Breadcrumbs>
        
        <div style={{ height: 600, width: '95%' }}>
            <Box 
                sx={{ 
                    backgroundColor: 'background.paper',
                    p: 2,
                    mb: 2,
                    borderRadius: 1,
                    boxShadow: 1
                }}
            >
                <Typography 
                    variant="h6" 
                    sx={{ color: 'text.primary', mb: 2 }}
                >
                    Description:
                </Typography>
                <Typography 
                    variant="body1" 
                    sx={{ color: 'text.primary' }}
                >
                    Add, Remove or Change users ability to deploy to production.
                </Typography>
            </Box>
            <Box sx={{ 
                backgroundColor: 'background.paper',
                p: 2,
                borderRadius: 1,
                boxShadow: 1
            }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Button 
                        variant="contained" 
                        onClick={() => {
                            console.log('Add User clicked');
                        }}
                        sx={{ 
                            backgroundColor: 'black',
                            '&:hover': { backgroundColor: '#333' }
                        }}
                    >
                        + Add User
                    </Button>
                </Box>
                <DataGrid
                    rows={rowData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                    sx={{ 
                        backgroundColor: 'background.paper',
                        '& .MuiDataGrid-cell': {
                            color: 'text.primary'
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'background.paper',
                            color: 'text.primary'
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: 'background.paper',
                            color: 'text.primary'
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            backgroundColor: 'background.paper'
                        },
                        '& .MuiTablePagination-root': {
                            color: 'text.primary'
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'action.hover'
                        },
                        border: 'none'
                    }}
                />
            </Box>
        </div>
      </Box>
    </Box>
  );
}