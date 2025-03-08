# ImagePainter

ImagePainter is a simple and efficient tool for painting images. Built with Deno, it provides a variety of features to enhance your image editing experience.

## Features

- Easy-to-use 
- Support for multiple image formats
- Edit images with SkeletStyle with arrays example : 
[ [0,0,0,0,0,0],
  [1,1,1,1,1,1],
  [0,0,1,1,0,0],
  [0,0,0,0,0,0],
]
- borders you can change the border Width and also weather you want border on top ,buttom ,left or right
## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License.

EXAMPLES:
make sure to allow read and write acess if u use deno deno run --allow-read --allow-write your_script.ts


```ts

// Create an instance of ImagePainter
const painter = new ImagePainter();

// Example 1: Draw a border on a single image
await painter.drawBorderonImage("sample.jpg", { size: 10, top: true, bottom: true, left: true, right: true });

// Example 2: Process all images in a folder
await painter.drawonImages("./images", [
  [1, 0, 1],  // A simple 3x3 mask for testing (1 = paint, 0 = leave)
  [0, 1, 0],
  [1, 0, 1],
]);

// Example 3: Generate skeleton info for an image (prints to console)
const skeletonData = painter.getSkeletInfo("sample.jpg");
console.log(skeletonData);
