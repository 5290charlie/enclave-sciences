var express = require('express');
var app = express();
app.set('view engine', 'pug');
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/static', express.static('static'));


// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

var s3 = new AWS.S3();
var bucketName = 'd8amonk';

var params = {
  Bucket: bucketName, /* required */
  Delimiter: 'delim',
  EncodingType: 'url',
  MaxKeys: 10,
};

var urlPrefix = 'https://s3-us-west-2.amazonaws.com/' + bucketName + '/';

var urls = [];

s3.listObjects(params, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    data.Contents.forEach(function(obj) {
      urls.push(urlPrefix + obj.Key);
    });
  }
});

app.get('/', function (req, res) {
    res.render(
        'index',
        { urls: urls });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
