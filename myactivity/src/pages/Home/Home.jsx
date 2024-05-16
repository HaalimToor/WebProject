import React from 'react';
import LaunderingImage from "../../assets/Laundering.jfif";
import IroningImage from '../../assets/Ironing.jfif';
import NavBar from '../../components/NavBar';

const Home = () => {
    return (
        <div>
            <NavBar />
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mt-8 mb-4">Welcome to Homely Heros</h1>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card mb-4" style={{ height: '500px' }}>
                            <img src={LaunderingImage} className="card-img-top" alt="Laundering" />
                            <div className="card-body">
                                <h5 className="card-title">Laundering Service</h5>
                                <p className="card-text">Description of laundering service...</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card mb-4" style={{ height: '400px' }}>
                            <img src={IroningImage} className="card-img-top" alt="Ironing" />
                            <div className="card-body">
                                <h5 className="card-title">Ironing Service</h5>
                                <p className="card-text">Description of ironing service...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>footer</div>
        </div>
    );
};

export default Home;
