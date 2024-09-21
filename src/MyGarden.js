import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyGarden.css';

function MyGarden() {
    const plant_key = process.env.REACT_APP_PLANT_API;
    const [plantList, setPlantList] = useState([]);
    const [myGarden, setMyGarden] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log(`Fetching from: https://perenual.com/api/species-list?key=${plant_key}`);
                const response = await axios.get(`https://perenual.com/api/species-list?key=${plant_key}`);
                setPlantList(response.data.data); // Adjust this based on actual API response
            } catch (error) {
                console.error("Error fetching plant data:", error);
            }
        }

        fetchData();
    }, [plant_key]);

    const addToGarden = (plant) => {
        if (!myGarden.some(gardenPlant => gardenPlant.id === plant.id)) {
            setMyGarden([...myGarden, plant]);
        }
    };

    return (
        <div className="my-garden-container">
            <h1>My Garden</h1>
            <div className="my-garden">
                {myGarden.length > 0 ? (
                    myGarden.map((plant, index) => (
                        <div key={index} className="garden-plant-card">
                            <img src={plant.default_image?.thumbnail} alt={plant.common_name} className="plant-image" />
                            <div className="plant-details">
                                <h3>{plant.common_name || "Unknown Plant"}</h3>
                                <p><strong>Scientific Name:</strong> {plant.scientific_name}</p>
                                <p><strong>Watering:</strong> {plant.watering}</p>
                                <p><strong>Sunlight:</strong> {plant.sunlight.join(', ')}</p>
                                <div className="guidance">
                                    <h4>Care Guidance</h4>
                                    <p>Water: {plant.watering}</p>
                                    <p>Sunlight: {plant.sunlight.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No plants in your garden yet.</p>
                )}
            </div>
            <h1>Plant Species List</h1>
            <div className="plant-list">
                {plantList.length > 0 ? (
                    plantList.map((plant, index) => (
                        <div key={index} className="plant-card">
                            <img src={plant.default_image?.thumbnail} alt={plant.common_name} className="plant-image" />
                            <div className="plant-details">
                                <h3>{plant.common_name || "Unknown Plant"}</h3>
                                <p><strong>Scientific Name:</strong> {plant.scientific_name}</p>
                                <button onClick={() => addToGarden(plant)}>Add to My Garden</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading plants...</p>
                )}
            </div>
        </div>
    );
}

export default MyGarden;
