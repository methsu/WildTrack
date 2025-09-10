import mongoose from 'mongoose'

const exhibitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: true,
    enum: ['safari', 'tropical', 'arctic', 'desert']
  },
  image: {
    type: String,
    required: [true, 'Please add an image']
  },
  openingHours: {
    type: String,
    required: [true, 'Please add opening hours']
  },
  popularity: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  capacity: {
    type: Number,
    required: [true, 'Please add capacity']
  },
  animals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal'
  }],
  features: [{
    type: String
  }],
  accessibility: {
    wheelchairAccessible: {
      type: Boolean,
      default: true
    },
    guidedToursAvailable: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for checking if exhibit is at capacity
exhibitSchema.virtual('isAtCapacity').get(function() {
  return this.animals.length >= this.capacity
})

export default mongoose.model('Exhibit', exhibitSchema)