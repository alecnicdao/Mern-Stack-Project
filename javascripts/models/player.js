import mongoose from 'mongoose'

const Schema = mongoose.Schema

let reviewSchema = new Schema({
    comment: String,
    posted_at: Date
})

let playerSchema = new Schema({
    year: Number,
    name: String,
    team: String,
    description: String,
    position: String,
    number: Number,
    nickname: String,
    rating: Number,
    birthdate: Date,
    drafted: Number,
    allstarVotes: Number,
    poster: String,
    added_at: Date,
    updated_at: Date,
    reviews: [ reviewSchema ]
})

playerSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

playerSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})
export let Player = mongoose.model("Player", playerSchema)