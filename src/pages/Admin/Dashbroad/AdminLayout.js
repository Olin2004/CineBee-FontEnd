import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import { AppBar, Avatar, Box, Fade, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const drawerWidth = 220;

const menuGroups = [
  {
    label: 'QUẢN LÝ',
    items: [
      { text: 'Sản Phẩm', icon: <CategoryIcon />, path: '/admin/products' },
      { text: 'Khuyến Mãi', icon: <LocalOfferIcon />, path: '/admin/promotions' },
      { text: 'Danh Mục', icon: <CategoryIcon />, path: '/admin/categories' },
      { text: 'Nhà Cung Cấp', icon: <StoreIcon />, path: '/admin/suppliers' },
      { text: 'Đơn Hàng', icon: <ShoppingCartIcon />, path: '/admin/orders' },
    ],
  },
  {
    label: 'BÁO CÁO',
    items: [
      { text: 'Báo Cáo Doanh Thu', icon: <BarChartIcon />, path: '/admin/revenue-report' },
      { text: 'Báo Cáo Sản Phẩm', icon: <BarChartIcon />, path: '/admin/product-report' },
      { text: 'Báo Cáo Khách Hàng', icon: <PeopleAltIcon />, path: '/admin/customer-report' },
      { text: 'Nhật Ký & Theo Dõi', icon: <RestoreIcon />, path: '/admin/logs' },
    ],
  },
  {
    label: 'HỆ THỐNG',
    items: [{ text: 'Sao Lưu & Phục Hồi', icon: <SettingsIcon />, path: '/admin/backup' }],
  },
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
      <Sidebar />
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
