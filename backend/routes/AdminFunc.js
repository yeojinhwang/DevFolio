var express = require('express');
var router = express.Router();
// firebase config
var admin = require('firebase-admin');
var serviceAccountKey = require('../firebaseAccount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://devfolio-5745c.firebaseio.com/'
});
// firestore admin
var db = admin.firestore();


// Admin User

// 전체 유저목록 가져오기
router.get('/users', function (req, res, next) {
  function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
      .then(function (listUsersResult) {
        listUsersResult.users.forEach(function (userRecord) {
          // console.log('user', userRecord.toJSON());
        });
        res.send(listUsersResult.users)
      })
      .catch(function (error) {
        console.log('Error listing users:', error);
      });
  }
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();
});

// 유저 삭제
router.post('/users', function (req, res, next) {
  var user = req.body.user
  admin.auth().deleteUser(req.body.user)
    .then(function () {
      console.log('Successfully deleted user');
    })
    .catch(function (error) {
      console.log('Error deleting user:', error);
    });
})


// Admin DB

// DB 전체 읽기
router.get('/datas', function (req, res, next) {
  db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
})


module.exports = router;