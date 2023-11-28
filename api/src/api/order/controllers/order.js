("use strict");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const generateUniqueId = require('generate-unique-id');
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;
    //console.log(products)
    try {
        var id1 = generateUniqueId({
            length: 9,
            useLetters: false
          });
    //   const lineItems = await Promise.all(
    //     products.map(async (product) => {
    //       const item = await strapi
    //         .service("api::product.product")
    //         .findOne(product.id);
    //         // console.log(product);
    //         // console.log(item);

    // //         const mostRecentPreorder = await strapi
    // //   .query("products")
    // //   .model.query((qb) => {
    // //     qb.orderBy("id", "DESC").limit(1);
    // //   })
    // //   .fetch();

    //           //const hello=await strapi.query("api::preorder.preorder").findMany({ _sort: 'id:asc' });
    //           const hello=await strapi.entityService.findMany('api::preorder.preorder', {
    //             sort: 'id:desc',
    //           });
    //           //console.log(hello[0]);
    //           const did=hello[0].id;
    //           const amt=await strapi.query("api::preorder.preorder").findOne({
    //             select:['amount'],
    //             where: { id: did }
    //           });
    //           console.log(amt.amount);
    //        // console.log(mostRecentPreorder);


    //       return {
    //         price_data: {
    //           currency: "inr",
    //           product_data: {
    //             name: item.Title,
                
                
    //           },
    //           unit_amount: Math.round(amt.amount * 100),
    //         },
            
    //         quantity: 1,
    //       };
    //     })
    //   );

      const hello=await strapi.entityService.findMany('api::preorder.preorder', {
        sort: 'id:desc',
      });
      console.log(hello[0]);
      console.log(id1);
      
      const did=hello[0].id;
      const amt=await strapi.query("api::preorder.preorder").findOne({
        select:['price'],
        where: { id: did }
      });
      //console.log(amt);
      const lineItems1= [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          
          quantity: 1,
          price_data:{
            currency:"inr",
            product_data:{
                name:"Your Products"
            },
            unit_amount: Math.round(amt.price*100),
          }
        },
      ]

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {allowed_countries: ['US', 'CA','IN']},
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL+"/paymentsuccess",
        cancel_url: process.env.CLIENT_URL+"?success=false",
        line_items: lineItems1,
      });

      await strapi
        .service("api::order.order")
        .create({ data: {  products, stripeId: session.id ,OrderID:id1} });
      return { stripeSession: session };
    } catch (error) {
        console.log(error)
      ctx.response.status = 500;
      return { error };
    }
  },
}));