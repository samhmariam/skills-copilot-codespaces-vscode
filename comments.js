// Create web server

var express = require('express');
var router = express.Router();
var db = require('../models');
// var Comment = require('../models/comment');
var Post = require('../models/post');

// GET /posts/:postId/comments/new
router.get('/posts/:postId/comments/new', function(req, res) {
  // res.send('NEW comment');
  db.post.findById(req.params.postId)
    .then(function(post) {
      if (post) {
        res.render('comments/new', { post: post });
      } else {
        res.send('Post not found.');
      }
    });
});

// POST /posts/:postId/comments
router.post('/posts/:postId/comments', function(req, res) {
  // res.send('CREATE comment');
  db.post.findById(req.params.postId)
    .then(function(post) {
      if (post) {
        db.comment.create(req.body)
          .then(function(comment) {
            post.addComment(comment);
            res.redirect('/posts/' + post.id);
          });
      } else {
        res.send('Post not found.');
      }
    });
});

// GET /posts/:postId/comments/:id/edit
router.get('/posts/:postId/comments/:id/edit', function(req, res) {
  // res.send('EDIT comment');
  db.comment.findById(req.params.id)
    .then(function(comment) {
      if (comment) {
        res.render('comments/edit', { comment: comment });
      } else {
        res.send('Comment not found.');
      }
    });
});

// PUT /posts/:postId/comments/:id
router.put('/posts/:postId/comments/:id', function(req, res) {
  // res.send('UPDATE comment');
  db.comment.findById(req.params.id)
    .then(function(comment) {
      if (comment) {
        comment.update(req.body)
          .then(function() {
            res.redirect('/posts/' + req.params.postId);
          });
      } else {
        res.send('Comment not found.');
      }
    });
});

// DELETE /posts/:postId/comments/:id
router.delete('/posts/:postId/comments/:id', function(req, res) {
  // res.send('DELETE comment');
  db.comment.findById(req.params.id)
    .then(function(comment) {
      if (comment) {
        comment.destroy()
          .then(function() {
            res.redirect('/posts/' + req.params.postId);
          });
      } else {
        res.send('Comment not found.');
      }

