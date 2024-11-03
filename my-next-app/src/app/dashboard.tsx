'use client';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// Add some icons for the drawer (you'll need to install @mui/icons-material)
import { Dashboard as DashboardIcon, 
         People as PeopleIcon, 
         Settings as SettingsIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

// Sample data
const rows = [
  { id: 1, Vulnerability: 'vulnerability 1', Severity: 'Severity 1', Info: 'Info 1' },
  { id: 2, Vulnerability: 'vulnerability 2', Severity: 'Severity 2', Info: 'Info 2' },
  { id: 3, Vulnerability: 'vulnerability 3', Severity: 'Severity 3', Info: 'Info 3' },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'Vulnerability', headerName: 'Vulnerability', width: 130 },
  { field: 'Severity', headerName: 'Severity', width: 130 },
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
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ height: 600, width: '95%' }}>  {/* Changed height from 400 to 600 and width from 80% to 95% */}
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