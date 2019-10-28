const app = require('./config/server')

const port =  process.env.PORT || 8080;

app.listen(port, () => console.log(`Delivery homework app listening on port ${port}!`))