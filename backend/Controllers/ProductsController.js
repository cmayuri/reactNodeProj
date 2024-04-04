const db = require("../Models");

// create main modles

const Product = db.products;
const Review = db.reviews;

// main work

// 1 create product

const addProduct = async (req, res) => {
  const id = req.params.id;
  let info = {
    category_id: id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    published: req.body.published ? req.body.published : false,
  };

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
};

// 2. get all products

const getAllProducts = async (req, res) => {
  let products = await Product.findAll({});
  res.status(200).send(products);
};

// 3. get single Products

const getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

// 4 update products
const updateProduct = async (req, res) => {
  let id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).send(product);
};

// 5.delete product
const deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { id: id } });
  res.status(200).send("product is deleted");
};
//  6.published product
const getPublishedProduct = async (req, res) => {
  const products = await Product.findAll({ where: { published: true } });

  res.status(200).send(products);
};

// 7. coonect one tow many ralation product and review

const getProductReviews = async (req, res) => {
  const id = req.params.id;
  const data = await Product.findOne({
    include: [
      {
        model: Review,
        as: "review",
      },
    ],
    where: { id: id },
  });
  res.status(200).send(data);
};

const paginatedProduct = async (req, res) => {
  const allProduct = await Product.findAll({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  const results = {};
  results.totalProducts = allProduct.length;
  results.pageCount = Math.ceil(allProduct.length / limit);
  if (lastIndex < allProduct.length) {
    results.next = {
      page: page + 1,
    };
  }

  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    };
  }

  results.result = allProduct.slice(startIndex, lastIndex);
  res.status(200).send(results);
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProduct,
  getProductReviews,
  paginatedProduct,
};
