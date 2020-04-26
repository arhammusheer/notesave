var express = require('express');
var router = express.Router();
var db = require("../database.js");

/* GET api root. */
router.get('/', function(req, res, next) {
  res.json(200,{
    "status":"success",
    "message":"root"
  });
});

router.get('/notes/:notename', function(req, res, next){
  var sql = "SELECT noteName,noteData FROM notes WHERE noteName = ?"
  var params = [req.params.notename]
  console.log(params);
  db.get(sql, params, (err, row) => {
    if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if(row){
            res.json({
                "message":"success",
                "data":row
            })
        } else {
            res.json({
                "message":"warning",
                "warning":"SQL error"
            })
        }
  });
});

router.put('/notes/:notename', function(req, res, next){
  var sql = "  INSERT OR REPLACE INTO notes (noteName, noteData) VALUES(?,?)"
  var params = [req.params.notename, req.body.notedata]
  db.run(sql, params, (err,row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data":row
    })
    
  });
});

router.delete('/notes/:notename', function(req, res, next){
  var sql = "DELETE FROM notes WHERE noteName = ?"
  var params = [req.params.notename]
  db.run(sql, params, (err,row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data":row
    })
  });
});

module.exports = router;
