const dbconfig = require("../Config/dbconfig");

const { Sequelize, DataTypes, BelongsTo } = require("sequelize");

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
  operatorsAliase: false,

  pool: {
    max: dbconfig.pool.max,
    min: dbconfig.pool.min,
    acquire: dbconfig.pool.acquire,
    idle: dbconfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./productModel")(sequelize, DataTypes);
db.reviews = require("./reviewModel")(sequelize, DataTypes);
db.category = require("./Category")(sequelize, DataTypes);

db.sequelize
  .sync({
    force: false,
  })

  .then(() => {
    console.log("yes re-sync done!");
  });

db.category.hasMany(db.products, {
  foreignKey: "category_id",
  as: "product",
});
db.products.belongsTo(db.category, {
  foreignKey: "category_id",
  as: "categoryAssociation",
});

db.products.hasMany(db.reviews, {
  foreignKey: "product_id",
  as: "review",
});

db.reviews.belongsTo(db.products, {
  foreignKey: "product_id",
  as: "product",
});

module.exports = db;
