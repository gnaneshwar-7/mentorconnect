export const SessionSchema = {
  name: "Session",
  type: "object",
  properties: {
    mentor_id: {
      type: "string"
    },
    mentor_name: {
      type: "string"
    },
    topic: {
      type: "string"
    },
    date: {
      type: "string",
      format: "date"
    },
    time: {
      type: "string"
    },
    duration: {
      type: "number"
    },
    status: {
      type: "string",
      enum: [
        "upcoming",
        "completed",
        "cancelled"
      ]
    },
    notes: {
      type: "string"
    },
    priority: {
      type: "string",
      enum: [
        "high",
        "medium",
        "low"
      ]
    }
  },
  required: [
    "mentor_name",
    "topic",
    "date"
  ]
};

export default SessionSchema;