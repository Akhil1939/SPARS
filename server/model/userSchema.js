const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    mname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    erNo:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cPassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
    
})

//hash function
userSchema.pre('save', async function (next){
    // console.log('code from inside');
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cPassword =await bcrypt.hash(this.cPassword, 12);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token});
        this.save();
        return token;
    }catch(err){
        console.log(err)

    }
}
 
const User = mongoose.model('USER', userSchema);

module.exports = User;