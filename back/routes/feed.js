const express = require('express');
const oracledb = require('oracledb');
const db = require("../db");
const jwtAuthentication = require('../auth');
const router = express.Router();
// 1. 패키지 추가
const multer = require('multer');

// 2. 저장 경로 및 파일명
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // 깨진 파일명을 UTF-8로 다시 디코딩합니다.
        const decodedName = Buffer.from(file.originalname, 'latin1').toString('utf8');        
        cb(null, Date.now() + '-' + decodedName);
    }
});

const upload = multer({ storage });

// 3. api 호출
router.post('/upload', upload.array('file'), async (req, res) => {
    let {feedId} = req.body;
    const files = req.files;
    let connection;
    console.log("feedId ==> ", feedId);
    console.log("req.protocol ==> ", req.protocol);
    console.log("req.host ==> ", req.host);
    try{
        connection = await db.getConnection();
        let results = [];
        let host = `${req.protocol}://${req.host}/`; // http://localhost:3010/
        for(let file of files){
            let filename = file.filename;
            let destination = file.destination;
            let result = await connection.execute(
              `
                INSERT INTO TBL_FEED_IMG VALUES(FEED_IMG_SEQ.NEXTVAL, :feedId, :filename, :destination)
              `, 
              [feedId, filename, host+destination+filename],
              { autoCommit : true}
            );
            results.push(result);
        }
        res.json({
            message : "result",
            result : results
        });
    } catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    } finally {
      await connection.close();
    }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `
        SELECT * FROM TBL_FEED F
        INNER JOIN TBL_FEED_IMG I ON F.ID = I.FEEDID
        WHERE USERID = :userId
      `,
      [ userId ],
      {outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
    
    res.json({
        result : "success",
        list : result.rows
    });
    
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  } finally {
    await connection.close();
  }
});

router.delete('/:feedId', jwtAuthentication, async (req, res) => {
  const { feedId } = req.params;
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `
        DELETE FROM TBL_FEED WHERE ID = :feedId
      `,
      [ feedId ],
      { autoCommit : true }
    );
    
    res.json({
        result : "success",
        message : "삭제 됨"
    });
    
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  } finally {
    await connection.close();
  }
});

router.post('/', jwtAuthentication, async (req, res) => {
  const { userId, title, content } = req.body;
  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `
        INSERT INTO TBL_FEED VALUES(FEED_SEQ.NEXTVAL, :userId, :title, :content, SYSDATE)
        RETURNING ID INTO :insertId
      `,
      { userId, title, content, insertId : { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } },
      { autoCommit : true }
    );
    console.log("result.outBinds.insertId[0] => ", result.outBinds.insertId[0]);
    res.json({
        result : "success",
        message : "추가 됨",
        insertId : result.outBinds.insertId[0]
    });
    
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  } finally {
    await connection.close();
  }
});

module.exports = router;