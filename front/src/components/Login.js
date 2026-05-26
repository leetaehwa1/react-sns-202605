import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function Login() {
  let navigator = useNavigate();
  let idRef = useRef("");
  let pwdRef = useRef("");

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          로그인
        </Typography>
        <TextField inputRef={idRef} label="Id" variant="outlined" margin="normal" fullWidth />
        <TextField
          inputRef={pwdRef}
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          style={{ marginTop: '20px' }} 
          onClick={()=>{
            console.log(idRef.current.value);
            let info = {
              userId : idRef.current.value,
              pwd : pwdRef.current.value
            };
              fetch("http://localhost:3010/user/login", {
                method : "POST",
                headers : {
                  "Content-type" : "application/json"
                },
                body :JSON.stringify(info)  
            })
              .then(res => res.json())
              .then(data =>{
                alert(data.message);
                navigator("/feed");
              })
              .catch(err=>{
                alert("서버 에러 발생!")
              });
          }}>
          로그인
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          회원아니셈 ? <Link to="/join">회원가입</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
