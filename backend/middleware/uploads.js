const multer = require("multer");
const path = require("path");
const fs = require("fs");

const sanitizeName = (name) =>
  (name || "product")
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

// PRODUCT STORAGE
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const safeProductName = sanitizeName(req.productName);

    try {
      if (file.fieldname === "product_video") {
        const ext = path.extname(file.originalname).toLowerCase();

        const allowedVideos = [".mp4", ".mov", ".avi", ".mkv", ".webm"];

        if (
          !file.mimetype.startsWith("video/") &&
          !allowedVideos.includes(ext)
        ) {
          return cb(new Error("Only video files are allowed"));
        }

        const dir = path.join("uploads/products/videos", safeProductName);

        fs.mkdirSync(dir, { recursive: true });
        return cb(null, dir);
      }

      if (file.fieldname === "product_image") {
        const dir = path.join("uploads/products/images", safeProductName);

        fs.mkdirSync(dir, { recursive: true });
        return cb(null, dir);
      }

      return cb(new Error("Invalid file field"));
    } catch (err) {
      cb(err);
    }
  },

  filename: (req, file, cb) => {
    const now = new Date();

    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}`;

    const ext = path.extname(file.originalname);

    if (file.fieldname === "product_video") {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

      return cb(null, `video_${timestamp}_${uniqueSuffix}${ext}`);
    }

    req.uploadCounter = (req.uploadCounter || 0) + 1;

    cb(null, `${req.uploadCounter}_${timestamp}${ext}`);
  },
});
const brandStorage = multer.diskStorage({
  // It store uploaded files on the system's disk storage
  destination: (req, file, cb) => {
    cb(null, "uploads/brands"); // All uploaded files will be stored in this uploaded folder !
  },
  filename: (req, file, cb) => {
    try {
      //Controls the name of the files like what name will be there for the file
      const brandName = req.body.brand_name || "brand";
      console.log("Here is brand_name", brandName);

      //  SANITIZE BRAND NAME
      const safeBrandName = brandName
        .toLowerCase()
        .replace(/\s+/g, "_") // It replace spacing with _
        .replace(/[^a-z0-9_]/g, ""); // It removes unwanted characters/symbols

      const date = new Date();
      const timestamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

      const ext = path.extname(file.originalname);

      const finalName = `${safeBrandName}_${timestamp}${ext}`;

      cb(null, finalName);
    } catch (error) {
      cb(error);
    }
  },
});


const catStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/categories");
  },
  filename: (req, file, cb) => {
    try {
      const catName = req.body.cat_name || "category";

      const safeCatName = catName
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");

      const date = new Date();
      const timestamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

      const ext = path.extname(file.originalname);

      cb(null, `${safeCatName}_${timestamp}${ext}`);
    } catch (error) {
      cb(error);
    }
  },
});

// const productStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/products");
//   },

//   filename: (req, file, cb) => {
//     const productName = req.body.product_name || "product";

//     const safeProductName = productName
//       .toLowerCase()
//       .replace(/\s+/g, "_")
//       .replace(/[^a-z0-9_]/g, "");

//     const ext = path.extname(file.originalname);

//     // ✅ RESET ON FIRST FILE OF REQUEST
//     if (req.uploadCounter === undefined) {
//       req.uploadCounter = 1;
//     } else {
//       req.uploadCounter += 1;
//     }

//     cb(null, `${safeProductName}_${req.uploadCounter}${ext}`);
//   },
// });
// FILE FILTER WHICH ACCEPT REQUIRED FILES !

// PRODUCT FILE-FILTER
const productFileFilter = (req, file, cb) => {
  // IMAGE FILED
  if (file.fieldname === "product_image") {
    const allowedImageTypes = /jpeg|jpg|png|webp|avif/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedImageTypes.test(ext) && allowedImageTypes.test(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error("Only image files allowed"));
  }

  // VIDEO FIELD
  if (file.fieldname === "product_video") {
    const allowedVideoTypes = /mp4|mov|avi|mkv|webm/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedVideoTypes.test(ext) || file.mimetype.startsWith("video/")) {
      return cb(null, true);
    }

    return cb(new Error("Only video files are allowed"));
  }
  cb(new Error("Unexpected field"));
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|avif/;
  const ext = path.extname(file.originalname).toLowerCase();
  console.log("Here is file extension", ext);
  const mime = file.mimetype;
  console.log("Mime Type : ", mime);

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpg, png, webp)"));
  }
};

module.exports = {
  brandStorage: multer({
    storage: brandStorage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  }),

  // NEW: category image upload - same image-only fileFilter as brands.
  catStorage: multer({
    storage: catStorage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  }),

  productStorage: multer({
    storage: productStorage,
    fileFilter: productFileFilter,
    limits: {
      fileSize: 100 * 1024 * 1024,
    },
  }),

  // NEW: exported so the product_media controllers can build a media_url
  // that matches the per-product subfolder Multer actually saved the file
  // into, using the exact same sanitization (no risk of the controller's
  // copy drifting out of sync with this one).
  sanitizeName,
};
