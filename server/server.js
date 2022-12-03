const express = require('express');
const db = require('./config/connection');
// import ApolloServer
const {ApolloServer} = require('apollo-server-express');
// import typeDefs and resolvers
const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const path = require('path');
// import our backend stock manager
const { updateStock } = require('./utils/stockManager');

const PORT = process.env.PORT || 3001;

// create a new Apollo server and pass in our schema data
const server = new ApolloServer(
  {
    typeDefs,
    resolvers, 
    context:authMiddleware
  }
)

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Server up static assets
// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({app});

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT} at ${server.graphqlPath}!`);
      // once our db is open and our app is listening, run our backend stockManager func
      updateStock();
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);

