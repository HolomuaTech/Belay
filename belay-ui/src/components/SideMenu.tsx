'use client';
import { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, styled, Box, FormControlLabel, Switch } from '@mui/material';
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
import { useTheme } from './ThemeContext';
import Image from 'next/image';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DarkModeSwitch = styled(Switch)(({ theme }) => ({
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
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    borderRadius: 20,
  },
}));

const SideMenu = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { darkMode, toggleDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const renderDarkModeSwitch = () => {
    if (!mounted) return null;

    return (
      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}>
        <FormControlLabel
          control={
            <DarkModeSwitch 
              checked={darkMode}
              onChange={toggleDarkMode}
            />
          }
          label="Dark Mode"
          labelPlacement="end"
          sx={{
            ml: 0,
            '& .MuiFormControlLabel-label': {
              fontWeight: 'bold',
              fontSize: '0.875rem'
            }
          }}
        />
      </Box>
    );
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
      <Box sx={{ 
        display: 'flex', 
        flexDirection: open ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: open ? 'space-between' : 'center',
        pt: 2,
        pb: 1,
        px: 1
      }}>
        <Image
          src="/images/belay_logo4.png"
          alt="Belay Logo"
          width={open ? 150 : 40}
          height={90}
          style={{ objectFit: 'contain' }}
        />
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
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
        </Box>
        
        {renderDarkModeSwitch()}
      </Box>
    </Drawer>
  );
};

export default SideMenu; 