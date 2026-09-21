
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

// Create default admin on startup (if missing)
async function createDefaultAdmin() {
  try {
    const User = require("./models/User");
    const bcrypt = require("bcryptjs");
    const email = process.env.DEFAULT_ADMIN_EMAIL || "admin@gmail.com";
    const password = process.env.DEFAULT_ADMIN_PASSWORD || "admin@123";

    const existing = await User.findOne({ email });
    if (!existing) {
      const hashed = await bcrypt.hash(password, 10);
      const admin = new User({
        name: "Admin",
        handle: "admin",
        email,
        password: hashed,
        isAdmin: true,
        verified: true,
      });
      await admin.save();
      console.log(`✓ Default admin created: ${email}`);
    } else {
      console.log(`✓ Default admin exists: ${email}`);
    }
  } catch (err) {
    console.error("✗ Error creating default admin:", err);
  }
}

async function startServer() {
  try {
    await connectDB();
    await createDefaultAdmin();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup error", err);
    process.exit(1);
  }
}

// API Routes
const authRoutes = require("./routes/auth");
const storiesRoutes = require("./routes/stories");
const postsRoutes = require("./routes/posts");
const reelsRoutes = require("./routes/reels");
const usersRoutes = require("./routes/users");
const employeesRoutes = require("./routes/employees");
const uploadRoutes = require("./routes/upload");
const blogRoutes = require("./routes/blogRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/reels", reelsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/blogs", blogRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running successfully" });
});

startServer();
