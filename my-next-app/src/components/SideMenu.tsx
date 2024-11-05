'use client';
import { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, styled } from '@mui/material';
import { 
  BackHand as BackHandIcon,
  Business as EnterpriseIcon,
  People as PeopleIcon, 
  Settings as SettingsIcon,
  BugReport as BugReportIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SideMenu = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      text: 'Enterprise Dashboard',
      icon: <EnterpriseIcon />,
      path: '/dashboard'
    },
    {
      text: 'Vulnerability Management',
      icon: <BugReportIcon />,
      path: '/vulnerability'
    },
    {
        text: 'Release Management',
        icon: <BackHandIcon />,
        path: '/release'
    },
    {
      text: 'Users',
      icon: <PeopleIcon />,
      path: '/users'
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings'
    }
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 200 : 65,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 200 : 65,
          boxSizing: 'border-box',
          transition: 'width 0.2s',
          overflowX: 'hidden'
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>

      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            href={item.path}
            sx={{ 
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu; 