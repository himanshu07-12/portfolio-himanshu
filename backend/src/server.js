const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { config } = require('./config/environment');
const { successResponse } = require('./utils/apiResponse');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');
const apiRoutes = require('./routes');
const { initializeDatabase } = require('./config/initDb');
const { seed } = require('./config/seed');

const app = express();

// Security headers
app.use(helmet());

// Basic Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP, please try again later.',
    },
  },
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: config.clientUrl || 'http://localhost:5173',
  credentials: true,
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  return successResponse(res, 200, {
    status: 'ok',
    environment: config.env,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', apiRoutes);

// 404 Not Found Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

// Start Server if not required as a module in tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, async () => {
    console.log(`[Server] Portfolio backend running on port ${config.port} (${config.env} mode)`);
    console.log(`[Server] Health check endpoint: http://localhost:${config.port}/api/health`);
    try {
      await initializeDatabase();
      await seed();
    } catch (err) {
      console.error('[Server] Database initialization/seed error:', err.message);
    }
  });
}

module.exports = app;
