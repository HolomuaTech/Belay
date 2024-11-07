'use client';

import { Box, Typography, Breadcrumbs, Link, Modal, TextField, Select, MenuItem, FormControl, InputLabel, Button, Checkbox, FormGroup, Badge } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SideMenu from '@/components/SideMenu';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const Release = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());

  const CustomToolbar = (toolbar: any) => {
    return (
      <div className="rbc-toolbar" style={{ zIndex: 1000 }}>
        <span className="rbc-btn-group">
          <button type="button" onClick={() => toolbar.onNavigate('PREV')}>Back</button>
          <button type="button" onClick={() => toolbar.onNavigate('TODAY')}>Today</button>
          <button type="button" onClick={() => toolbar.onNavigate('NEXT')}>Next</button>
        </span>
        <span className="rbc-toolbar-label">{toolbar.label}</span>
        <span className="rbc-btn-group">
          {toolbar.views.map((view: string) => (
            <button
              key={view}
              type="button"
              onClick={() => toolbar.onView(view)}
              className={view === toolbar.view ? 'rbc-active' : ''}
            >
              {view}
            </button>
          ))}
        </span>
      </div>
    );
  };

  // Sample events
  const events = [
    {
      title: 'Release 1.0',
      start: new Date(2024, 10, 7, 9, 0),
      end: new Date(2024, 10, 7, 13, 0),
      details: 'Major platform upgrade including new UI components and performance improvements',
      startTime: '09:00',
      endTime: '13:00',
      assignedTeam: 'Platform Team',
      priority: 'High',
      status: 'Scheduled'
    },
    {
      title: 'Release 1.1',
      start: new Date(2024, 10, 14, 14, 0),
      end: new Date(2024, 10, 14, 17, 0),
      details: 'Security patches and bug fixes for reported issues',
      startTime: '14:00',
      endTime: '17:00',
      assignedTeam: 'Security Team',
      priority: 'Critical',
      status: 'Planning'
    },
    {
      title: 'Release 1.2',
      start: new Date(2024, 10, 21, 10, 0),
      end: new Date(2024, 10, 21, 15, 0),
      details: 'Feature updates for analytics dashboard and reporting tools',
      startTime: '10:00',
      endTime: '15:00',
      assignedTeam: 'Analytics Team',
      priority: 'Medium',
      status: 'In Review'
    },
    {
      title: 'Release 2.0',
      start: new Date(2024, 10, 28, 8, 0),
      end: new Date(2024, 10, 28, 16, 0),
      details: 'Major version release with new API endpoints and database migration',
      startTime: '08:00',
      endTime: '16:00',
      assignedTeam: 'Core Team',
      priority: 'High',
      status: 'Draft'
    },
  ];

  // Add sample attendees
  const attendees = [
    { 
      name: 'John Doe', 
      isAuthorized: true,
      checked: false
    },
    { 
      name: 'Jane Smith', 
      checked: false 
    },
    { 
      name: 'Bob Wilson', 
      checked: false 
    },
  ];

  // Initialize checkedAttendees state separately
  const [checkedAttendees, setCheckedAttendees] = useState(attendees);

  const handleEventClick = (event: any) => {
    // Pre-prepare the attendees data
    const updatedAttendees = attendees.map(a => ({
      ...a,
      checked: false
    }));
    
    // Set both states at once
    setCheckedAttendees(updatedAttendees);
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    setCheckedAttendees(prev => prev.map((attendee, i) => 
      i === index ? { ...attendee, checked } : attendee
    ));
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
        backgroundColor: 'background.default'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 2,
            color: 'text.primary'
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
          <Link 
            underline="hover" 
            color="inherit" 
            href="#" 
            sx={{ '&:hover': { cursor: 'pointer' } }}
          >
            Team
          </Link>
        </Breadcrumbs>
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
                A calendar of scheduled releases.  Click on the event to view release/change management details.  To add approved users that can release, click on the "Users" menu item.
            </Typography>
        </Box>
        <Box sx={{
          backgroundColor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          width: '100%',
          mt: 3,
          height: '600px'  // Added fixed height for the calendar
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Upcoming Releases</Typography>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ 
              height: '500px',
              color: 'text.primary'
            }}
            onSelectEvent={handleEventClick}
            views={['month', 'week', 'day', 'agenda']}
            view={view}
            date={date}
            onNavigate={(newDate) => {
              setDate(newDate);
            }}
            onView={(newView) => {
              setView(newView);
            }}
            selectable={true}
            popup={true}
            components={{
              toolbar: CustomToolbar
            }}
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
            backgroundColor: 'background.paper',
          }}>
            <Typography id="event-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              {selectedEvent?.title}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Date: {selectedEvent?.start.toLocaleDateString()}
              <br />
              Maintenance Window:
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
              value={selectedEvent?.details || ''}
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle1" sx={{ mb: 1 }}>Attendees:</Typography>
            <FormGroup sx={{ mb: 2 }}>
              {checkedAttendees.map((attendee, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  width: '90%'
                }}>
                  <Checkbox
                    checked={attendee.checked}
                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                  />
                  <Typography sx={{ flexGrow: 1 }}>{attendee.name}</Typography>
                  {attendee.isAuthorized && (
                    <Badge 
                      badgeContent="Authorized" 
                      color="primary"
                      sx={{ marginLeft: 'auto' }}
                    />
                  )}
                </div>
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