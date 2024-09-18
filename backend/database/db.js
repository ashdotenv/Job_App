import mongoose from 'mongoose'
const connectToDb = () => new Promise((res, rej) => {
    mongoose.connect(process.env.DB_URI).then(() => {
        res("DB Connected")
    }).catch((e) => {
        rej(e.message)
    })
})
export default connectToDb