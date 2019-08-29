const app = require('./config/server')

const port = 3000

app.listen(port, () => console.log(`Delivery homework app listening on port ${port}!`))