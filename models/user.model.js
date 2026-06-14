import { Schema, model } from "mongoose";
const { createHmac, randomBytes } = await import("node:crypto");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedpassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedpassword;
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const salt = user?.salt;
  console.log(`UUSSSEEERRRR ${user}`);
  const hashedpassword = user.password;

  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedpassword !== userProvidedHash)
    throw new Error("Incorrect password");

  return { ...user, password: undefined };
});

export const User = model("user", userSchema);
