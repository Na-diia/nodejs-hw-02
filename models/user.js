const { Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: String,
        avatarURL: {
          type: String,
        },
      }
);

userSchema.post("save", (error, data, next) => {
    const {code, name} = error;
    error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    if(error.status === 409) {
        error.message = 'Email in use'
    };
    next();
});

const User = model("user", userSchema);

module.exports = {
    User,
};