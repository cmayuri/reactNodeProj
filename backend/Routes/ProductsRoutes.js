const ProductsController = require("../Controllers/ProductsController");
const ReviewController = require("../Controllers/reviewController");
// const CategoryConatroller = require('../Controllers/CategoryConatroller')

const router = require("express").Router();

router.post("/addProduct/:id", ProductsController.addProduct);

router.get("/allProducts", ProductsController.getAllProducts);

router.get("/published", ProductsController.getPublishedProduct);

router.post("/addReview/:id", ReviewController.addReview);
router.get("/allReviews", ReviewController.getAllReviews);
router.get("/getProductReviews/:id", ProductsController.getProductReviews);

router.get("/paginatedProduct", ProductsController.paginatedProduct);

router.get("/:id", ProductsController.getOneProduct);
router.put("/:id", ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);

module.exports = router;
