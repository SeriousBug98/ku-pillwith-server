require("dotenv").config();
const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const scheRoutes = require("./routes/scheRoutes");
const pillRoutes = require("./routes/pillRoutes");
//swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOption = require('./swagger'); // swagger.js에서 export한 options import


const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(
  session({
    secret: "@chars0624",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000,
    },
  })
);

//client : CORS 설정
const cors = require("cors");

// CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트의 URL
    credentials: true,
  })
);
app.options("*", cors());

// Swagger 설정
const specs = swaggerJSDoc(swaggerOption);
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(specs));

// 라우트 설정
app.use("/auth", authRoutes);
app.use("/schedule", scheRoutes);
app.use("/pills", pillRoutes);

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
