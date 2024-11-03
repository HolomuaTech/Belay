'use client';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography, Breadcrumbs, Link } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// Add some icons for the drawer (you'll need to install @mui/icons-material)
import { BugReport as BugIcon, 
         People as PeopleIcon, 
         Settings as SettingsIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Sample data
const rows = [
  { id: 1, Vulnerability: 'vulnerability 1', Severity: 'Severity 1', EPSS: 'EPSS 1', Info: 'Info 1' },
  { id: 2, Vulnerability: 'vulnerability 2', Severity: 'Severity 2', EPSS: 'EPSS 2', Info: 'Info 2' },
  { id: 3, Vulnerability: 'vulnerability 3', Severity: 'Severity 3', EPSS: 'EPSS 3', Info: 'Info 3' },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'Vulnerability', headerName: 'Vulnerability', width: 130 },
  { field: 'Severity', headerName: 'Severity', width: 130 },
  { field: 'EPSS', headerName: 'EPSS', width: 130 },
  { field: 'Info', headerName: 'Info', width: 90 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <Box>
        <Button 
          variant="contained" 
          size="small" 
          sx={{ mr: 1 }}
          onClick={() => console.log('Whitelist clicked for row:', params.row.id)}
        >
          Whitelist
        </Button>
        <Button 
          variant="contained" 
          size="small"
          onClick={() => console.log('POAM clicked for row:', params.row.id)}
        >
          POAM
        </Button>
      </Box>
    ),
  },
];

const drawerWidth = 240;

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <List sx={{ marginTop: '64px' }}>
          <ListItemButton>
            <ListItemIcon>
              <BugIcon />
            </ListItemIcon>
            <ListItemText primary="Vulnerabilities" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Drawer>

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
          Vulnerability Management
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
            Project
          </Link>
          <Link 
            underline="hover" 
            color="inherit" 
            href="#" 
            sx={{ '&:hover': { cursor: 'pointer' } }}
          >
            Repository
          </Link>
          <Link 
            underline="hover" 
            color="inherit" 
            href="#" 
            sx={{ '&:hover': { cursor: 'pointer' } }}
          >
            main
          </Link>
        </Breadcrumbs>
        
        <div style={{ height: 600, width: '95%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{ backgroundColor: 'white' }}
          />
        </div>
      </Box>
    </Box>
  );
}