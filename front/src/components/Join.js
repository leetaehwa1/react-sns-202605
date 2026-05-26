import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

function Join() {
  let idRef = useRef("");
  let pwdRef = useRef("");
  let nameRef = useRef("");

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
          회원가입
        </Typography>
        <TextField inputRef={nameRef} label="Username" variant="outlined" margin="normal" fullWidth />
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
            fullWidth style={{ marginTop: '20px' }}
            onClick={()=>{
              let info = {
                 userId : idRef.current.value,
                 userName : nameRef.current.value, 
                 pwd : pwdRef.current.value,
              };
              fetch("http://localhost:3010/user/join", {
                method : "POST",
                headers : {
                  "Content-type" : "application/json"
                },
                body :JSON.stringify(info)  
            })
              .then(res => res.json())
              .then(data =>{
                alert(data.message);
              })
              .catch(err=>{
                alert("서버 에러 발생!")
              });
            }}
            >
            회원가입
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          이미 회원이라면? <Link to="/login">로그인</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Join;