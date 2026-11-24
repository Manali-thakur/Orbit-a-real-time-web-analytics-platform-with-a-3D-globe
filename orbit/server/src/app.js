import express from 'express';
import cors from 'cors';

// server created
const app = express();

app.use(cors());
app.use(express.json({limit: '10kb'}));

// checking the health of server

app.get('/health', (req,res) => {
    res.status(200).json({
        status: 'ok',
        service: 'orbit-api',
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
    });
});

// 404 handler
app.use((req,res) => {
    res.status(404).json({error: "Route not Found..!"});
})

// central error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

export default app;