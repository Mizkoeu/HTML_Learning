d3.csv("world1c.csv", function(gameData) {
  gameData.forEach(function(d){
    d.Day = + d.Day;
    d.healthy = + d.Healthy;
    d.healthyWithSymp = + d.Symptoms;
    d.totalSymp = + d.TotSymp;
    d.treatedA = + d.TRTA;
    d.treatedB = + d.TRTB;
    d.curedA = + d.TRTACures;
    d.curedB = + d.TRTBCures;
    d.population = + d.Check;
  });

  var population = gameData[1].population;

  //set up width and height of entire SVG
  var svg_width = 1250;
  var svg_height = 1000;

  //set up global variables for side bars (test tubes)
  /*var curedAAfterHeight = 0;
  var curedBAfterHeight = 0;*/

  //margin
  var margin = 200;

  //main box width, height and area
  var mainBox_width = svg_width - 2 * margin - 250;
  var mainBox_height = svg_height - margin;
  var mainBox_area = mainBox_width * mainBox_height;

  //keep track of where we are in the array
  var counter = 0;

  // keep track of people curedAAfterHeight
  var totalATreated = 0;
  var totalBTreated = 0;
  var totalACured = 0;
  var totalBCured = 0;
  //var curedARatio = 0;
  //var curedBRatio = 0;

  var symp_height = function(counter) {
    return (gameData[counter].totalSymp / population) * mainBox_height;
  }

  var curedABefore_width = function(counter) {
    return (gameData[counter].TRTACures / population) * mainBox_area / symp_height(counter);
  }

  var curedBBefore_width = function(counter) {
    return (gameData[counter].TRTBCures / population) * mainBox_area / symp_height(counter);
  }

  var trtA_width = function(counter) {
    return (gameData[counter].TRTA / population) * mainBox_area / symp_height(counter);
  }

  var trtB_width = function(counter) {
    return (gameData[counter].TRTB / population) * mainBox_area / symp_height(counter);
  }

  var curedBBefore_width = function(counter) {
    console.log("on day " + counter + "the curedB width is " + (gameData[counter].TRTBCures / population) * mainBox_area / symp_height(counter));
    return (gameData[counter].TRTBCures / population) * mainBox_area / symp_height(counter);
  }

  // bar coordinates
  var pop_x = margin;
  var pop_y = margin;
  var syringe_x = margin;
  var syringe_y = 20;
  var testTubeA_x = 0;
  var testTubeA_y = mainBox_height + margin;
  var testTubeB_x = margin + mainBox_width + margin/2;
  var testTubeB_y = mainBox_height + margin;
  var variables_x = margin + mainBox_width + 50;
  var variables_y = 50;


  //create SVG
  var svg = d3.select('body')
               .append('svg')
               .attr('width', svg_width)
               .attr('height', svg_height);

// box for syringe
var syringe = svg.append('rect')
                  .attr('class', 'healthy')
                  .attr('x', syringe_x)
                  .attr('y', syringe_y)
                  .attr('width', mainBox_width)
                  .attr('height', margin - 100)
                  .attr('fill', 'green');

var syr_trtA = svg.append('rect')
                    .attr('class', 'healthy')
                    .attr('x', syringe_x)
                    .attr('y', syringe_y)
                    .attr('width', mainBox_width * 0.7)
                    .attr('height', margin - 100)
                    .attr('fill', 'pink');

var syr_trtB = svg.append('rect')
                    .attr('x', syringe_x + mainBox_width * 0.7)
                    .attr('y', syringe_y)
                    .attr('width', mainBox_width * 0.3)
                    .attr('height', margin - 100)
                    .attr('fill', 'purple');

 //box for healthy people
 var healthy = svg.append('rect')
                   .attr('class', 'healthy')
                   .attr('x', pop_x)
                   //.attr('y', mainBox_height - healthy_height(counter) + margin)
                   .attr('y', pop_y)
                   .attr('width', mainBox_width)
                   //.attr('height', healthy_height(counter))
                   .attr('height', mainBox_height)
                   .attr('fill', 'blue');

 //box for people with symptoms
 var symp = svg.append('rect')
               .attr('class', 'healthy')
               .attr('x', pop_x)
               //.attr('y', mainBox_height - healthy_height(counter) - symp_height(counter) + margin)
               .attr('y', pop_y)
               .attr('width', mainBox_width)
               .attr('height', symp_height(counter))
               .attr('fill', 'red');

//box for people cured by A before it falls
var syringeA = svg.append('rect')
               .attr('class', 'healthy')
               .attr('x', syringe_x)
               .attr('y', syringe_y)
               .attr('width', 0)
               .attr('height', margin - 100)
               .attr('fill', 'black');

//box for people cured by B before it falls
var syringeB = svg.append('rect')
               .attr('class', 'healthy')
               .attr('x', syringe_x + mainBox_width)
               .attr('y', syringe_y)
               .attr('width', 0)
               .attr('height', margin - 100)
               .attr('fill', 'black');

/*var testTubeA = svg.append('rect')
                .attr('x', testTubeA_x)
                .attr('y', svg_height - mainBox_height)
                .attr('width', 100)
                .attr('height', mainBox_height)
                //.style('stroke', 'blue')
                //.style('stroke-width', 1);


var testTubeB = svg.append('rect')
                .attr('class', 'healthy')
                .attr('x', testTubeB_x)
                .attr('y', svg_height - mainBox_height)
                .attr('width', 100)
                .attr('height', mainBox_height)
                //.style('stroke', 'black');*/


var ratioABar = svg.append('rect')
                .attr('class', 'healthy')
                .attr('x', testTubeA_x)
                .attr('y', testTubeA_y)
                .attr('width', 100)
                .attr('height', 0)
                .attr('fill', 'black');

var ratioBBar = svg.append('rect')
                .attr('class', 'healthy')
                .attr('x', testTubeB_x)
                .attr('y', testTubeB_y)
                .attr('width', 100)
                .attr('height', 0)
                .attr('fill', 'black');


// all numbers
var sickText = svg.append("text")
    .attr("x", margin + (mainBox_width / 2))
    .attr("y", pop_y)
    .text('Sick: ' + gameData[counter].totalSymp);

var dailyCuredA = svg.append("text")
    .attr("x", margin)
    .attr("y", 15)
    .text('Cured By A: ' + 0);

var dailyCuredB = svg.append("text")
    .attr("x", margin + mainBox_width)
    .attr("y", 15)
    .text('Cured by B: ' + 0);

var dailyTreatedA = svg.append("text")
    .attr("x", margin + 0.7 * mainBox_width - 120)
    .attr("y", 10)
    .text('Treated By A: ' + gameData[counter].treatedA);

var dailyTreatedB = svg.append("text")
    .attr("x", margin + 0.7 * mainBox_width)
    .attr("y", 10)
    .text('Treated by B: ' + gameData[counter].treatedB);

var totalATreatedText = svg.append("text")
    .attr("x", variables_x + 150)
    .attr("y", variables_y + 150)
    .text('Total treated A: ' + totalATreated);

var totalBTreatedText = svg.append("text")
    .attr("x", variables_x + 150)
    .attr("y", variables_y + 175)
    .text('Total treated B: ' + totalBTreated);

var totalACuredText = svg.append("text")
    .attr("x", margin / 2)
    .attr("y", svg_height)
    .text('Total Cured by A: ' + totalACured);

var totalBCuredText = svg.append("text")
    .attr("x", margin + mainBox_width + (margin / 2))
    .attr("y", svg_height)
    .text('Total cured by B: ' + totalBCured);

var dayNumber = svg.append("text")
    .attr("x", margin + mainBox_width/2 - 50)
    .attr("y", svg_height - mainBox_height - 50)
    .text('Day Number: ' + (counter + 1));

var stepCounter = 0;

      svg.on("click", function () {
        //console.log(stepCounter);
        if(stepCounter === 0) { // moves cured bars
          syringeA.transition()
                      .duration(1000)
                      .attr('width', curedABefore_width(counter))
                      .text('Treated with A: ' + gameData[counter].treatedA);
          syringeB.transition()
                      .duration(1000)
                      .attr('x', syringe_x + mainBox_width - curedBBefore_width(counter))
                      .attr('width', curedBBefore_width(counter))
                      .text('Treated with B: ' + gameData[counter].treatedB);
          //dailyCuredA.attr("x", )
          symp.transition()
              .duration(1000)
              .attr('height', (mainBox_width - curedABefore_width(counter) - curedBBefore_width(counter)) * symp_height(counter) / mainBox_width);
          sickText.text('Sick: ' + (gameData[counter].totalSymp - gameData[counter].curedA - gameData[counter].curedB));
          dailyCuredA.transition()
                      .duration(1000)
                      .attr("x", margin + curedABefore_width(counter))
                      .text('Cured by A: ' + gameData[counter].curedA);
          dailyCuredB.transition()
                      .duration(1000)
                      .attr("x", margin + mainBox_width - curedBBefore_width(counter))
                      .text('Cured by B: ' + gameData[counter].curedB);
          stepCounter ++;
        } else if(stepCounter === 1) { // pushes cured bars and treated bars and displays ratio bars
          totalATreated += gameData[counter].treatedA;
          totalBTreated += gameData[counter].treatedB;
          totalACured += gameData[counter].curedA;
          totalBCured += gameData[counter].curedB;
          syringeA.transition()
                      .duration(1000)
                      .attr('width', 0);
          syringeB.transition()
                      .duration(1000)
                      .attr('x', syringe_x + mainBox_width)
                      .attr('width', 0);
          dailyCuredA.transition()
                      .duration(1000)
                      .attr("x", margin)
                      .text(0);
          dailyCuredB.transition()
                      .duration(1000)
                      .attr("x", margin + mainBox_width)
                      .text(0);
          ratioABar.transition()
                     .duration(1000)
                     .attr('y', testTubeA_y - (totalACured / totalATreated) * mainBox_height)
                     .attr('height', (totalACured / totalATreated) * mainBox_height);
          ratioBBar.transition()
                     .duration(1000)
                     .attr('y', testTubeB_y - (totalBCured / totalBTreated) * mainBox_height)
                     .attr('height', (totalBCured / totalBTreated) * mainBox_height);
          totalATreatedText.text('Total treated A: ' + totalATreated);
          totalBTreatedText.text('Total treated B: ' + totalBTreated);
          dailyCuredA.text('Cured by A: ' + gameData[counter].curedA);
          dailyCuredB.text('Cured by B: ' + gameData[counter].curedB);
          totalACuredText.transition()
                          .duration(1000)
                          .attr("y", svg_height - (totalACured / totalATreated) * mainBox_height)
                          .text('Total Cured by A: ' + totalACured);
          totalBCuredText.transition()
                          .duration(1000)
                          .attr("y", svg_height - (totalBCured / totalBTreated) * mainBox_height)
                          .text('Total Cured by B: ' + totalBCured);
          stepCounter++;
        }  else if(stepCounter === 2) { // adjust bars for the next day
          counter++;
          symp.transition()
              .duration(1000)
              .attr('height', symp_height(counter));
          sickText.text('Sick: ' + gameData[counter].totalSymp);
          dayNumber.text('Day Number: ' + (counter + 1));
          dailyTreatedA.text('Treated by A: ' + gameData[counter].treatedA);
          dailyTreatedB.text('Treated by B: ' + gameData[counter].treatedB);
          stepCounter = 0;
        }

    });
});
