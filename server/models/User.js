import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Animal'
    }],
    visitHistory: [{
      exhibit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exhibit'
      },
      date: {
        type: Date,
        default: Date.now
      }
    }]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.virtual('isAdmin').get(function() {
  return this.role === 'admin'
})

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() })
}

const User = mongoose.model('User', userSchema)

export default User