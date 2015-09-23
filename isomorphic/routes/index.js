var express = require('express');
var router = express.Router();
var jsdom = require("jsdom");
var fs = require("fs");
var d3raw = fs.readFileSync("./public/components/d3/d3.js", "utf-8");
var d3;

jsdom.env({
    html: '<div class="container"></div>',
    src: [d3raw],
    done: function (err, window) {
        d3 = window.d3;
        var document = window.document;
        // client side context saving
        d3.saveDatum = function(container) {
          container = container || document.body;
          domTraversal(container, function(node){
            if (node.__data__) {
              var text = JSON.stringify(node.__data__);
              node.setAttribute('data-datum', text);
            }
          })
        }
    }
});

function update(data) {
  var a = d3.select('.container').selectAll('div');
  var ar = a.data(data, function(d) { return d; });

  ar.style({color: 'blue'});

  ar.enter()
    .append('div')
    .text(String)
    .on('click',function(d){
        console.log(d);
    });

  ar.exit()
    .style({color: 'red'});
}

/* GET home page. */

router.get('/', function(req, res) {

    d3.select('.container').html('');
    update([1,2,3]);
    d3.saveDatum();

    res.render('index', { html: d3.select('.container').html() });
});

module.exports = router;


function domTraversal(root, enter, exit) {
  var node = root,
    exit = exit || function(){};
  start: while (node) {
    enter(node);
    if (node.firstChild) {
      node = node.firstChild;
      continue start;
    }
    while (node) {
      exit(node);
      if (node == root) {
        node = null;
      } else if (node.nextSibling) {
        node = node.nextSibling;
        continue start;
      } else {
        node = node.parentNode;
      }
    }
  }
}
