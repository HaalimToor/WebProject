import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageRequests.css';

const ManageRequests = () => {
    const [requests, setRequests] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [selectedServiceType, setSelectedServiceType] = useState(null);
    const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isFirstRequest, setIsFirstRequest] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/getRequests')
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching requests:', error);
            });

        axios.get('http://localhost:8080/getWorkers')
            .then(response => {
                setWorkers(response.data);
            })
            .catch(error => {
                console.error('Error fetching workers:', error);
            });
    }, []);

    useEffect(() => {
        setIsFirstRequest(currentRequestIndex === 0);
    }, [currentRequestIndex]);

    const handleServiceTypeClick = (serviceType) => {
        setSelectedServiceType(serviceType);
    };

    const handleNextRequest = () => {
        setCurrentRequestIndex(prevIndex => (prevIndex + 1) % requests.length);
    };

    const handlePreviousRequest = () => {
        setCurrentRequestIndex(prevIndex => (prevIndex - 1 + requests.length) % requests.length);
    };

    const handleAssignClick = (worker) => {
        const currentRequest = requests[currentRequestIndex];

        if (worker.department !== currentRequest.serviceType) {
            setErrorMessage(`Worker's department (${worker.department}) does not match the requested service type (${currentRequest.serviceType}).`);
            return;
        }

        setSelectedWorker(worker);
        setConfirmationMessage(null);
        setErrorMessage(null);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!selectedWorker) return;

        const currentRequest = requests[currentRequestIndex];

        axios.put('http://localhost:8080/assignWorker', { workerId: selectedWorker._id })
            .then(response => {
                console.log('Worker status updated successfully:', response.data);
                setWorkers(prevWorkers => prevWorkers.map(worker =>
                    worker._id === selectedWorker._id ? { ...worker, status: 'busy' } : worker
                ));
                setConfirmationMessage(`Worker ${selectedWorker.name} of ${selectedWorker.department} department is assigned to client ${currentRequest.clientName}`);

                axios.delete('http://localhost:8080/deleteRequest', { data: { requestID: currentRequest._id } })
                    .then(response => {
                        console.log('Request deleted successfully:', response.data);
                        setRequests(prevRequests => prevRequests.filter(request => request._id !== currentRequest._id));
                        setSelectedWorker(null);
                        handleNextRequest();
                    })
                    .catch(error => {
                        console.error('Error deleting request:', error);
                    });
            })
            .catch(error => {
                console.error('Error assigning worker:', error);
            });
    };

    const renderWorkerForm = () => {
        if (!selectedWorker) return null;

        return (
            <div>
                <h2 className='reqHeading'>Update Worker Status</h2>
                <form className="currentrequest" onSubmit={handleFormSubmit}>
                    <p><span className='reqatt'> Worker ID:</span> {selectedWorker._id}</p>
                    <p><span className='reqatt'> Name: </span>{selectedWorker.name}</p>
                    <p><span className='reqatt'>Department:</span>  {selectedWorker.department}</p>
                    <p><span className='reqatt'>Status: </span> {selectedWorker.status}</p>
                    <input type="hidden" value="busy" readOnly />
                    <button className='setButton' type="submit">Set to Busy</button>
                </form>
            </div>
        );
    };

    const renderWorkers = () => {
        if (!selectedServiceType) {
            return null;
        }
    
        const filteredWorkers = workers.filter(worker => worker.department === selectedServiceType && worker.status === 'free');
    
        if (filteredWorkers.length === 0) {
            return <>
                <h2 className='title'>Available Workers for {selectedServiceType} department</h2>
                <div className='noWorker'>No free workers available for {selectedServiceType} department</div>
            </>
        }
    
        return (
            <div>
                <h2 className='title'>Available Workers for {selectedServiceType} department</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorkers.map((worker, index) => (
                            <tr key={worker._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                <td>{worker.name}</td>
                                <td>{worker.status}</td>
                                <td>
                                    <button className='assignButton' onClick={() => handleAssignClick(worker)}>Assign</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    
    const getCurrentRequest = () => {
        if (requests.length === 0) {
            return <div>Loading requests...</div>;
        }

        const currentRequest = requests[currentRequestIndex];
        return (
            <>
                <h2 className='reqHeading'>Current Request</h2>
                <div className="currentrequest">
                    <p><span className='reqatt'>Client Name:</span> {currentRequest.clientName}</p>
                    <p><span className='reqatt'>Service Type: </span> {currentRequest.serviceType}</p>
                    <p><span className='reqatt'>Address: </span> {currentRequest.address}</p>
                    {!isFirstRequest && <button className="nextButton" onClick={handlePreviousRequest}>Previous Request</button>}
                    <button className="nextButton" onClick={handleNextRequest}>Next Request</button>
                </div>
            </>
        );
    };

    const getServiceTypes = () => {
        const departmentSet = new Set(workers.map(worker => worker.department));
        const departmentList = Array.from(departmentSet);

        return (
            <div className="navbar-nav">
                {departmentList.map((department, index) => (
                    <button
                        key={index}
                        className={`btn btn-outline-primary ${selectedServiceType === department ? 'active' : ''}`}
                        onClick={() => handleServiceTypeClick(department)}
                    >
                        {department}
                    </button>
                ))}
            </div>
        );
    };

    const handleConfirmationOk = () => {
        setConfirmationMessage(null);
    };

    const handleErrorOk = () => {
        setErrorMessage(null);
    };

    const totalRequests = requests.length;

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-nav">
                    {getServiceTypes()}
                </div>
            </nav>

            <h1>Manage Requests</h1>
            <h2 className='totalreq'>Total Requests: {totalRequests}</h2> 
            
            <div>
                {getCurrentRequest()}
                {renderWorkers()}
                {renderWorkerForm()}
                {confirmationMessage && (
                    <div className='conMessage'>
                        {confirmationMessage}
                        <div>
                            <button className='okButton' onClick={handleConfirmationOk}>OK</button>
                        </div>
                    </div>
                )}
                {errorMessage && (
                    <div className='errorMessage'>
                        {errorMessage}
                        <div>
                            <button className='okButton' onClick={handleErrorOk}>OK</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ManageRequests;
