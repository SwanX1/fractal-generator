// arguments: $width, $height, $tileX, $tileY, $totalTilesX, $totalTilesY, $cx, $cy, $centerX, $centerY, $scale

// Iterations of function before we determine if the set contains the point or not
const iterations = 2048;

// Calculate actual x,y coordinates for the whole image
const x = this.thread.x + ($width * $tileX);
const y = this.thread.y + ($height * $tileY);
const width = $width * $totalTilesX;
const height = $height * $totalTilesY;

// Scale of shader
const scale = $scale;

// Normalize x,y values to [0.0, 1.0] range
x = x / width;
y = y / height;

// Calculate scaled x,y values, offset x by -0.7 to put set comfortably in the image
// For this set, the first "bulb"'s connection to the main one is in the middle of the image
x = ((-scale + 2 * scale * x) * width) / height + $centerX;
y = -scale + 2 * scale * y + $centerY;

// Create vector array for ease of use
let vector = [x, y];
// Length of vector
let length = 0;
// Iterations (stops counting when vector is longer than Math.E)
let loops = 0;

// Smooth color gradient value depending on how many iterations before we stopped the loop
let gradient = Math.exp(-Math.sqrt(vector[0] ** 2 + vector[1] ** 2));

// If there's a chance of the point of being in the set
let inSet = true;

for (let j = 0; j < iterations; j++) {
  // Apply function (f(z)=z^2+c) to vector
  // https://en.wikipedia.org/wiki/Mandelbrot_set#Formal_definition
  vector = [
    vector[0] ** 2 - vector[1] ** 2 + x,
    2 * vector[0] * vector[1] + y
  ];
  // Increment iteration count
  loops++;
  // Calculate length of vector
  length = Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
  // Calculate this iteration's smooth color gradient
  gradient += Math.exp(-length);
  // Break if length is greater than 2
  // 2 has been replaced by Math.E, because that stops a circular sudden gradient stop at r=2
  // Based on the exponent function, this should be Math.E, because at Math.E the gradient hits 0
  if (length > 2) {
    inSet = false;
    if (length > Math.E) {
      break;
    }
  }
}

// Initialize color values
let r = 0;
let g = 0;
let b = 0;
// If we did not iterate the full amount, that means the point diverged and it's not in the set.
if (!inSet) {
  // Calculate the blue color value based on the smooth gradient
  b = 1 / Math.PI + 0.7 * Math.sin(gradient / 10);
  // Green and red color values fall off to 0 exponentially when there's a lower gradient value
  g = b ** 2;
  r = b ** 3;
}

// Return RGBA color values normalized to the [0.0 - 1.0] range.
// We put them in a [0 - 255] range on the CPU, when writing color values to the image.
return [r, g, b, 1.0];
