const axios = require('axios');

class CryptoResolver {
    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
        this.coinsList = [];
    }

    async init() {
        await this.fetchCoins();
    }

    async fetchCoins() {
        try {
            const response = await axios.get(`${this.baseUrl}/coins/list`);
            this.coinsList = response.data;
        } catch (error) {
            console.error('Failed to fetch coins from CoinGecko:', error);
        }
    }

    resolveNameOrTickerToId(nameOrTicker) {
        const coin = this.coinsList.find(coin => coin.symbol.toLowerCase() === nameOrTicker.toLowerCase() || coin.name.toLowerCase() === nameOrTicker.toLowerCase());
        return coin ? coin.id : null;
    }

    resolveIdToNameAndTicker(id) {
        const coin = this.coinsList.find(coin => coin.id === id);
        return coin ? { name: coin.name, ticker: coin.symbol.toUpperCase() } : null;
    }
}

module.exports = CryptoResolver;
