import React, { useRef, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function Register() {
  const [file, setFile] = useState([]);
  let titleRef = useRef("");
  let contentRef = useRef("");

  const handleFileChange = (event) => {
    setFile(event.target.files);
  };

  // 5. pk값 받아서 업로드 api 호출
  const fnUploadFile = (feedId)=>{
    const formData = new FormData();
    for(let i=0; i<file.length; i++){
      formData.append("file", file[i]); 
    } 
    formData.append("feedId", feedId);
    fetch("http://localhost:3010/feed/upload", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // navigate("/feedList"); // 원하는 경로
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start" // 상단 정렬
        minHeight="100vh"
        sx={{ padding: '20px' }} // 배경색 없음
      >
        <Typography variant="h4" gutterBottom>
          등록
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>카테고리</InputLabel>
          <Select defaultValue="" label="카테고리">
            <MenuItem value={1}>일상</MenuItem>
            <MenuItem value={2}>여행</MenuItem>
            <MenuItem value={3}>음식</MenuItem>
          </Select>
        </FormControl>

        <TextField 
          inputRef={titleRef}
          label="제목" variant="outlined" margin="normal" fullWidth />
        <TextField
          inputRef={contentRef}
          label="내용"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows={4}
        />

        <Box display="flex" alignItems="center" margin="normal" fullWidth>
          <input
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {file?.length > 0 && (
            [...file].map(item => {
              return <Avatar
                alt="첨부된 이미지"
                src={URL.createObjectURL(item)}
                sx={{ width: 56, height: 56, marginLeft: 2 }}
              />
            })
          )}

          {/* {file && (
            <Avatar
              alt="첨부된 이미지"
              src={URL.createObjectURL(file)}
              sx={{ width: 56, height: 56, marginLeft: 2 }}
            />
          )} */}

          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {file ? file.name : '첨부할 파일 선택'}
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          color="primary" fullWidth 
          style={{ marginTop: '20px' }}
          onClick={()=>{
            const token = localStorage.getItem("token");
            if(token){
              const decoded = jwtDecode(token);
              let feed = {
                userId : decoded.userId,
                title : titleRef.current.value,
                content : contentRef.current.value
              };

              fetch("http://localhost:3010/feed", {
              method : "POST",
              headers: {
                  "Authorization" : "Bearer " + localStorage.getItem("token"),
                  "Content-type" : "application/json"
              },
              body : JSON.stringify(feed)
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);
                if(file.length > 0){
                  fnUploadFile(data.insertId);
                } else {
                  // 페이지 이동
                }
                
              })

            }
          }}
        >
          등록하기
        </Button>
      </Box>
    </Container>
  );
}

export default Register;