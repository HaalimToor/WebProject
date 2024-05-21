import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.css';

const ServicesCategory = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({ name: '', image: null });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getServices');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching the services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewService({ ...newService, image: files[0] });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newService.name);
    formData.append('image', newService.image);

    try {
      await axios.post('http://localhost:8080/addService', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowForm(false);
      setNewService({ name: '', image: null });
      const response = await axios.get('http://localhost:8080/getServices');
      setServices(response.data);
    } catch (error) {
      console.error('Error adding the service:', error);
    }
  };

  return (
    <>
      <h1>Services Category</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Service'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="add-service-form">
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={newService.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Service</button>
        </form>
      )}
      <div className="service-grid">
        {services.map(service => (
          <div key={service._id} className="service-item">
            <img src={`http://localhost:8080${service.image}`} alt={service.name} className="service-image" />
           <h3 className="service-name">{service.name}</h3>
            <p className="service-workers">Total Workers: {service.workers}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServicesCategory;