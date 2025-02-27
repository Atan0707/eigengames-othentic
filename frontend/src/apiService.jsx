import axios from 'axios';

const API_BASE_URL = 'http://localhost:4003'; // Change this to your Execution Service URL

export const executeTask = async (taskDefinitionId, fakePrice) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/task/execute`, {
            taskDefinitionId,
            fakePrice,
        });
        return response.data;
    } catch (error) {
        console.error("Error executing task:", error);
        throw error;
    }
};

export const validateTask = async (proofOfTask, data, taskDefinitionId, performer) => {
    const VALIDATION_SERVICE_URL = 'http://localhost:4002'; // Change this to your Validation Service URL
    try {
        const response = await axios.post(`${VALIDATION_SERVICE_URL}/task/validate`, {
            proofOfTask,
            data,
            taskDefinitionId,
            performer
        });
        return response.data;
    } catch (error) {
        console.error("Error validating task:", error);
        throw error;
    }
};