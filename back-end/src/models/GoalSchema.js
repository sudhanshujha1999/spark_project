//team.game
//team.id
//player

//goal name
//metric
import mongoose from 'mongoose'
const { Schema } = mongoose

const GoalSchema = new Schema(
  {
    goalName: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    // captian for team
    // user_allowed: {
    //     type: Schema.Types.ObjectId,
    //     ref: "users",
    // },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'groups',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    player: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    metric: {
      type: String,
      required: true,
    },
    result: {
      type: Number,
      required: true,
    },
    createdById: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    // time: {
    //   type: String,
    // },
    data: [
      {
        date: {
          type: Date,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const Goal = mongoose.model('goal', GoalSchema)

// export const INTERVAL_WEEKLEY = "WEEKLY";
// export const INTERVAL_DAILY = "DAILY";
// // supported types till now
// // validate while creation
// export const FIELD_TYPE_NUMBER = "NUMBER";
// export const FIELD_TYPE_TEXT = "TEXT";

// // current valid field types
// export const VALID_FIELD_TYPES = [FIELD_TYPE_TEXT, FIELD_TYPE_NUMBER];
