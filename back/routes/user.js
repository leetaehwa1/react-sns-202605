const express = require('express');
const oracledb = require('oracledb');
const db = require("../db");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_KEY = process.env.jwt_key;
const jwtAuthentication = require('../auth');

// .env 로 관리(java의 프로퍼티 같은 개념)

const saltRounds = 10;

router.get('/:userId', jwtAuthentication, async (req, res) => {
  const { userId } = req.params;
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `
      SELECT U.*, CNT
      FROM TBL_USER U
      LEFT JOIN(
          SELECT COUNT(*) AS CNT, USERID
          FROM TBL_FEED F
          GROUP BY USERID
      ) T ON U.USERID= T.USERID
      WHERE U.USERID = :userId
      `,
      [userId],
      {outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
    
    res.json({
        result : "success",
        info : result.rows[0]
    });
    
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  } finally {
    await connection.close();
  }
});


router.post('/login', async (req, res) => {
  const { userId, pwd } = req.body;
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `
        SELECT * FROM TBL_USER WHERE USERID = :userId 
      `,
      [userId],
      {outFormat: oracledb.OUT_FORMAT_OBJECT}
    );

    let message = "로그인 실패!";
    let isLogin = false;
    let token = null;
    let feed = null;
    if(result.rows.length > 0){
      const match = await bcrypt.compare(pwd, result.rows[0].PWD)
      if(match){
        isLogin = true;
        message = "로그인 성공!";
        let payload = {
          userId : result.rows[0].USERID,
          userName : result.rows[0].USERNAME,
          role : result.rows[0].ROLE
        };
        token = jwt.sign(payload, JWT_KEY, {expiresIn : '1h'});
        console.log(JWT_KEY);
        console.log(token);
      } else{
        message = "비밀번호가 틀립니다."
      }
    }else{
      message = "없는 아이디입니다."
    }

     
    res.json({
        result : isLogin,
        message : message,
        token : token,
        // list : result.rows
    });
    
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  } finally {
    await connection.close();
  }
});

router.post('/join', async (req, res) => {
  const { userId, pwd, userName } = req.body;
  let hashPwd = await bcrypt.hash(pwd, saltRounds);
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `
        INSERT INTO TBL_USER(USERID, PWD, USERNAME) VALUES(:userId, :hashPwd, :userName)
      `,
      [userId, hashPwd, userName],
      { autoCommit : true }
    );

    let message = "로그인 실패!";
    let isLogin = false;
    if(result.rowsAffected > 0){
      isLogin = true;
      message = "회원가입 성공!";
    }
    res.json({
        result : isLogin,
        message : message,
        // list : result.rows
    });
    
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  } finally {
    await connection.close();
  }
});




module.exports = router;