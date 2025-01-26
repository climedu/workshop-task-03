# workshop-task-3
Here is a URL to the webpage for this project: [link]( https://climedu.github.io/workshop-task-3/)

## Task
- Collect a series of images. Make a p5.js sketch that generates a new collage each time the sketch is run.
- Include manipulations of the images so that they change over time, using filters and/or other kinds of computational interventions.
- Make a new repository for your p5.js project on your GitHub account, publish your sketch as a webpage, and include a README file in your repository with a URL to the webpage along with documentation of your work.

## Overview
- Importing Images
- Experiment with collage
- Add manipulations such as filter and tints
- Changes of the generated images overtime

## Workshop Notes

### Create image.

Create folder (images) > Drag & drop/ file manager to import images. > Make variable for the image (let img;) 
- Preload function
``` ruby
  function preload () { img = loadImage('images/apples.jpg');
}
```

- Put it in draw function
``` ruby
function draw () {
	background(220);
	image(img,0,0);
```

<img width="400" alt="Screenshot 2025-01-26 at 3 45 45 PM" src="https://github.com/user-attachments/assets/343f2418-1331-453a-9744-104c7f08b2b2" />

Still not in the original size. So we can use resize function
Img.resize(300,0); //width and height 0 means don't need to adjust it to specific height, just follow the form the width size.


- Want ot make it in the centre:

```ruby
function draw(){
background (220);
Image(img, width/2, height/2, 100,100); // it won't be in the exact centre
```


<img width="400" alt="Screenshot 2025-01-26 at 3 47 18 PM" src="https://github.com/user-attachments/assets/dadf6f8d-5de7-4b09-9d0a-ab5b7c86ffb3" />

- To make it exact center need to use imgeMode(CENTER);

```ruby
let img;

function preload(){
  img = loadImage('images/apples.jpg');
}

function setup() {
  createCanvas(400,400);
  img.resize(300,0);
}

function draw () {
	background(220);
	imageMode(CENTER);
	image(img, width/2, height/2, 100,100);
}
```
<img width="400" alt="Screenshot 2025-01-26 at 3 49 01 PM" src="https://github.com/user-attachments/assets/a4d2954a-03ae-4918-b578-1ab6355920b2" />

### Modification
- Filter function : gray invert, blur followed by value, posterize  w value
- Tint > tnt(rgb 250,0,0); bellow draw function
  
<img width="400" alt="Screenshot 2025-01-26 at 3 51 37 PM" src="https://github.com/user-attachments/assets/96b467d8-ea1b-41e8-9535-bdb7248ea895" />

### Array (store multiple values)
Instead of let num = 5;
```ruby
let num = [3,5,2,7,20]; //first is index 0, next index 1, next indext 2, then 3 then 4.
```

- For example : Rect(100,100,nums[4], 60) // using item in array, index 4 which is 20.
- Other Example :

  ```ruby
  let names = ["sarah", "james", "kim", "olga"];
  function setup () {
	  createCanvas(400,400);
	 }
  function draw (){
	  background(220);
	  text(names[2]. 20,200);
  }
  ```

- With images
```ruby
let imgs = []
let apples, bananas, pears;

function preload(){
apples = loadImage('images/apples.jpg');
bananas = loadImage('images/bananas.jpg');
pears = loadImage('images/pears.jpg');
}

function setup () {
	createCanvas(400,400);
	imgs.push(apples);
	imgs.push(bananas);
	imgs.push(pears);
	}

function.draw(){
	background(220);
	image(img[2],0,0); 
}
```

- If want to make it random * let r = random(img);
```ruby
let imgs = []
let apples, bananas, pears;

function preload(){
apples = loadImage('images/apples.jpg');
bananas = loadImage('images/bananas.jpg');
pears = loadImage('images/pears.jpg');
}

function setup () {
	createCanvas(400,400);
	frameRate(1);
	imgs.push(apples);
	imgs.push(bananas);
	imgs.push(pears);
	}

function.draw(){
	background(220);
	let r = random(imgs);
	Image(r,0,0);
	}
```
<img width="400" alt="Screenshot 2025-01-26 at 4 28 40 PM" src="https://github.com/user-attachments/assets/d0821d54-8289-4d68-a9f2-9b7af8778b43" />


### Pixels Data
<img width="200" alt="Screenshot 2025-01-26 at 4 29 37 PM" src="https://github.com/user-attachments/assets/4b5bf417-a1e4-4063-9930-98d68ee55836" />

- Example : 8 pixels x 6 pixels = 48 pixels
- 48 pixels x 4 = 192 elements in the array
  
<img width="200" alt="Screenshot 2025-01-26 at 4 32 11 PM" src="https://github.com/user-attachments/assets/51167481-b8d7-43bc-9228-dbb512d1af8d" />

Breakdown : 
- We add 8 to the next row
- The ( x, y )coordinate on the screen is (6,4)
- We can get the number 38 by using this algorithm:
- x + y * width
- 6 + 32 (which from 4*8) = 38

<img width="400" alt="Screenshot 2025-01-26 at 4 35 05 PM" src="https://github.com/user-attachments/assets/f8ea8449-869b-4209-b933-11bdcc832fcb" />

Final algorithm : ( To find the values of given pixel on the screen) 
- (x + y * width )* 4
- 6 + 32 (from 4*8)  * 4
- 38 * 4 = 152
<img width="400" alt="Screenshot 2025-01-26 at 4 37 18 PM" src="https://github.com/user-attachments/assets/5c455b8b-1cd9-4bb3-bcfb-2c35f16a6bdc" />


### Pixels
```ruby
function setup () {
	createCanvas(400,400);
	pixenDensity(1);
	}
	
function draw() {
	background(220);
	
	loadPIxels();
	
	//nested loop (loop inside a loop)
	
	//starting y = 0 , means going on the 1st line to the right before move to the next line
	
	for(let y = 0); y<height; y++){
		for(let x=0; x<width; x ++){
		
		//the nested loop, multiply array four elements at a time
			let index =( x + y * width) * 4;
			pixels[index]  = 0 // red value, calculate
			pixels [ index + 1] = 0 // green value
			pixels [ index + 2] = 0 // blue value
			pixels[index+3] = 255 // alpha value
			
		}
	
	}
	
	updatePIxels(); // need to update the pixels to see the changes
	
}

```
<img width="400" alt="Screenshot 2025-01-26 at 4 38 48 PM" src="https://github.com/user-attachments/assets/2db45639-141b-4ff8-a144-4ddaa2bc990b" />

Height/2, just half of the canvas becomes red

<img width="642" alt="Screenshot 2025-01-26 at 4 39 29 PM" src="https://github.com/user-attachments/assets/f12dc676-5ddc-420e-b193-de96dc94a057" />

Make a static color by putting random in front of the color value

<img width="400" alt="Screenshot 2025-01-26 at 4 40 02 PM" src="https://github.com/user-attachments/assets/078ebf04-e80a-420a-bfe6-c918e76d2cd9" />

When all of the colors are random, became look like the one in the TV 

<img width="400" alt="Screenshot 2025-01-26 at 4 40 27 PM" src="https://github.com/user-attachments/assets/3d3b5d4f-7863-431e-937a-cd5c488c2cad" />

Change it to the immage by adding img. Code infront the pixels code

<img width="400" alt="Screenshot 2025-01-26 at 4 40 59 PM" src="https://github.com/user-attachments/assets/ab775edb-b0bc-4c24-ad4a-ab5233847cb1" />

Besides manipulating images, we can use pixel data to draw things on the screen.

<img width="400" alt="Screenshot 2025-01-26 at 4 42 16 PM" src="https://github.com/user-attachments/assets/e3c746df-4775-459c-8ee0-50878b369f65" />

X and y take random values from width and height. C (colour) taking data from the banana pic. Int(x) int(y) means to transform the x and y to an integer (whole number).

Make sure don't have any stroke.

<img width="400" alt="Screenshot 2025-01-26 at 4 43 04 PM" src="https://github.com/user-attachments/assets/a8004db5-a60a-4506-994f-b46f1ecb3be7" />

Random rectangles appear creating the images.  Kinda abstract, making representation of the image.




## Task Journey
Starting by collecting images from my gallery, which I'd taken by myself before and edited in Adobe Lightroom.



### Process 1
Reference : 
<img width="400" alt="Screenshot 2025-01-26 at 4 46 19 PM" src="https://github.com/user-attachments/assets/bc047848-e90a-4238-ac52-67557edda17d" />

Code : 
<img width="400" alt="Screenshot 2025-01-26 at 4 46 09 PM" src="https://github.com/user-attachments/assets/f33ef651-5b0b-4f4e-b29e-0aa61ceebab1" />

I wanted to make the pics tinted like this, but it didn't work. So instead. I use the tint function > tint(random(255), random(255), random(255));


### Process 2
Make the previous code by stating the x y position and every variable of the image, like width and height, as well.

<img width="400" alt="Screenshot 2025-01-26 at 4 48 07 PM" src="https://github.com/user-attachments/assets/dcc4fffc-8fc6-4a7f-ac73-656328412e75" />

I want it to make 2 different pictures appear at the same time but with random sizes, positions and tints. 

### Process 3
Instead of adding another image(r, xPos, yPos, , newWidth, and newHeight;
I made them have their own variables to separate them.

<img width="400" alt="Screenshot 2025-01-26 at 4 49 52 PM" src="https://github.com/user-attachments/assets/27aca71e-582b-457e-acaa-7af9dce0c1b8" />

### Process 4
I also trying to add with this function create pixelated effect overtime. But this one doesn't work.

<img width="400" alt="Screenshot 2025-01-26 at 4 51 38 PM" src="https://github.com/user-attachments/assets/848cbf5f-7b32-42aa-8fdb-1f6507834f57" />

### Process 5
<img width="600" alt="Screenshot 2025-01-26 at 4 52 07 PM" src="https://github.com/user-attachments/assets/1c7a9267-dfda-448b-b553-b607131084c6" />

After several trying, I landed on this code. It still neede some adjustment to make the pictures have their own tint.

<img width="600" alt="Screenshot 2025-01-26 at 4 55 09 PM" src="https://github.com/user-attachments/assets/83fdb934-1a9e-4351-b0fe-4d1eff29e7d9" />

### Process 6

Changing it to width and height to position the pictures between 0 and the width and height of the canvas. Also experimented adding tint function on the addRandomSquare function, turned out the pics changed together overtime 

<img width="400" alt="Screenshot 2025-01-26 at 4 56 35 PM" src="https://github.com/user-attachments/assets/10eea594-5d30-4d61-8c55-45f43ce053bb" />

### Final Process
<img width="400" alt="Screenshot 2025-01-26 at 4 57 02 PM" src="https://github.com/user-attachments/assets/70707c2b-513f-443f-9d69-a5c674bb4223" />

After trying several times and adding (img) inside the applyRandomFilters function, the filters works

Code : 
```ruby
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
```


### Commentaries
- This code takes times much longer that previous hahaha :)
- Learned new things array
- Learned pixel data
- Experimenting with tint and filters

## Future Development
- More images that appear at the same time
- More efficient code
- Trying different types of outcomes and experimenting with different things
