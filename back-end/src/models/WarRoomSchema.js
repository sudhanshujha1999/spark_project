import mongoose from 'mongoose'
const { Schema } = mongoose

const WarRoomSchema = new Schema(
  {
    match_name: {
      type: String,
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'events',
      required: true,
    },
    team: {
      type: Object,
      required: true,
    },
    opponent_team: {
      type: String,
      required: true,
    },
    game: {
      type: String,
    },
    maps: {
      type: Array,
    },

    strategy: {
      type: String,
    },
    opponent_strategy: {
      type: String,
    },
    description: {
      type: String,
    },
    // war room stages/canvas paths,
    stages: [
      {
        mapName: {
          type: String,
          required: true,
        },
        mapLink: {
          type: String,
          required: true,
        },
        // try making it a array as well
        data: {
          name: String,
          description: String,
          path: [],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const WarRoom = mongoose.model('war-room', WarRoomSchema)
