// Commonjs way
const express = require("express");
const server = express();
const glHandler = require('express-graphql');
const schema = require("./schema");
const cors = require('cors')

server.use(cors());
// express Routing
server.all('/graphql', glHandler({
    schema: schema,
    graphiql: true

})
)

// port 3001
const PORT = 3001;
const HostName = "localhost";

server.listen(PORT, HostName, () => {
    console.log(`Server is Running at http://${HostName}:${PORT}`);
});
