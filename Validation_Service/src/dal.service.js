require('dotenv').config();
const axios = require("axios");

var ipfsHost='';

function init() {
  ipfsHost = process.env.IPFS_HOST;
}


async function getIPfsTask(cid) {
    const { data } = await axios.get(ipfsHost + cid);
    return data.data.map(pool => ({
      id: pool.id,
      feeTier: pool.feeTier,
      liquidity: pool.liquidity,
      token0: {
        symbol: pool.token0.symbol,
        decimals: pool.token0.decimals,
        name: pool.token0.name
      },
      token1: {
        symbol: pool.token1.symbol,
        decimals: pool.token1.decimals,
        name: pool.token1.name
      },
      totalValueLockedUSD: pool.totalValueLockedUSD,
      volumeUSD: pool.volumeUSD
    }));
}  
  
module.exports = {
  init,
  getIPfsTask
}