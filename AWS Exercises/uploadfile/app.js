const AWS = require('aws-sdk');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


// A utility function to create HTML.
function getHtml(template) {
  return template.join('\n');
}

const ID = 'AKIA4DL2GFQ6HWLZM4KH';
const SECRET = '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';
const BUCKET_NAME = 'fileupload-tanveer';

const s3 = new AWS.S3({
	accessKeyId: ID,
    secretAccessKey: SECRET,
	region: 'us-east-2'
});

/*
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
*/
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: BUCKET_NAME,
		key: function(req, file, cb){
			cb(null, file.originalname);
		}
	}),
	fileFilter: function(req, file, cb) {
		checkFileType(file, cb);
	}
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf|txt/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype || extname) {
    return cb(null, true);
  } else {
    cb("Error: Only /jpeg|jpg|png|gif|pdf|txt/!");
  }
}

app.post('/upload', upload.single('fileinput'), function(req, res, next) {
	if(req.file){
		console.log('success');
		
		//next();
		//res.end();
		res.json({
			'statusCode': 200,
			'headers': { 
				'Content-Type': 'application/json', 
				'Access-Control-Allow-Origin' : '*'
			},
			'body':{ 'message': 'success'}
			});
		
		/*const params = {
			Bucket: BUCKET_NAME,
			Key: req.file.filename,
			Body: fs.readFileSync(req.file.path)
		}
		
		s3.putObject(params, function(err, data){
			if(err)
				throw err;
			console.log('success');
		});*/
		
	}else {
				
	}
});
app.get('/download', function(req, res, next){
	
	const params = {
		Bucket: BUCKET_NAME,
		//Key: req.file.filename
	}
	var keys = [];
	s3.listObjectsV2(params, function(err, data) {
			
		//res.end();
		if (err) {
		  return next(err);
		} else {
			const contents = data.Contents;
			contents.forEach(function(content) {
				keys.push(content);
				//res.json(content);
			});
		
			res.json(keys);
			
			/*var albums = data.CommonPrefixes.map(function(commonPrefix) {
			var prefix = commonPrefix.Prefix;
			var albumName = decodeURIComponent(prefix);
			return getHtml([
			  '<li>',
				'<button style="margin:5px;" onclick="viewAlbum(\'' + albumName + '\')">',
				  albumName,
				'</button>',
			  '</li>'
			]);
		  });
		  var message = albums.length ?
			getHtml([
			  '<p>Click on an album name to view it.</p>',
			]) :
			'<p>You do not have any albums. Please Create album.';
		  var htmlTemplate = [
			'<h2>Albums</h2>',
			message,
			'<ul>',
			  getHtml(albums),
			'</ul>',
		  ]*/
		//document.getElementById('viewer').innerHTML = '++';
    }
  });
});

app.use(express.static("./public"));



app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

/*
app.listen(3000,function(){
    console.log("Working on port 3000");
});
*/
module.exports = app;
//module.exports.handler = serverless(app);