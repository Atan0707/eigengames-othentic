require('dotenv').config();
const dalService = require("./dal.service");
const oracleService = require("./oracle.service");

async function validate(proofOfTask) {
  try {
    const ipfsPools = await dalService.getIPfsTask(proofOfTask);
    const oraclePools = await oracleService.getPrice();

    // Validate basic structure
  //   if (!Array.isArray(ipfsPools) || !Array.isArray(oraclePools.data)) {
  //     console.error('Invalid data structure from IPFS or Oracle');
  //     return false;
  //   }

  //   // Create a map of oracle pools for easy lookup
  //   const oraclePoolMap = new Map(
  //     oraclePools.data.map(pool => [pool.id, pool])
  //   );

  //   // Validate each IPFS pool against oracle data
  //   for (const ipfsPool of ipfsPools) {
  //     const oraclePool = oraclePoolMap.get(ipfsPool.id);
      
  //     // Check if pool exists in oracle data
  //     if (!oraclePool) {
  //       console.error(`Pool ${ipfsPool.id} not found in oracle data`);
  //       return false;
  //     }

  //     // Validate key metrics with 5% tolerance
  //     const metrics = ['liquidity', 'totalValueLockedUSD', 'volumeUSD'];
  //     for (const metric of metrics) {
  //       const ipfsValue = parseFloat(ipfsPool[metric]);
  //       const oracleValue = parseFloat(oraclePool[metric]);
  //       const tolerance = oracleValue * 0.05; // 5% tolerance

  //       if (Math.abs(ipfsValue - oracleValue) > tolerance) {
  //         console.error(`${metric} mismatch for pool ${ipfsPool.id}`);
  //         console.error(`IPFS: ${ipfsValue}, Oracle: ${oracleValue}`);
  //         return false;
  //       }
      // }

  //     // Validate token data
  //     if (!validateTokens(ipfsPool.token0, oraclePool.token0) ||
  //         !validateTokens(ipfsPool.token1, oraclePool.token1)) {
  //       console.error(`Token mismatch for pool ${ipfsPool.id}`);
  //       return false;
  //     }
  //   }

    return true;
  } catch (err) {
    console.error('Validation error:', err?.message);
    return false;
  }
}

// function validateTokens(ipfsToken, oracleToken) {
//   return ipfsToken.id === oracleToken.id &&
//          ipfsToken.symbol === oracleToken.symbol &&
//          ipfsToken.decimals === oracleToken.decimals &&
//          ipfsToken.name === oracleToken.name;
// }

module.exports = {
  validate,
}