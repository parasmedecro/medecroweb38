import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID (automatically added)
  gender: { type: String, required: true }, // "0" for Male, "1" for Female
  age: { type: Number, required: true },
  height: { type: Number, required: true }, // in cm
  weight: { type: Number, required: true }, // in kg
  smokingHabit: { type: String, required: true }, // "0" for non-smoker, "1" for smoker
  cigarettesPerDay: { type: Number, default: 0 }, // If smoker, the number of cigarettes
  alcoholIntake: { type: String, required: true }, // "0" for non-drinker, "1" for drinker
  physicalActivity: { type: String, required: true }, // "0" to "3" (Sedentary to Active)
  heartRate: { type: Number, required: true }, // in bpm
}, {
  timestamps: true,
});

export default mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);
