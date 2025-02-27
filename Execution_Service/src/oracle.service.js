require('dotenv').config();
const axios = require("axios");

async function getPrice() {
  try {
    const result = await axios.get(`https://lp-tracker-f5tfjvgnl-atan0707s-projects.vercel.app/api/pools`);
    return {
      success: true,
      data: result.data.data.map(pool => ({
        feeTier: pool.feeTier,
        id: pool.id,
        liquidity: pool.liquidity,
        sqrtPrice: pool.sqrtPrice,
        tick: pool.tick,
        token0: {
          decimals: pool.token0.decimals,
          id: pool.token0.id,
          name: pool.token0.name,
          symbol: pool.token0.symbol
        },
        token1: {
          decimals: pool.token1.decimals,
          id: pool.token1.id,
          name: pool.token1.name,
          symbol: pool.token1.symbol
        },
        totalValueLockedUSD: pool.totalValueLockedUSD,
        volumeUSD: pool.volumeUSD
      })),
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error('Error fetching pool data:', err);
    throw err;
  }
}

module.exports = {
  getPrice,
}