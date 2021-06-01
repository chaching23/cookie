var AWS = require("aws-sdk");


const client = new ApolloClient({
    uri: "https://aua3cktr5jbktcczt32tvdnxzm.appsync-api.us-east-2.amazonaws.com/graphql",
    cache: new InMemoryCache(),
    headers: { "x-api-key": "da2-2mbfen7lczer3b6yibh6iy5ipu" },
  });


exports.handler = async (event, context, callback) => { 
    const {itemID, sellerID, buyerID} 

    const { data: buyerData, error: buyerError } = await client.query({
        query: getUserQuery, 
        variables: {
          id: buyerID
        }
      });

    if (buyerError || !buyerData) {
        return callback(JSON.stringify({
            errorType: 'NotFound',
            httpStatus: 404,
            requestId: context.awsRequestId,
            message: 'Buyer not found'
        }))
    }

    const { data: sellerData, errors: sellerError } = await client.query({
        query: getUserQuery, 
        variables: {
          id: sellerID
        }
      });

      if (sellerError.length || !sellerData) {
        return callback(JSON.stringify({
            errorType: 'NotFound',
            httpStatus: 404,
            requestId: context.awsRequestId,
            message: sellerError[0].message
        }))
    }

    const { data: itemData, errors: itemError } = await client.query({
        query: gql`
        query getOrder($id: ID!) {
            getOrder(id: $id) {
                seller {
                    id
                }
                item {
                    id
                    // ... rest or recipe
                }
            }
        }`,
        variables: {
          id: itemID,
        }
      });

      if (itemError || !itemData) {
        return callback(JSON.stringify({
            errorType: 'NotFound',
            httpStatus: 404,
            requestId: context.awsRequestId,
            message: 'Order not found'
        }))    }

    if (itemData.sellerId !== sellerID) {
        return callback(JSON.stringify({
            errorType: 'NotFound',
            httpStatus: 404,
            requestId: context.awsRequestId,
            message: 'Seller not found'
        }))    
    }

    const { data, errors } = await client.mutate({
        query: buyRecipeMutation,
        variables: {buyer, seller, order}
      
      })

      if (errors || !data) {
        return callback(JSON.stringify({
            errorType: 'InternalServerError',
            httpStatus: 500,
            requestId: context.awsRequestId,
            message: 'Something went wrong'
        }))    }

return true 
}


async function buyRecipeMutation(buyer, seller, order){

    const docClient = new AWS.DynamoDB.DocumentClient();



  // 1. add buyer to recipe
  try {
    const recipeResult = await docClient.update({ 
        TableName: 'Recipe', 
        Key: { "id" : order.item.id }, 
        UpdateExpression: "SET purchasers = list_append(purchasers, :buyerId)",
        ExpressionAttributeValues: {
            ":buyerId": buyer.id
        }
     });
  } catch (err) {
        console.log('error')
  }


  // 2. buyer.purchasedRecipes add recipe

  try {
    const buyerResult = await docClient.update({ 
        TableName: 'User', 
        Key: { "id" : buyer.id }, 
        UpdateExpression: "SET purchasedRecipes = list_append(purchasedRecipes, :recipeId), buyTransactions =  list_append(buyTransactions, :orderId)",
        ExpressionAttributeValues: {
            ":recipeId": order.item.id,
            ":orderId": order.id
        }
     });
  } catch (err) {
        console.log('error')
  }

  // 2. buyer.buyTransactions add order

  // 3. seller.sellTransactions add order
  try {
    const sellerResult = await docClient.update({ 
        TableName: 'User', 
        Key: { "id" : seller.id }, 
        UpdateExpression: "SET sellTransactions = list_append(sellTransactions, :orderId)",
        ExpressionAttributeValues: {
        ":orderId": order.id,
        }
     });
  } catch (err) {
        console.log('error')
  }
}