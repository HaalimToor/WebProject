import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PerformancePage.css'; // Import CSS file for styling

const PerformanceEvaluationPage = () => {
  const [workersData, setWorkersData] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState('');

  useEffect(() => {
    // Fetch workers data from the backend
    const fetchWorkersData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getWorkers');
        setWorkersData(response.data);
      } catch (error) {
        console.error('Error fetching workers data:', error);
      }
    };

    fetchWorkersData();
  }, []);

  useEffect(() => {
    // Filter workers by selected department
    if (selectedDepartment) {
      const filtered = workersData.filter(worker => worker.department === selectedDepartment);
      setFilteredWorkers(filtered);
    } else {
      setFilteredWorkers([]);
    }
  }, [selectedDepartment, workersData]);

  const handleDepartmentButtonClick = (department) => {
    setSelectedDepartment(department);
    setSelectedDepartmentName(department); // Set selected department name for heading
  };

  const handleShowAllButtonClick = () => {
    setSelectedDepartment(null); // Reset department filter
    setSelectedDepartmentName(''); // Reset selected department name for heading
  };

  const renderDepartmentButtons = () => {
    // Get unique departments from workers data
    const departments = [...new Set(workersData.map(worker => worker.department))];
    const buttons = departments.map((department, index) => (
      <button key={index} onClick={() => handleDepartmentButtonClick(department)} className="department-button">
        {department}
      </button>
    ));
    buttons.push(
      <button key="all" onClick={handleShowAllButtonClick} className="department-button">
        All
      </button>
    );
    return buttons;
  };

  const renderWorkerItems = () => {
    const dataToRender = selectedDepartment ? filteredWorkers : workersData;
    return dataToRender.map((worker, index) => {
      const ratingPercentage = (worker.rating / 5) * 100; // Calculate rating percentage
      const ratingStyle = {
        width: `${ratingPercentage}%`, // Set width of the colored line based on rating
        backgroundColor: worker.rating >= 3 ? '#1c3d5f' : 'orange' // Set color based on rating
      };
  
      return (
        <div key={worker.id} className={index % 2 === 0 ? 'worker-item light-row' : 'worker-item dark-row'}>
          <div className="worker-details">
            <div>Name: {worker.name}</div>
            {selectedDepartment === null && <div>Department: {worker.department}</div>}
          </div>
          <div className="rating">
          <div>{worker.rating}/10</div>

            <div className="rating-bar">
              <div className="colored-line" style={ratingStyle}></div>
            </div>
          </div>
        </div>
      );
    });
  };
  

  return (
    <div>
         <div className="navbar">
        {renderDepartmentButtons()}
      </div>
      <h1 className="title">Performance Evaluation of Service Providers</h1>
      <h3>{selectedDepartmentName}</h3>
      <div className="workers-list">
        {renderWorkerItems()}
      </div>
    </div>
  );
};

export default PerformanceEvaluationPage;
