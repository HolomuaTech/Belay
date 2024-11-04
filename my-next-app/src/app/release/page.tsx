'use client';

import { Box, Typography, Breadcrumbs, Link, Modal, TextField, Select, MenuItem, FormControl, InputLabel, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SideMenu from '@/components/SideMenu';
import { useState } from 'react';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Release = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample events
  const events = [
    {
      title: 'Release 1.0',
      start: new Date(2024, 10, 7),
      end: new Date(2024, 10, 7),
    },
    {
      title: 'Release 1.1',
      start: new Date(2024, 10, 14),
      end: new Date(2024, 10, 14),
    },
    {
      title: 'Release 1.2',
      start: new Date(2024, 10, 21),
      end: new Date(2024, 10, 21),
    },
    {
      title: 'Release 2.0',
      start: new Date(2024, 10, 28),  // Note: Month is 10 for November (0-based)
      end: new Date(2024, 10, 28),
    },
  ];

  // Add sample attendees
  const attendees = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Bob Wilson', email: 'bob@example.com' },
  ];

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
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
          Release Management
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
        
        <Box sx={{
          backgroundColor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          width: '90%',
          mt: 3,
          height: '600px'  // Added fixed height for the calendar
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>Upcoming Releases</Typography>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '500px' }}
            onSelectEvent={handleEventClick}
          />
        </Box>

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="event-modal-title"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
            <Typography id="event-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              {selectedEvent?.title}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Date: {selectedEvent?.start.toLocaleDateString()}
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Start Time</InputLabel>
              <Select
                value="09:00"
                label="Start Time"
              >
                {[...Array(24)].map((_, i) => (
                  <MenuItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                    {`${i.toString().padStart(2, '0')}:00`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>End Time</InputLabel>
              <Select
                value="17:00"
                label="End Time"
              >
                {[...Array(24)].map((_, i) => (
                  <MenuItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                    {`${i.toString().padStart(2, '0')}:00`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Details"
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle1" sx={{ mb: 1 }}>Attendees:</Typography>
            <FormGroup sx={{ mb: 2 }}>
              {attendees.map((attendee) => (
                <FormControlLabel
                  key={attendee.email}
                  control={<Checkbox />}
                  label={`${attendee.name} (${attendee.email})`}
                />
              ))}
            </FormGroup>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleCloseModal}
                sx={{ ml: 2 }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Release;