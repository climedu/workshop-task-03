//need to add some some changes over the time

let imgs = []
let Civic, Green, Iya, Viaduct;
let showText = true; // Variable to control whether the text is displayed
let squares = []; // Array to store square data (position and color)
let currentImages = []; // Store the currently displayed images

function preload(){
Civic = loadImage('images/Civic.jpg');
Green = loadImage('images/Green.jpg');
Iya = loadImage('images/Iya.jpg');
Viaduct = loadImage('images/Viaduct.jpg');
}

function setup () {
	createCanvas(800,800);
	imgs.push(Civic, Green, Iya, Viaduct);
  frameRate(60); // Higher frame rate for smooth rendering
	}

  //Instead of displaying the text all over even after its clicked, I want it to dissapear
  function draw() {
    if (showText) {
      // Display the text only if showText is true
      background(220);
      textFont("Courier New");
      textSize(30);
      fill(0);
      textAlign(CENTER);
      text("Click to Generate 2 Random Images", width / 2, height / 2);
    }else {
      // Redraw the background and images
      background(220);
      for (let img of currentImages) {
        image(img.image, img.x, img.y, img.width, img.height);
      }
  
      // Add one square every second
      if (frameCount % 60 === 0 && currentImages.length > 0) {
        addRandomSquare();
      }
  
      // Draw all the squares
      for (let square of squares) {
        fill(square.color);
        noStroke();
        rect(square.x, square.y, square.size, square.size);
      }
    }
  }

function mousePressed(){
  showText = false; // Set showText to false to hide the text
	background(220);
  squares = []; // Clear existing squares
  currentImages = []; // Clear currently displayed images

  // Select two unique random images
  let r1 = random(imgs);
  let r2 = random(imgs);
  while (r2 === r1) {
    r2 = random(imgs); // Ensure r2 is different from r1
  }

// Calculate random sizes and positions for the images
currentImages.push(createRandomImage(r1));
currentImages.push(createRandomImage(r2));
}


function createRandomImage(img) {
  let maxSize = random(200, 500);
  let aspectRatio = img.width / img.height;
  let width, height;

  //make the image not distorted
  if (aspectRatio > 1) {
    width = maxSize;
    height = maxSize / aspectRatio;
  } else {
    height = maxSize;
    width = maxSize * aspectRatio;
  }

  let x = random(0, width); // Use 'width' for canvas width
  let y = random(0, height); // Use 'height' for canvas height
  let tintColor = [random(255), random(255), random(255)];

  tint(...tintColor); // Apply tint before returning the image object
  let filteredImg = applyRandomFilter(img);
  
  return { image: filteredImg, x, y, width, height, tintColor };
}

function applyRandomFilter(img) {
  let filters = ['GRAY', 'THRESHOLD', 'INVERT', 'POSTERIZE', 'BLUR', 'ERODE', 'DILATE'];
  let randomFilter = random(filters);

  // Create a copy of the image to apply the filter
  let imgCopy = img.get();

  // Apply the selected filter to the copied image
  if (randomFilter === 'POSTERIZE') {
    imgCopy.filter(POSTERIZE, int(random(2, 5))); // Posterize with random levels
  } else if (randomFilter === 'BLUR') {
    imgCopy.filter(BLUR, random(1, 3)); // Blur with a random intensity
  } else if (randomFilter === 'GRAY') {
    imgCopy.filter(GRAY); // Apply gray filter
  } else if (randomFilter === 'INVERT') {
    imgCopy.filter(INVERT); // Apply invert filter
  } else if (randomFilter === 'ERODE') {
    imgCopy.filter(ERODE); // Apply erode filter
  } else if (randomFilter === 'DILATE') {
    imgCopy.filter(DILATE); // Apply dilate filter
  }

  return imgCopy;  // Return the filtered image
}

//original color of the pics
function addRandomSquare() {
  //tint(random(255), random(255), random(255));
  if (currentImages.length === 0) return;

  // Select a random image from the current images
  let img = random(currentImages);
  let imgX = img.x;
  let imgY = img.y;

  // Generate a random position within the selected image. Trying with + and -
  let x = random(imgX, imgX + img.width);
  let y = random(imgY, imgY + img.height);

  // Get the color at the random position from the image
  let c = img.image.get(int((x - imgX) * (img.image.width / img.width)), int((y - imgY) * (img.image.height / img.height)));
  // Add the square data to the array
  squares.push({ x, y, size: 20, color: c });
}



