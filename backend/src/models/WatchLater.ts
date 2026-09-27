import mongoose, { Document, Schema } from 'mongoose';

export interface IWatchLater extends Document {
  userId: mongoose.Types.ObjectId;
  videoId: string;
  title: string;
  thumbnail: string;
  badge: 'Top 1' | 'Top 2' | 'Top 3';
  savedAt: Date;
}

const WatchLaterSchema = new Schema<IWatchLater>(
  {
    userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    videoId:   { type: String, required: true },
    title:     { type: String, required: true },
    thumbnail: { type: String, default: '' },
    badge:     { type: String, enum: ['Top 1', 'Top 2', 'Top 3'], required: true },
    savedAt:   { type: Date, default: Date.now },
  },
  { timestamps: false }
);

// Prevent duplicate saves — same user can't save same video twice
WatchLaterSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export default mongoose.model<IWatchLater>('WatchLater', WatchLaterSchema);
