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

export default function Settings() {

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
          Settings
        </Typography>
        
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
                    Global settings.
                </Typography>
            </Box>
            <Box sx={{ 
                backgroundColor: 'background.paper',
                p: 2,
                borderRadius: 1,
                boxShadow: 1
            }}>
                <Typography 
                    variant="body1" 
                    sx={{ color: 'text.primary' }}
                >
                    SSO: Google, Okta, Azure<br />
                    Notifications: SMTP, Slack, Mattermost<br />
                    Approvals: Jira<br />
                    Logs: 
                </Typography>
            </Box>
        </div>
      </Box>
    </Box>
  );
}