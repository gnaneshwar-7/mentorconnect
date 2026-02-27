export const MentorSchema = {
  name: "Mentor",
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    title: {
      type: "string"
    },
    company: {
      type: "string"
    },
    expertise: {
      type: "array",
      items: {
        type: "string"
      }
    },
    rating: {
      type: "number"
    },
    sessions_completed: {
      type: "number"
    },
    avatar_url: {
      type: "string"
    },
    bio: {
      type: "string"
    },
    hourly_rate: {
      type: "number"
    },
    availability: {
      type: "string",
      enum: [
        "available",
        "busy",
        "away"
      ]
    },
    featured: {
      type: "boolean"
    }
  },
  required: [
    "name"
  ]
};

export default MentorSchema;