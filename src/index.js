const axios = require('axios');

/**
 * A class to resolve cryptocurrency names and tickers to their CoinGecko IDs and vice versa.
 */
class CryptoResolver {
    /**
     * Constructs a new instance of the CryptoResolver class.
     */
    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
        this.coinsList = [];
        this.isInitialized = false;
    }

    /**
     * Initializes the CryptoResolver by fetching the list of all coins from CoinGecko.
     * Must be called before using the resolver methods.
     */
    async init() {
        try {
            const response = await axios.get(`${this.baseUrl}/coins/list`);
            this.coinsList = response.data;
            this.isInitialized = true;
        } catch (error) {
            console.error('Failed to fetch coins from CoinGecko:', error);
            throw new Error('Initialization failed. See console for details.');
        }
    }

    /**
     * Resolves a cryptocurrency name or ticker to its CoinGecko ID.
     * @param {string} nameOrTicker The cryptocurrency name or ticker to resolve.
     * @returns {string|null} The CoinGecko ID of the cryptocurrency, or null if not found.
     */
    resolveNameOrTickerToId(nameOrTicker) {
        if (!this.isInitialized) {
            throw new Error('CryptoResolver not initialized. Call init() before using this method.');
        }
        
        const coin = this.coinsList.find(coin => 
            coin.symbol.toLowerCase() === nameOrTicker.toLowerCase() || 
            coin.name.toLowerCase() === nameOrTicker.toLowerCase()
        );
        return coin ? coin.id : null;
    }

    /**
     * Resolves a CoinGecko ID to the cryptocurrency's name and ticker.
     * @param {string} id The CoinGecko ID of the cryptocurrency.
     * @returns {{name: string, ticker: string}|null} An object containing the name and ticker, or null if not found.
     */
    resolveIdToNameAndTicker(id) {
        if (!this.isInitialized) {
            throw new Error('CryptoResolver not initialized. Call init() before using this method.');
        }
        
        const coin = this.coinsList.find(coin => coin.id === id);
        return coin ? { name: coin.name, ticker: coin.symbol.toUpperCase() } : null;
    }
}

module.exports = CryptoResolver;
