import { useState } from 'react';
import axios from 'axios';
import './TaskExecutor.css';

const API_BASE_URL = 'http://localhost:4003';
const VALIDATION_SERVICE_URL = 'http://localhost:4002';

const TaskExecutor = () => {
    const [taskDefinitionId, setTaskDefinitionId] = useState('');
    const [fakePrice, setFakePrice] = useState('');
    const [executionResult, setExecutionResult] = useState(null);
    const [validationResult, setValidationResult] = useState(null);
    const [proofOfTask, setProofOfTask] = useState('');

    const executeTask = async (taskDefinitionId) => {
        const response = await axios.post(`${API_BASE_URL}/task/execute`, {
            taskDefinitionId,
        });
        return response.data;
    };

    const validateTask = async (proofOfTask) => {
        const response = await axios.post(`${VALIDATION_SERVICE_URL}/task/validate`, {
            proofOfTask,
        });
        return response.data;
    };

    const handleExecuteTask = async () => {
        try {
            console.log('Executing task with:', taskDefinitionId, fakePrice);
            const response = await executeTask(taskDefinitionId, fakePrice);
            console.log('Proof of Task:', JSON.stringify(response.data.proofOfTask));
            setExecutionResult(response);
            if (response && response.data.proofOfTask) {
                setProofOfTask(response.data.proofOfTask);
            }
        } catch (error) {
            console.error("Failed to execute task:", error);
            const errorMessage = error.response?.data?.message || error.message;
            // Check for specific error types
            if (errorMessage.includes('TaskDefinitionNotFound')) {
                setExecutionResult({ 
                    error: `Task ID ${taskDefinitionId} does not exist. Please make sure to use a valid task definition ID.`
                });
            } else {
                setExecutionResult({ error: errorMessage });
            }
        }
    };

    const handleValidateTask = async () => {
        try {
            console.log('Validating task with:', proofOfTask);
            if (!proofOfTask) {
                throw new Error('No proof of task available. Please execute a task first.');
            }
            const validationResponse = await validateTask(proofOfTask);
            console.log('Validation Result:', JSON.stringify(validationResponse.data));
            setValidationResult(validationResponse);
        } catch (error) {
            console.error("Failed to validate task:", error);
            setValidationResult({ error: error.response?.data?.message || error.message });
        }
    };

    return (
        <div className="task-executor">
            <h1>Task Executor</h1>
            
            <div className="execution-section">
                <h2>Execute Task</h2>
                <input
                    type="number"
                    placeholder="Task Definition ID"
                    value={taskDefinitionId}
                    onChange={(e) => setTaskDefinitionId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Fake Price"
                    value={fakePrice}
                    onChange={(e) => setFakePrice(e.target.value)}
                />
                <button onClick={handleExecuteTask}>Execute Task</button>
                
                {executionResult && (
                    <div className="result-box">
                        <h3>Execution Result:</h3>
                        <pre>{JSON.stringify(executionResult, null, 2)}</pre>
                    </div>
                )}
            </div>

            <div className="validation-section">
                <h2>Validate Task</h2>
                <button 
                    onClick={handleValidateTask}
                    disabled={!proofOfTask}
                >
                    Validate Task
                </button>
                
                {validationResult && (
                    <div className="result-box">
                        <h3>Validation Result:</h3>
                        <pre>{JSON.stringify(validationResult, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskExecutor;