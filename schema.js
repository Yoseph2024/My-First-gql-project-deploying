const { query } = require("express");
const { 
    GraphQLSchema,
    GraphQLObjectType, 
    GraphQLList, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLFloat } = require("graphql");
    const Products = require('./db.json');
    const RatingSchema = new GraphQLObjectType({
        name: "RatingSchema",
        fields: () => {
            return{
                rate:{type: GraphQLFloat},
                count: {type: GraphQLInt}
            }
        }
    })

const ProductSchema = new GraphQLObjectType({
    name:"ProductSchema",
    fields: () => {
        return{
            id: {type: GraphQLInt},
            title:{type:GraphQLString} ,
            price: {type:GraphQLFloat},
            description:{type:GraphQLString} ,
            category:{type: GraphQLString} ,
            image: {type: GraphQLString},
            rating:{type:RatingSchema}
           
        }
    }

})
const Query = {
    getProducts: {
        type: new GraphQLList(ProductSchema), 
        args: {count:{type: GraphQLInt}},
        resolve:(resolve,args) =>{
            // if you are using SQL use  SELECT * FROM products
            // if you are using MongoDB   use products.find().limit(count)
           const _list = Products.slice(0, args.count)
        return _list
     
        }      
    }
}
const Queries = new GraphQLObjectType({
    name: "Queries",
    fields: Query
})
const schema = new GraphQLSchema({
    query: Queries 
});
module.exports =  schema;