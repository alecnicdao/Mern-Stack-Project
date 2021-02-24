import mongoose from 'mongoose'

const Schema = mongoose.Schema

let contactSchema = new Schema({
    name: String,
    email: String,
    message: String
})

export let Contact = mongoose.model("Contact", contactSchema)