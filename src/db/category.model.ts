import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null, index: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
});

categorySchema.index({ name: 1 });

export default mongoose.model('Category', categorySchema);