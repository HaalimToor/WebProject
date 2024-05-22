import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.css';

const ServicesCategory = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({ name: '', image: null });
  const [deleteServiceName, setDeleteServiceName] = useState('');
  const [showDeleteInput, setShowDeleteInput] = useState(false); // State variable for showing delete input
  const [addMessage, setAddMessage] = useState(''); // State variable for add message
  const [deleteMessage, setDeleteMessage] = useState(''); // State variable for delete message

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

  const handleDeleteChange = (e) => {
    setDeleteServiceName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the service name already exists
    const serviceExists = services.some(service => service.name.toLowerCase() === newService.name.toLowerCase());

    if (serviceExists) {
      setAddMessage('Service with this name already exists.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newService.name);
    formData.append('image', newService.image);

    try {
      await axios.post('http://localhost:8080/addService', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewService({ name: '', image: null });
      const response = await axios.get('http://localhost:8080/getServices');
      setServices(response.data);
      setAddMessage('Service added successfully!');
    } catch (error) {
      console.error('Error adding the service:', error);
      setAddMessage('Error adding the service.');
    }
  };

  const handleDelete = async () => {
    // Check if the service name exists
    const serviceExists = services.some(service => service.name.toLowerCase() === deleteServiceName.toLowerCase());

    if (!serviceExists) {
      setDeleteMessage('Service with this name does not exist.');
      return;
    }

    try {
      const response = await axios.delete('http://localhost:8080/deleteService', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { name: deleteServiceName },
      });
      console.log('Service deleted:', response.data);
      setDeleteServiceName('');
      const servicesResponse = await axios.get('http://localhost:8080/getServices');
      setServices(servicesResponse.data);
      setDeleteMessage('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting the service:', error);
      setDeleteMessage('Error deleting the service.');
    }
  };

  const handleAddCancel = () => {
    setShowForm(false);
    setAddMessage('');
  };

  const handleDeleteCancel = () => {
    setShowDeleteInput(false);
    setDeleteMessage('');
  };

  return (
    <>
      <h1>Services Category</h1>
      {!showForm && (
        <button className="addButton" onClick={() => setShowForm(true)}>Add new Service</button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="add-service-form">
          <p className="deleteButtonp">Add new Service</p>
          <br />
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
          <br /><br />
          <button className="deleteButton" type="submit">Add Service</button>
          <button className="cancelButton" type="button" onClick={handleAddCancel}>Cancel</button>
          {addMessage && <p>{addMessage}</p>}
         
        </form>
      )}

      <div className="delete-service-form">
        {!showDeleteInput && (
          <button className="deleteButton" onClick={() => setShowDeleteInput(true)}>Delete Service</button>
        )}
        {showDeleteInput && (
          <>
            <p className="deleteButtonp">Delete Service</p>
            <br />
            <input
              type="text"
              placeholder="Service Name to Delete"
              value={deleteServiceName}
              onChange={handleDeleteChange}
            />
            <br /><br />
            <button className="deleteButton" onClick={handleDelete}>Confirm Delete</button>
            <button className="cancelButton" type="button" onClick={handleDeleteCancel}>Cancel</button>
            {deleteMessage && <p>{deleteMessage}</p>}
          </>
        )}
      </div>

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
