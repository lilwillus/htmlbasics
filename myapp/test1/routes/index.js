var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET TaskTracker page. */
router.get('/tasks', function(req, res) {
  res.render('tasks', { title: 'Task Tracker !' });
});

/* GET tasklist page. */
router.get('/tasklist', function(req, res) {
  var db = req.db;
  var collection = db.get('usecollection');
  collection.find({},{},function(e,docs){
      res.render('tasklist', {
          "tasklist" : docs
      });
  });
});

/* GET New TASK page. */
router.get('/addtask', function(req, res) {
  res.render('addtask', { title: 'Add New Task' });
});

// To update tasklisk 
router.get("/update/:_id",
    function(req, res){
        var db = req.db
        var collection = db.get('usecollection');
        collection.find({"_id":req.params._id}, function(e,docs) {
        res.render("update", {'tasklist': docs});
        });
    });

router.post("/updatetask",
    function(req, res){
        var db = req.db;
        var collection = db.get('usecollection');
        collection.update({'_id':req.params._id}, { $set: { 
            task: req.body.taskname, 
            desc: req.body.taskdesc,
            hours: req.body.taskhours,
        }}, { new: false }, function (err, task) {
            if (err) return handleError(err);
            res.render('success', { message: "Task Updated successfully!" });
        });
});


// Delete task from taslklist
router.get("/deletetask/:_id",function(req, res){
    var db = req.db;
    var collection = db.get('usecollection');
    collection.remove({'_id':req.params._id}, function(err, task) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Task not found with id " + req.params._id});                
            }
            return res.status(500).send({message: "Could not delete task with id " + req.params._id});
        }

        if(!task) {
            return res.status(404).send({message: "Task not found with id " + req.params._id});
        }

        res.render('success', { message: "Task deleted successfully!" });
    });
});


// POST to Add Task Service //
router.post('/addtask', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var taskName = req.body.taskname;
  var taskDesc = req.body.taskdesc; 
  var taskHours = req.body.taskhours;

  // Set our collection
  var collection = db.get('usecollection');

  // Submit to the DB
  collection.insert({
      "task" : taskName,
      "description" : taskDesc,
      "hours" : taskHours,
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("tasklist");
      }
  });
});

module.exports = router;
