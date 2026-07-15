const cloudinary = require("../config/cloudinary");
const pool = require("../index");
const path = require("path");
const fs = require("fs");

const imagesDir = path.join(__dirname, "../../frontend/public/images");

const imageMap = {
  "one.jpg": 1,
  "two.jpg": 2,
  "three.jpg": 3,
  "four.jpg": 4,
  "five.jpg": 5,
  "six.jpg": 6,
  "seven.jpg": 7,
  "eight.jpg": 8,
  "nine.jpg": 9,
  "ten.jpg": 10,
};

async function uploadSeedImages() {
  try {
    for (const [filename, postId] of Object.entries(imageMap)) {
      const filePath = path.join(imagesDir, filename);

      if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${filename} — file not found`);
        continue;
      }

      console.log(`Uploading ${filename}...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "statecraft-blog",
        public_id: `post-${postId}`,
      });

      await pool.query("UPDATE posts SET image = $1 WHERE id = $2", [
        result.secure_url,
        postId,
      ]);

      console.log(`Updated post ${postId} with ${result.secure_url}`);
    }

    console.log("All seed images uploaded successfully!");
  } catch (error) {
    console.error("Upload failed:", error.message);
  } finally {
    await pool.end();
  }
}

uploadSeedImages();
