const LocalStrategy = require('passport-local').Strategy
import { User } from '../models/user'
export const strategy = new LocalStrategy(
    function(username, password, done){
        User.findOne({username: username}, (err, user) =>{
            if(err){
                return done(err)
            }else{
                if(!user){
                    return done(null, false, {message: "User not found"})
                }else{
                    if(!user.isValidPassword(password)){
                        return done(null, false, {message: "Incorrect password"})
                    }else{
                        return done(null, user)
                    }
                }
            }
        })
    }
)