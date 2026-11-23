const mongoose=require('mongoose')

const blacklistTokenSchema= new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

// Automatically delete blacklisted tokens after 24 hours
blacklistTokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 86400 }
);

const tokenBlacklistModel= mongoose.model("blacklistTokens",blacklistTokenSchema)

module.exports=tokenBlacklistModel