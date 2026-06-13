import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import recommendationRoutes from './routes/recommendationRoutes.js'
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

let url = process.env.FRONTEND_URL;
app.use(express.json());
app.use(cors(
    {
        origin: url,
        credentials: true
    }
));

app.get("/", (req, res) => {
  res.send("Backend Working");
});


app.use('/recommendation', recommendationRoutes);
app.use('/auth',authRoutes);

app.use("/dashboard", dashboardRoutes);

export default app;