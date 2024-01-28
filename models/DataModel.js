import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  seva: {
    type: String,
    required: true,
  },
});

const DataModel = mongoose.model('Data', dataSchema);

export default DataModel;