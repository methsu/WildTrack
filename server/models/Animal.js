import mongoose from 'mongoose'

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  species: {
    type: String,
    required: [true, 'Please add a species'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Please add an age']
  },
  category: {
    type: String,
    required: true,
    enum: ['big-cats', 'primates', 'birds', 'reptiles', 'marine']
  },
  habitat: {
    type: String,
    required: [true, 'Please add a habitat']
  },
  diet: {
    type: String,
    required: [true, 'Please add diet information']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  images: [{
    type: String,
    required: [true, 'Please add at least one image']
  }],
  conservation: {
    status: {
      type: String,
      required: true,
      enum: ['Extinct', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern']
    },
    population: String,
    threats: [String]
  },
  schedule: [{
    time: String,
    activity: String
  }],
  exhibit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exhibit',
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Animal', animalSchema)