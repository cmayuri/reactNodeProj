const db = require('../Models');


// main modles
const Category = db.category
const Product = db.products


// functions
const addCategory = async (req, res)=>{
    let data = {
        title: req.body.title
    }

    const category = await Category.create(data)
    res.status(200).send(category)
}

const getAllCategories = async (req, res)=>{
 let category = await Category.findAll({})
 res.status(200).send(category)   
}

const getOneCategory = async (req, res)=>{
    let id = req.params.id
    let category = await Category.findOne({where: {id:id}})
res.status(200).send(category)
}

const updateCategory = async (req, res)=>{
    let id = req.params.id
const category = await Category.update(req.body,{where:{id:id}})
res.status(200).send(category)
}

const deleteCategory = async (req, res)=>{
    let id = req.params.id
    await Category.destroy({where:{id:id}})
    res.status(200).send('category is deleted')
}

const getCategoryProducts = async (req,res)=>{
    const id = req.params.id
    const data = await Category.findOne({
        include: [{
            model: Product,
            as: 'product'
        }],
        where:{id: id }
    })
    res.status(200).send(data)
}


module.exports = {
    addCategory,
    getAllCategories,
    getCategoryProducts,
    getOneCategory,
    updateCategory,
    deleteCategory
}