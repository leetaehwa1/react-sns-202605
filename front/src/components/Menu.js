import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Toolbar, ListItemIcon } from '@mui/material';
import { Home, Add, AccountCircle, AddCard, Accessibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240, // 너비 설정
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240, // Drawer 내부의 너비 설정
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        SNS 메뉴
      </Typography>
      <List>
        <ListItem button component={Link} to="/feed">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="피드" />
        </ListItem>
        <ListItem button component={Link} to="/register">
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="등록" />
        </ListItem>
        <ListItem button component={Link} to="/mypage">
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="마이페이지" />
        </ListItem>

        <ListItem button component={Link} to="/context1">
          <ListItemIcon>
            <AddCard />
          </ListItemIcon>
          <ListItemText primary="Context 실습1" />
        </ListItem>

         <ListItem button component={Link} to="/context2">
          <ListItemIcon>
            <AddCard />
          </ListItemIcon>
          <ListItemText primary="Context 실습2" />
        </ListItem>

        <ListItem button component={Link} to="/context3">
          <ListItemIcon>
            <Accessibility />
          </ListItemIcon>
          <ListItemText primary="Context 다크모드" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Menu;