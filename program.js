
var React = require('react');
var ReactDOMServer = require('react-dom/server')
var DOM = React.DOM;
var body = DOM.body;
var div = DOM.div;
var script = DOM.script;


var express = require('express');
var app = express();

app.set('port', (process.argv[2] || 3000));
app.set('view engine', 'jsx');
app.set('views', __dirname + '/views');
app.engine('jsx', require('express-react-views').createEngine({ transformViews: false }));


var fs = require('fs')

require('babel-core/register')({
    ignore: false
});


var data=[
     {titel: 'Shopping', detail: 'sdfa sdfsdf', checked: false},
     {titel: 'Hair cut', detail: 'asdasdasdasd df', checked: false},
     {titel: 'Movie', detail: '13:45', checked: false},
     {titel: 'Date', detail: '21:00', checked: false},
     {titel: 'Buy buy', detail: '03:00', checked: false},
    ]

app.use('/bundle.js', function(req, res) {
	res.setHeader('content-type', 'application/javascript')
    fs.createReadStream('./bundle.js').pipe(res)
})

app.use('/', function(req, res) {
  var initialData = JSON.stringify(data);

  res.setHeader('Content-Type', 'text/html');
  var html = ReactDOMServer.renderToStaticMarkup(body(null,
  	                             div({id: 'app'}),
  	                             script({id: 'initial-data', type: 'text/plain', 'data-json': initialData}),
  	                             script({src: '/bundle.js'})));
  res.end(html)
});

app.listen(app.get('port'), function() {});
