export default {
  DATABASE: {
    URI: process.env.MONGODB_URI || "mongodb://localhost/todo-ts",
    USERNAME: process.env.MONGODB_USERNAME || "",
    PASSWORD: process.env.MONGODB_PASSWORD || "",
  },
  JWT: {
    SECRET:
      process.env.JWT_SECRET ||
      "2b$10$IU6ycVn1uc6n/01ByqP6NOEnGgcpABJuiN.aZ4pz",
  },
};
