

/* attempt to get free data from coingesko but no( */



const express = require('express');
const axios =  require('axios');
const cors = require('cors');

const app = express();

// Разрешить все источники для CORS
app.use(cors());
app.get('/coins', async (req, res) => {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = {
      market_data: true,
      vs_currency: 'USD',
      order: 'market_cap_desc',
      per_page: 30,
      page: 1,
      sparkline: false,
      market_cap: true,
      price_change_percentage: '1h,7d',
      volume: true
    };

    const response = await axios.get(url, { params });
    const data = response.data;
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
