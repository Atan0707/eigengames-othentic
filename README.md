# 🏆 Uniswap V3 Oracle AVS

A decentralized price oracle system built on the Othentic Stack that fetches, validates, and attests Uniswap V3 pool data. This Autonomous Validation System (AVS) ensures reliable and tamper-resistant pool data delivery through a network of attesters.

## 🌟 Features

- **Real-time Uniswap V3 Data**: Fetches comprehensive pool metrics including liquidity, prices, and volume
- **Decentralized Storage**: Uses IPFS via Pinata for immutable data storage
- **Robust Validation**: Multi-node attestation system with configurable tolerance levels
- **Microservices Architecture**: Separate execution and validation services for better scalability
- **Enterprise-Ready**: Built with monitoring support (Prometheus & Grafana ready)

## 🏗 Architecture

```
┌─────────────────┐         ┌──────────────┐         ┌─────────────┐
│  Execution      │         │              │         │ Validation  │
│  Service (4003) │ ───────▶│  IPFS/Pinata │◀─────── │Service(4002)│
└─────────────────┘         │              │         └─────────────┘
        │                   └──────────────┘                │
        │                                                   │
        │                   ┌──────────────┐               │
        └──────────────────▶│ Uniswap V3   │◀──────────────┘
                           │   Protocol    │
                           └──────────────┘
```

### System Components

1. **Execution Service (Port 4003)**
   - Fetches real-time Uniswap V3 pool data
   - Processes and formats pool metrics
   - Publishes data to IPFS
   - Signs and submits tasks to the network

2. **Validation Service (Port 4002)**
   - Validates submitted pool data
   - Verifies data integrity and accuracy
   - Implements tolerance-based validation
   - Provides attestation decisions

3. **Data Layer**
   - IPFS storage through Pinata SDK
   - Ethereum wallet integration for signing
   - JSON-RPC communication

## 🚀 Quick Start

### Prerequisites

- Node.js v22.6.0+
- Docker and Docker Compose
- Pinata API Keys
- Ethereum Wallet Private Key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uniswap-v3-oracle-avs
```

2. Install dependencies for both services:
```bash
# Execution Service
cd Execution_Service
npm install

# Validation Service
cd ../Validation_Service
npm install
```

3. Configure environment variables:
```bash
# Create .env files in both service directories
cp .env.example .env
```

Required environment variables:
```env
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret
PRIVATE_KEY_PERFORMER=your_ethereum_private_key
OTHENTIC_CLIENT_RPC_ADDRESS=your_rpc_address
```

### Running the Services

1. Start the Validation Service:
```bash
cd Validation_Service
npm start
# Service will start on port 4002
```

2. Start the Execution Service:
```bash
cd Execution_Service
npm start
# Service will start on port 4003
```

### Docker Deployment

```bash
docker-compose up -d
```

## 🔍 API Endpoints

### Execution Service (4003)

#### POST /execute
Executes a task to fetch and store Uniswap V3 pool data.

Request:
```json
{
    "taskDefinitionId": 0
}
```

Response:
```json
{
    "proofOfTask": "QmHash...",
    "data": "Uniswap V3 Pool Data",
    "taskDefinitionId": 0
}
```

### Validation Service (4002)

#### POST /validate
Validates stored pool data against current market data.

Request:
```json
{
    "proofOfTask": "QmHash..."
}
```

Response:
```json
{
    "result": true/false
}
```

## 🔐 Validation Logic

The system implements a comprehensive validation strategy:

1. **Data Structure Validation**
   - Verifies array structure of pool data
   - Ensures all required fields are present

2. **Pool Data Validation**
   - Matches pool IDs between stored and current data
   - Validates key metrics with 5% tolerance:
     - Liquidity
     - Total Value Locked (USD)
     - Volume (USD)

3. **Token Validation**
   - Verifies token addresses
   - Validates token metadata (symbol, decimals, name)

## 🛠 Technical Stack

- **Backend**: Node.js with Express
- **Storage**: IPFS via Pinata
- **Blockchain**: Ethereum (ethers.js)
- **Monitoring**: Prometheus & Grafana ready
- **Container**: Docker & Docker Compose

## 🔍 Monitoring & Maintenance

The system includes built-in monitoring capabilities:

- Prometheus metrics endpoint
- Grafana dashboard support
- Detailed logging system
- Error tracking and reporting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Additional Resources

- [Othentic Stack Documentation](https://docs.othentic.xyz/)
- [Uniswap V3 Documentation](https://docs.uniswap.org/)
- [IPFS Documentation](https://docs.ipfs.tech/)

## 🌟 Acknowledgments

- Othentic Labs for the AVS framework
- Uniswap V3 for the pool data API
- IPFS/Pinata for decentralized storage solutions