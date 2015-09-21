// client side context restore
d3.restoreDatum = function(container) {
  container = container || document.body;
  var walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, null, false);
  while (node = walker.nextNode()) {
    if (node.getAttribute('data-datum')) {
      var text = node.getAttribute('data-datum');
      var data = JSON.parse(text);
      node.__data__ = data;
      node.removeAttribute('data-datum');
    }
  }
}
d3.restoreDatum();
d3.select('.container').selectAll('div')
  .on('click',function(d){
    console.log(d);
  });

// client side actions
function update(data) {
  var a = d3.select('.container').selectAll('div');
  var ar = a.data(data, function(d) { return d; });

  ar.style({color: 'blue'});

  ar.enter()
    .append('div')
    .text(String)
    .attr('data-val', JSON.stringify)
    .on('click',function(d){
        console.log(d);
    });

  ar.exit()
    .style({color: 'red'})
    .attr('data-val', null);
}

setTimeout(function(){
  update([2,3,4]);
}, 5000);
