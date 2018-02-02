var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://saadman:saadman@ds123258.mlab.com:23258/mytasklist_saadman',['tasks'])

//GET ALL TASKS
router.get('/tasks',function(req,res,next){
  db.tasks.find(function(err,tasks){
    if(err){
      res.send(err);
    }
    else{
      res.json(tasks);
    }
  });
});

//GET A SINGLE TASK
router.get('/tasks/:id',function(req,res,next){
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err,task){
    if(err){
      res.send(err);
    }
    else{
      res.json(task);
    }
  });
});

//SAVE A Task
router.post('/task',function(req,res,next){
  var task = req.body;
  if(!task.title || !(task.isDone+ ' ')){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  }
  else{
    db.tasks.save(task, function(err, task){
      if(err){
        res.send(err);
      }
      else{
        res.json(task);
      }
    })
  }
});

//DELETE A TASK
router.delete('/tasks/:id',function(req,res,next){
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err,task){
    if(err){
      res.send(err);
    }
    else{
      res.json(task);
    }
  });
});

//UPDATE A TASK
router.put('/tasks/:id',function(req,res,next){
  var task = req.body;
  var updateTask = {};

  if(task.isDone){
    updateTask.isDone = task.isDone;
  }

  if(task.title){
    updateTask.title = task.title;
  }

  if(!updateTask){
    res.send(400);
    res.json({
      "error": "Bad Data"
    });
  }
  else{
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updateTask,{},function(err,task){
      if(err){
        res.send(err);
      }
      else{
        res.json(task);
      }
    });
  }

});

module.exports = router;
