import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import MovieIcon from '@mui/icons-material/Movie';
import PeopleIcon from '@mui/icons-material/People';
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 220;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Movies', icon: <MovieIcon />, path: '/admin/movies' },
  { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f4f6f8' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#212b36',
            color: '#fff',
            transition: 'background 0.3s',
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ fontWeight: 700, letterSpacing: 1 }}>
            CineBee Admin
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                my: 1,
                borderRadius: 2,
                background: location.pathname === item.path ? 'rgba(255,255,255,0.08)' : 'none',
                transition: 'background 0.2s, transform 0.2s',
                '&:hover': {
                  background: 'rgba(255,255,255,0.15)',
                  transform: 'translateX(6px) scale(1.03)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem
            button
            sx={{
              mt: 4,
              borderRadius: 2,
              transition: 'background 0.2s, transform 0.2s',
              '&:hover': {
                background: 'rgba(255,255,255,0.15)',
                transform: 'translateX(6px) scale(1.03)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="static" color="inherit" elevation={0} sx={{ mb: 2, borderRadius: 2 }}>
          <Toolbar sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="body1" sx={{ mr: 2, fontWeight: 500 }}>
              Admin Name
            </Typography>
            <Avatar
              src="https://randomuser.me/api/portraits/men/32.jpg"
              sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3 } }}
              onClick={handleAvatarClick}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Fade in timeout={400}>
          <Box>{children}</Box>
        </Fade>
      </Box>
    </Box>
  );
}
