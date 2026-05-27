import React from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function MyPage() {
  const [user, setUser] = useState("");
  
  function handleGetUser(){
    const token = localStorage.getItem("token");

    if(token){
      const decoded = jwtDecode(token);
      fetch("http://localhost:3010/user/" + decoded.userId,{
          method : "GET",
          headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => res.json())
        .then(data =>{
          setUser(data.info);
        })
        .catch(err=>{
          console.log("서버 에러");
        })
    }else{

    }
  }
  useEffect(()=>{
    handleGetUser();
  },[])
    
  
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          {/* 프로필 정보 상단 배치 */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" // 프로필 이미지 경로
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{user?.USERNAME}</Typography>
            <Typography variant="body2" color="text.secondary">
              @honggildong
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">{user?.FOLLOWER}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">{user?.FOLLOWING}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">{user?.CNT}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              {user?.INTRO}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;