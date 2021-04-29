const app = require('../app')
const db = require('../model/db')

const PORT = process.env.PORT || 4000

db.then(() => {
    app.listen(PORT, () => {
        console.log(`Start our server on port ${PORT}`)
    })
}).catch(err => {
    console.log(`Server not running. Error message: ${err.message}`)
})
