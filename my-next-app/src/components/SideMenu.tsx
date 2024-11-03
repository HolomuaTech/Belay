'use client';
import { Drawer, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { 
  BackHand as BackHandIcon,
  Business as EnterpriseIcon,
  People as PeopleIcon, 
  Settings as SettingsIcon,
  BugReport as BugReportIcon
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

const drawerWidth = 240;

export default function SideMenu() {
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

  return (
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
        {menuItems.map((item) => (
          <ListItemButton 
            key={item.text}
            onClick={() => router.push(item.path)}
            selected={pathname === item.path}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
} 