import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Box, CssBaseline, AppBar as MuiAppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, useMediaQuery } from '@mui/material';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Menu as MenuIcon, Home as HomeIcon, CameraAlt as CameraIcon, Assessment as ReportIcon, Gavel as GavelIcon, Info as InfoIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  background: 'linear-gradient(135deg, #3E2723 0%, #5D4037 100%)',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  background: 'linear-gradient(135deg, #3E2723 0%, #5D4037 100%)',
  color: '#D4AF37',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

const menuItems = [
  { text: 'Home', icon: <HomeIcon sx={{ color: '#D4AF37' }} />, path: '/' },
  { text: 'New Inspection', icon: <CameraIcon sx={{ color: '#D4AF37' }} />, path: '/new-inspection' },
  { text: 'Property Reports', icon: <ReportIcon sx={{ color: '#D4AF37' }} />, path: '/reports' },
  { text: 'Regulator View', icon: <GavelIcon sx={{ color: '#D4AF37' }} />, path: '/regulator' },
  { text: 'About', icon: <InfoIcon sx={{ color: '#D4AF37' }} />, path: '/about' },
];

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" noWrap component="div" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.5rem',
              letterSpacing: '0.5px'
            }}>
              SafeHaven AI
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#3E2723',
            color: '#D4AF37',
            borderRight: '1px solid rgba(212, 175, 55, 0.3)',
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: '#D4AF37' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                component="a" 
                href={item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderRight: '4px solid #D4AF37',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.05)',
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontFamily: '"Inter", sans-serif',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ p: isMobile ? 1 : 3 }}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
}
