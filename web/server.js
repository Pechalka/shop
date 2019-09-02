var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var cors = require('cors')
const session = require('express-session');
var multer = require('multer');
var uuidv4 = require('uuid/v4');

var api = require('./routes/api');
var site = require('./routes/site');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    var newFilename = uuidv4() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(session({ secret: 'keyboard cat', saveUninitialized: true }))

app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

var db = require('./db');

app.post('/upload', upload.single('selectedFile'), (req, res) => {
    res.json(req.file);
});

app.use(site);

app.use('/api', api);


db.openConnectAndCreateDb()
app.listen(5000, function() {
	console.log('server started: 5000');
})