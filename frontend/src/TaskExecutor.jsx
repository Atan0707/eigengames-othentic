import  { useState } from 'react';
import { executeTask, validateTask } from './apiService';

const TaskExecutor = () => {
    const [taskDefinitionId, setTaskDefinitionId] = useState('');
    const [fakePrice, setFakePrice] = useState('');
    const [result, setResult] = useState(null);
    const [proofOfTask, setProofOfTask] = useState('');

    const handleExecuteTask = async () => {
        try {
            const response = await executeTask(taskDefinitionId, fakePrice);
            setResult(response);
            setProofOfTask(response.proofOfTask);
        } catch (error) {
            console.error("Failed to execute task:", error);
        }
    };

    const handleValidateTask = async () => {
        try {
            const validationResponse = await validateTask(proofOfTask, "hello", taskDefinitionId, "0xE594d66726C49625A381fe7b0FddF66725B5eF26");
            console.log('Validation Result:', validationResponse);
        } catch (error) {
            console.error("Failed to validate task:", error);
        }
    };

    return (
        <div>
            <h1>Task Executor</h1>
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
            {result && <div>Task executed successfully: {JSON.stringify(result)}</div>}
            <button onClick={handleValidateTask}>Validate Task</button>
        </div>
    );
};

export default TaskExecutor;