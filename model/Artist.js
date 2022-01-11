const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: String,
    isBand: Boolean,
    description: String,
    styles: {
      type: [Schema.Types.ObjectId],
      ref: "style"
    },
    picture: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg",
    },
  },
  { timestamps: true }
);

const ArtistModel = mongoose.model("artist", artistSchema);

module.exports = ArtistModel;
