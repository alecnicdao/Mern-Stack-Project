import { Player } from '../models/player'

// GET /api/players
export const allPlayersAPI = (req, res, next) => {
    Player.find().select('-reviews').exec((err, players) => {
        if(err){
            res.json({success: false, message: "Query failed"})
            res.end()
        }else {
            res.write(JSON.stringify(players))
            res.end()
        }
    })
}

//GET /api/players/:id
export const onePlayerAPI = (req, res, next) => {
    Player.find({_id: req.params.id}).select('-reviews').exec((err, player) => {
        if(err){
            res.json({success: false, message: "Query failed"})
            res.end()
        }else {
            res.write(JSON.stringify(player))
            res.end()
        }
    })
}

//POST /api/players
export const createPlayerAPI = (req, res, next) => {
    let player = new Player(req.body)
    player.added_at = new Date()
    player.updated_at = new Date()
    player.save(err => {
        if(err){
            res.json({success: false, message: "Player creation failed"})
            res.end()
        }else {
            res.end()
        }
    })
}

//PUT /api/players/:id
export const updatePlayerAPI = (req, res, next) => {
    Player.findOne({_id: req.params.id}).select('-reviews').exec((err, player) => {
        if(err){
            res.json({success: false, message: "Unable to update"})
            res.end()
        }else {
            Object.assign(player, req.body)
            player.updated_at = new Date()
            player.save(err => {
                if(err){
                    res.json({success: false, message: "Unable to update player"})
                    res.end()
                }else {
                    res.end()
                }
            })
        }
    })
}

//DELETE /api/players/:id
export const deletePlayerAPI = (req, res, next) => {
    Player.findOne({_id: req.params.id}).select('-reviews').exec((err, player) => {
        if(err){
            res.json({success: false, message: "Unable to delete"})
            res.end()
        }else {
            Player.findByIdAndDelete(req.params.id, err => {
                if(err){
                    res.json({success: false, message: "Unable to delete player"})
                    res.end()
                }else {
                    res.end()
                }
            })
        }
    })
}