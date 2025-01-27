import express from 'express';
import axios from 'axios';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/user.js';

const stockRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const stock_input = async (req, res) => {
  const { file } = req;
  const userId = req.user.id;
  const ml_app = process.env.ML_SERVER;
  
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    formData.append('historical_data', blob, file.originalname);

    const response = await axios.post(
      `${ml_app}/analyze_historical?user_id=${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data?.historical_analysis) {
      return res.json({ historical_analysis: response.data.historical_analysis });
    } else {
      return res.status(500).json({ message: 'Unexpected response from ML server' });
    }
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        message: 'ML server error',
        details: error.response.data
      });
    } else if (error.request) {
      return res.status(503).json({
        message: 'ML server unavailable',
        details: 'No response received from ML server'
      });
    } else {
      console.error('Error:', error.message);
      return res.status(500).json({
        message: 'Internal server error',
        details: error.message
      });
    }
  }
};


const getPrediction = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching prediction for userId:', userId);

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const ml_app = process.env.ML_SERVER; 

    const predictionResponse = await axios.get(`${ml_app}/getprediction`, {
      params: { user_id: userId },
    });

    return res.status(200).json(predictionResponse.data);

  } catch (error) {
    console.error('Error fetching prediction:', error.message);
    return res.status(500).json({ error: 'Error fetching prediction', details: error.message });
  }
};

stockRouter.get('/getprediction', protect, getPrediction);
stockRouter.post('/analyze_historical', protect, upload.single('historical_data'), stock_input);

export default stockRouter;
