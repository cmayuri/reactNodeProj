const CategoryConatroller = require("../Controllers/CategoryConatroller");

const router = require("express").Router();

//  category Routes
router.post("/addCategory", CategoryConatroller.addCategory);
router.get("/allCategories", CategoryConatroller.getAllCategories);
router.get("/getCategoryProducts/:id", CategoryConatroller.getCategoryProducts);

router.get("/:id", CategoryConatroller.getOneCategory);
router.put("/:id", CategoryConatroller.updateCategory);
router.delete("/:id", CategoryConatroller.deleteCategory);
module.exports = router;
