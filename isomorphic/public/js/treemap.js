// client side context restore
var w = 1280 - 80,
    h = 800 - 180,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([0, h]),
    color = d3.scale.category20c(),
    root,
    node;

var treemap = d3.layout.treemap()
    .round(false)
    .size([w, h])
    .sticky(true)
    .value(function(d) { return d.size; });

var svg = d3.select(".svg");

node = root = JSON.parse(svg.attr('data-val'));

var nodes = treemap.nodes(root)
      .filter(function(d) { return !d.children; });

var cell = svg.selectAll("g").data(nodes)
  .on("click", function(d) { return zoom(node == d.parent ? root : d.parent); });

svg.selectAll("g.cell").select('text')
  .style("opacity", function(d) { d.w = d.name.length * 6; return d.dx > d.w ? 1 : 0; });

d3.select(window).on("click", function() { zoom(root); });

d3.select("select").on("change", function() {
  treemap.value(this.value == "size" ? size : count).nodes(root);
  zoom(node);
});

function size(d) {
  return d.size;
}

function count(d) {
  return 1;
}

function zoom(d) {
  var kx = w / d.dx, ky = h / d.dy;
  x.domain([d.x, d.x + d.dx]);
  y.domain([d.y, d.y + d.dy]);

  var t = svg.selectAll("g.cell").transition()
      .duration(d3.event.altKey ? 7500 : 750)
      .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

  t.select("rect")
      .attr("width", function(d) { return kx * d.dx - 1; })
      .attr("height", function(d) { return ky * d.dy - 1; })

  t.select("text")
      .attr("x", function(d) { return kx * d.dx / 2; })
      .attr("y", function(d) { return ky * d.dy / 2; })
      .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });

  node = d;
  d3.event.stopPropagation();
}
