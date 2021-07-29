// Author:Myles Wilkerson

// Global UI Variables
let canvasDiv;
let canvas;
let textDiv;
let textP;
let time;

//Global ML Variables
let detector;
let img;

function setup() {
  //Build UI
  canvasDiv = createDiv();
  canvas = createCanvas(640, 400);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("model loading, please wait.....");
  textP.parent(textDiv);
  //load the image 
  img = loadImage("download (1).jpeg", imageLoaded);
  time = 0;
}

function draw() {

}

function imageLoaded() {
  image(img, 0, 0, width, height);
  detector = ml5.objectDetector("cocossd", modelReady);
}

function modelReady() {
  detector.detect(canvas, gotResults);
}

function drawLabel(object) {
  // Draw a rectangular outline around the object
  stroke(0, 255, 0);
  noFill();
  rect(object.x, object.y, object.width, object.height);
  // Draw the label and its confidence value near the object
  noStroke();
  fill(255, 0, 0);
  textSize(20);
  let label = object.label;
  let confidence = round(object.confidence, 2) * 100;
  text(label + ": " + confidence + "%", object.x + 10, object.y + 20);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    //console.log(results);
    for (let i = 0; i < results.length; i++) {
      drawLabel(results[i]);
      // count the number of cars, add 5 to time for each car
      if (results[i].label === "car") {
        time += 5;
      }
    }
    textP.html("your wait will be " + time + " minutes");
  }
}
