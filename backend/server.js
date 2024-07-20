import app from "./app.js";
import cloudinary from "cloudinary";
//mai file for nodemon!
cloudinary.v2.config({
  //cloudinary configuration here!
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running On ${process.env.PORT}`);
});
