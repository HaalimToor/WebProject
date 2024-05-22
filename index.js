const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/Workers', { useNewUrlParser: true, useUnifiedTopology: true });

const WorkerSchema = new mongoose.Schema({
    name: String,
    department: String,
    rating: Number,
    status: String
});

const WorkerModel = mongoose.model('workers', WorkerSchema);


app.get('/getWorkers', (req, res) => {
    WorkerModel.find({})
        .then(workers => {
            res.json(workers);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

const RequestSchema = new mongoose.Schema({
    clientName: String,
    address: String,
    serviceType: String,
    assignedWorker: String // Added field to store the assigned worker's ID
});

const RequestModel = mongoose.model('requests', RequestSchema);

app.get('/getRequests', (req, res) => {
    RequestModel.find({})
        .then(requests => {
            res.json(requests);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.put('/assignWorker', async (req, res) => {
    try {
        const { workerId } = req.body;

        if (!workerId) {
            return res.status(400).json({ error: 'WorkerModel ID not provided' });
        }

        const worker = await WorkerModel.findById(workerId);
        if (!worker) {
            return res.status(404).json({ error: 'WorkerModel not found' });
        }

        worker.status = 'busy';
        await worker.save();

        res.json({ message: 'WorkerModel status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/deleteRequest', async (req, res) => {
    const { requestID } = req.body;
    console.log('Request payload:', req.body);
    console.log("Hello: " + requestID);  // Log the request ID value correctly

    try {
        // Correctly delete the request by ID
        const result = await RequestModel.deleteOne({ _id: requestID });
        console.log(result);  // Log the result of the delete operation

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json({ message: 'Request deleted successfully' });
    } catch (error) {
        console.error('Error deleting request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



const ServiceSchema = new mongoose.Schema({
  name: String,
  image: String,
  workers: Number,
});

const Service = mongoose.model('services', ServiceSchema);

app.get('/getServices', async (req, res) => {
    try {
      const services = await Service.find({});
      const serviceData = await Promise.all(services.map(async service => {
        const workerCount = await WorkerModel.countDocuments({ department: service.name });
        return {
          ...service.toObject(),
          workers: workerCount
        };
      }));
  
      res.json(serviceData);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, and .png files are allowed!'), false);
    }
};


const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

app.post('/addService', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newService = new Service({ name, image: imagePath, workers: 0 });
    await newService.save();

    res.status(201).json(newService);
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/deleteService', async (req, res) => {
    const { name } = req.body;
    console.log('Received request to delete service:', name); // Log the service name
   
    if (!name) {
      return res.status(400).json({ error: 'Service name not provided' });
    }
  
    try {
      const result = await Service.deleteOne({ name });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});


