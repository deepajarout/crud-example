var express = require('express');                                           
var router = express.Router();
var User = require('../models/userModel');


/* GET users listing. */
router.get('/', function(req, res, next) {
  var q = req.query.q;
  var query = {};
  if(q){
    query = {name: q};
  }
  
  User.find(query, function(err, users){
                // callback (error, data)
      if (err) res.send(err);
      console.log(JSON.stringify(users));
      res.render('userView',{userData: users});
    });
});

router.get('/create',function(req,res,next){
  res.render('createUser');
});

router.post('/create',function(req,res,next){
  var userModel = new User();
  userModel.tittle = req.body.usertittle;
  userModel.description = req.body.userdescription;
  userModel.created_at = new Date();
  userModel.save(function(err, user){
    if(err) res.send(err);
    res.redirect('/users');
  });
});

router.get('/:userid',function(req,res,next){
  var userid = req.params.userid;
  
  User.findById(userid, function(err, user){
    if (err) res.send(err);
    console.log(JSON.stringify(user));
    res.render('editUser',{user: user});
  });
});

router.post('/:userid',function(req,res,next){
  User.findById(req.params.userid, function(err, user){
    if(err) res.send(err);
    user.tittle= req.body.usertittle;
   user.description = req.body.userdescription;
    user.save(function(err){
      if(err) res.send(err);
      res.redirect('/users');
    });
  });
});

router.get('/:userid/delete',function(req,res,next){
    User.remove({_id:req.params.userid}, function(err, user){
      if(err) res.send(err);
      res.redirect('/users');
    });
});

module.exports = router;

// User.remove({_id: req.params.userid}, function(err, post){
//   if(err) res.send(err);
//   res.json({ message: 'Post deleted!' });
// })