<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<title>raul_martinez_sanchez_TrabajoFinal</title>
<!--<script type="text/javascript" src="d3/d3.v2.js"></script>-->
<script src="http://d3js.org/d3.v2.js"></script>
<style type="text/css">
#pieChart {
	position: absolute;
	top: 10px;
	left: 10px;
	width: 400px;
	height: 400px;
}

#lineChart {
	position: absolute;
	top: 10px;
	left: 410px;
	height: 150px;
}

#barChart {
	position: absolute;
	top: 160px;
	left: 410px;
	height: 250px;
}

.slice {
	font-size: 12pt;
	font-family: Verdana;
	fill: white;
	//
	svg
	specific
	-
	instead
	of
	color
	font-weight
	:
	bold;
}

/*for line chart*/
.axis path, .axis line {
	fill: none;
	stroke: black;
	shape-rendering: crispEdges;
}

.line {
	fill: none;
	/*stroke: steelblue;*/
	stroke-width: 3px;
}

.dot {
	/*fill: white;*/
	/*stroke: steelblue;*/
	stroke-width: 1.5px;
}

.axis text {
	font-family: Verdana;
	font-size: 11px;
}

.title {
	font-family: Verdana;
	font-size: 15px;
}

.xAxis {
	font-family: verdana;
	font-size: 11px;
	fill: black;
}

.yAxis {
	font-family: verdana;
	font-size: 11px;
	fill: white;
}

table {
	border-collapse: collapse;
	border: 0px;
	font-family: Verdana;
	color: #5C5558;
	font-size: 12px;
	text-align: right;
}

td {
	padding-left: 10px;
}

#lineChartTitle1 {
	font-family: Verdana;
	font-size: 14px;
	fill: lightgrey;
	font-weight: bold;
	text-anchor: middle;
}

#lineChartTitle2 {
	font-family: Verdana;
	font-size: 72px;
	fill: grey;
	text-anchor: middle;
	font-weight: bold;
	/*font-style: italic;*/
}
</style>
</head>
<body>

	<div id="pieChart"></div>
	<div id="barChart"></div>
	<div id="lineChart"></div>
	<script type="text/javascript">
    
/*
################ FORMATOS ##################
-------------------------------------------
*/


var 	formatAsPercentage = d3.format("%"),
		formatAsPercentage1Dec = d3.format(".1%"),
		formatAsInteger = d3.format(","),
		fsec = d3.time.format("%S s"),
		fmin = d3.time.format("%M m"),
		fhou = d3.time.format("%H h"),
		fwee = d3.time.format("%a"),
		fdat = d3.time.format("%d d"),
		fmon = d3.time.format("%b")
		;

/*
############# Tarta ###################
-------------------------------------------
*/



function dsPieChart(){

	var dataset = [
		  {category: "Castilla y León", measure: 0.0616},
	      {category: "Madrid", measure: 0.0612},
	      {category: "Galicia", measure: 0.0607},
	      {category: "Navarra", measure: 0.0607},
	      {category: "Aragón", measure: 0.0603},
	      {category: "Cataluña", measure:0.0598},
	      {category: "Asturias", measure: 0.0594},
		  {category: "La Rioja", measure: 0.0591},
	      {category: "Castilla la Mancha", measure: 0.0589},
	      {category: "Cantabria", measure: 0.0588},
	      {category: "Valencia", measure: 0.0586},
	      {category: "Islas Baleares", measure: 0.0575},
	      {category: "Murcia", measure:0.0574},
	      {category: "Pais Vasco", measure:0.0573},
	      {category: "Islas Canarias", measure:0.0563},
	      {category: "Extremadura", measure:0.0562},
	      {category: "Andalucía", measure: 0.0561}
	      ]
	      ;

	var 	width = 400,
		   height = 400,
		   outerRadius = Math.min(width, height) / 2,
		   innerRadius = outerRadius * .999,   
		   // animación
		   innerRadiusFinal = outerRadius * .5,
		   innerRadiusFinal3 = outerRadius* .45,
		   color = d3.scale.category20()    //gama de colores
		   ;
	    
	var vis = d3.select("#pieChart")
	     .append("svg:svg")              //crea el SVG dentro de <body>
	     .data([dataset])                   
	         .attr("width", width)          
	         .attr("height", height)
	     		.append("svg:g")                //grupo para poner la tarta
	         .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")") 
				;
				
   var arc = d3.svg.arc()              //cra los elementos <path> para los arcos de los datos
        	.outerRadius(outerRadius).innerRadius(innerRadius);
   
   // para la animación
   var arcFinal = d3.svg.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
	var arcFinal3 = d3.svg.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

   var pie = d3.layout.pie()  
        .value(function(d) { return d.measure; });    

   var arcs = vis.selectAll("g.slice")     
        .data(pie)                          
        .enter()                           
            .append("svg:g")               
               .attr("class", "slice")    
               .on("mouseover", mouseover)
    				.on("mouseout", mouseout)
    				.on("click", up)
    				;
    				
        arcs.append("svg:path")
               .attr("fill", function(d, i) { return color(i); } ) 
               .attr("d", arc)     
					.append("svg:title") 
				   .text(function(d) { return d.data.category + ": " + formatAsPercentage(d.data.measure); });			

        d3.selectAll("g.slice").selectAll("path").transition()
			    .duration(750)
			    .delay(10)
			    .attr("d", arcFinal )
			    ;
	
	  // Añade una etiqueda a los arcos mayores, las traslada al centroide y las rota
	  // fuente: http://bl.ocks.org/1305337#index.html
	  arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; })
	  		.append("svg:text")
	      .attr("dy", ".35em")
	      .attr("font-size","10px")
	      .attr("text-anchor", "middle")
	      .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })
	      .text(function(d) { return d.data.category; })
	      ;
	   
	   // Calcula le angulo para la etiqueta comvirtiendo de radianes a grados
		function angle(d) {
		    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
		    return a > 90 ? a - 180 : a;
		}
		    
		
		// Titulo de la tarta			
		vis.append("svg:text")
	     	.attr("dy", ".65em")
	      .attr("text-anchor", "middle")
	      .text("Nota Media PISA 2015")
	      .attr("class","title")
	      ;		    


		
	function mouseover() {
	  d3.select(this).select("path").transition()
	      .duration(750)
	        		.attr("d", arcFinal3)
	        		;
	}
	
	function mouseout() {
	  d3.select(this).select("path").transition()
	      .duration(750)
	        		.attr("d", arcFinal)
	        		;
	}
	
	function up(d, i) {
				updateBarChart(d.data.category, color(i));
				updateLineChart(d.data.category, color(i));
	}
}

dsPieChart();

/*
############# BARRAS ###################
-------------------------------------------
*/



var datasetBarChart = [
{ group: "España", category: "Nota", measure: 493 }, 
{ group: "España", category: "Media", measure: 493 }, 
{ group: "Castilla y León", category: "Nota", measure: 519 }, 
{ group: "Castilla y León", category: "Media", measure: 493 }, 
{ group: "Madrid", category: "Nota", measure: 516 }, 
{ group: "Madrid", category: "Media", measure: 493 }, 
{ group: "Galicia", category: "Nota", measure: 512 }, 
{ group: "Galicia", category: "Media", measure: 493 }, 
{ group: "Navarra", category: "Nota", measure: 512 }, 
{ group: "Navarra", category: "Media", measure: 493 }, 
{ group: "Aragón", category: "Nota", measure: 508 }, 
{ group: "Aragón", category: "Media", measure: 493 }, 
{ group: "Cataluña", category: "Nota", measure: 504 }, 
{ group: "Cataluña", category: "Media", measure: 493 }, 
{ group: "Asturias", category: "Nota", measure: 501 }, 
{ group: "Asturias", category: "Media", measure: 493 }, 
{ group: "La Rioja", category: "Nota", measure: 498 }, 
{ group: "La Rioja", category: "Media", measure: 493 }, 
{ group: "Castilla la Mancha", category: "Nota", measure: 497 }, 
{ group: "Castilla la Mancha", category: "Media", measure: 493 }, 
{ group: "Cantabria", category: "Nota", measure: 496 }, 
{ group: "Cantabria", category: "Media", measure: 493 }, 
{ group: "Valencia", category: "Nota", measure: 494 }, 
{ group: "Valencia", category: "Media", measure: 493 }, 
{ group: "Islas Baleares", category: "Nota", measure: 485 }, 
{ group: "Islas Baleares", category: "Media", measure: 493 }, 
{ group: "Murcia", category: "Nota", measure: 484 }, 
{ group: "Murcia", category: "Media", measure: 493 },
{ group: "País Vasco", category: "Nota", measure: 483 }, 
{ group: "País Vasco", category: "Media", measure: 493 }, 
{ group: "Islas Canarias", category: "Nota", measure: 475 }, 
{ group: "Islas Canarias", category: "Media", measure: 493 },
{ group: "Extremadura", category: "Nota", measure: 474 }, 
{ group: "Extremadura", category: "Media", measure: 493 },
{ group: "Andalucía", category: "Nota", measure: 473 }, 
{ group: "Andalucía", category: "Media", measure: 493 }
]
;

// establece el grupo inicial
var group = "España";

function datasetBarChosen(group) {
	var ds = [];
	for (x in datasetBarChart) {
		 if(datasetBarChart[x].group==group){
		 	ds.push(datasetBarChart[x]);
		 } 
		}
	return ds;
}


function dsBarChartBasics() {

		var margin = {top: 30, right: 5, bottom: 20, left: 50},
		width = 500 - margin.left - margin.right,
	   height = 250 - margin.top - margin.bottom,
		colorBar = d3.scale.category20(),
		barPadding = 1
		;
		
		return {
			margin : margin, 
			width : width, 
			height : height, 
			colorBar : colorBar, 
			barPadding : barPadding
		}			
		;
}

function dsBarChart() {

	var firstDatasetBarChart = datasetBarChosen(group);         	
	
	var basics = dsBarChartBasics();
	
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height,
		colorBar = basics.colorBar,
		barPadding = basics.barPadding
		;
					
	var 	xScale = d3.scale.linear()
						.domain([0, firstDatasetBarChart.length])
						.range([0, width])
						;
		  
	var yScale = d3.scale.linear()
		   .domain([0, d3.max(firstDatasetBarChart, function(d) { return d.measure; })])
		   .range([height, 0])
		   ;
	
	
	var svg = d3.select("#barChart")
			.append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .attr("id","barChartPlot")
		    ;
	
	var plot = svg
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		    ;
	            
	plot.selectAll("rect")
		   .data(firstDatasetBarChart)
		   .enter()
		   .append("rect")
			.attr("x", function(d, i) {
			    return xScale(i);
			})
		   .attr("width", width / firstDatasetBarChart.length - barPadding)   
			.attr("y", function(d) {
			    return yScale(d.measure);
			})  
			.attr("height", function(d) {
			    return height-yScale(d.measure);
			})
			.attr("fill", "lightgrey")
			;
	
		
	plot.selectAll("text")
	.data(firstDatasetBarChart)
	.enter()
	.append("text")
	.text(function(d) {
			return formatAsInteger(d3.round(d.measure));
	})
	.attr("text-anchor", "middle")
	.attr("x", function(d, i) {
			return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
	})
	.attr("y", function(d) {
			return yScale(d.measure) + 14;
	})
	.attr("class", "yAxis")
	;
	

	var xLabels = svg
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + (margin.top + height)  + ")")
		    ;
	
	xLabels.selectAll("text.xAxis")
		  .data(firstDatasetBarChart)
		  .enter()
		  .append("text")
		  .text(function(d) { return d.category;})
		  .attr("text-anchor", "middle")
			// posicion x a partir del borde izquierdo más la mitad de la anchura de la barra
						   .attr("x", function(d, i) {
						   		return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
						   })
		  .attr("y", 15)
		  .attr("class", "xAxis")
		  ;			
	 
	// Titulo
	
	svg.append("text")
		.attr("x", (width + margin.left + margin.right)/2)
		.attr("y", 15)
		.attr("class","title")				
		.attr("text-anchor", "middle")
		.text("Comparación con Media Nacional")
		;
}

dsBarChart();

 /* ** Actualizaciones ** */
 
function updateBarChart(group, colorChosen) {
	
		var currentDatasetBarChart = datasetBarChosen(group);
		
		var basics = dsBarChartBasics();
	
		var margin = basics.margin,
			width = basics.width,
		   height = basics.height,
			colorBar = basics.colorBar,
			barPadding = basics.barPadding
			;
		
		var 	xScale = d3.scale.linear()
			.domain([0, currentDatasetBarChart.length])
			.range([0, width])
			;
		
			
		var yScale = d3.scale.linear()
	      .domain([0, d3.max(currentDatasetBarChart, function(d) { return d.measure; })])
	      .range([height,0])
	      ;
	      
	   var svg = d3.select("#barChart svg");
	      
	   var plot = d3.select("#barChartPlot")
	   	.datum(currentDatasetBarChart)
		   ;
	
	  	plot.selectAll("rect")
	      .data(currentDatasetBarChart)
	      .transition()
			.duration(750)
			.attr("x", function(d, i) {
			    return xScale(i);
			})
		   .attr("width", width / currentDatasetBarChart.length - barPadding)   
			.attr("y", function(d) {
			    return yScale(d.measure);
			})  
			.attr("height", function(d) {
			    return height-yScale(d.measure);
			})
			.attr("fill", colorChosen)
			;
		
		plot.selectAll("text.yAxis") 
 		    .data(currentDatasetBarChart)
			.transition()
			.duration(750)
		   .attr("text-anchor", "middle")
		   .attr("x", function(d, i) {
		   		return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
		   })
		   .attr("y", function(d) {
		   		return yScale(d.measure) + 14;
		   })
		   .text(function(d) {
				return formatAsInteger(d3.round(d.measure));
		   })
		   .attr("class", "yAxis")					 
		;
		

		svg.selectAll("text.title") 
			.attr("x", (width + margin.left + margin.right)/2)
			.attr("y", 15)
			.attr("class","title")				
			.attr("text-anchor", "middle")
			.text(group + ": Comparativa con Media Nacional")
		;
}

    </script>
</body>
</html>
