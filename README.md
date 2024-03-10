# crypto-resolver

A lightweight Node.js package for resolving cryptocurrency names and tickers to their CoinGecko IDs and vice versa, leveraging the CoinGecko API. Perfect for developers working with cryptocurrency data who need a reliable way to translate between different identifiers.

## Features

- **Name to ID Resolution**: Convert cryptocurrency names or tickers to their unique CoinGecko IDs.
- **ID to Name Resolution**: Convert CoinGecko IDs back to cryptocurrency names and tickers.
- **Initialization Check**: Ensures the resolver is properly initialized before usage, improving reliability.
- **Error Handling**: Provides clear error messages for better debugging and user experience.
- **Lightweight & Fast**: Minimal dependencies for quick and efficient performance.
- **Easy to Use**: Designed with simplicity in mind for developers of all skill levels.

## Installation

Install `crypto-resolver` using npm:

```bash
npm install crypto-resolver
```

Or yarn:

```bash
yarn add crypto-resolver
```

## Usage

First, import and initialize the `CryptoResolver` class. Ensure you call the `init` method before using any resolver functionality to fetch the latest cryptocurrency data:

```javascript
const CryptoResolver = require('crypto-resolver');
const resolver = new CryptoResolver();

async function initialize() {
  try {
    await resolver.init();
    console.log('Initialization successful.');
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}

initialize();
```

### Resolving Name or Ticker to CoinGecko ID

```javascript
async function resolveNameOrTicker() {
  try {
    const id = await resolver.resolveNameOrTickerToId('btc');
    console.log(`The CoinGecko ID for BTC is ${id}`);
  } catch (error) {
    console.error('Error resolving name or ticker:', error);
  }
}

resolveNameOrTicker();
```

### Resolving CoinGecko ID to Name and Ticker

```javascript
async function resolveIdToNameAndTicker() {
  try {
    const info = await resolver.resolveIdToNameAndTicker('bitcoin');
    console.log(`Name: ${info.name}, Ticker: ${info.ticker}`);
  } catch (error) {
    console.error('Error resolving ID to name and ticker:', error);
  }
}

resolveIdToNameAndTicker();
```

## Example Code

Below are some "real-life" examples of what you can achieve with `crypto-resolver`:

### Display Multiple Cryptocurrencies Info

Retrieve and display information for multiple cryptocurrencies by name or ticker:

```javascript
const CryptoResolver = require('crypto-resolver');
const resolver = new CryptoResolver();

async function displayCryptoInfo(names) {
  await resolver.init();
  for (const name of names) {
    const id = await resolver.resolveNameOrTickerToId(name);
    if (id) {
      const info = await resolver.resolveIdToNameAndTicker(id);
      console.log(`${info.name} (${info.ticker}): CoinGecko ID = ${id}`);
    } else {
      console.log(`No CoinGecko ID found for "${name}".`);
    }
  }
}

displayCryptoInfo(['btc', 'eth', 'invalidCrypto']);
```

### Handling Errors Gracefully

Demonstrate handling a common error – using the resolver without initialization:

```javascript
const CryptoResolver = require('crypto-resolver');
const uninitResolver = new CryptoResolver();

async function attemptResolveWithoutInit() {
  try {
    const id = await uninitResolver.resolveNameOrTickerToId('btc');
    console.log(`CoinGecko ID for BTC: ${id}`);
  } catch (error) {
    console.error('Caught error:', error.message);
  }
}

attemptResolveWithoutInit();
```

This script shows how `crypto-resolver` throws an error when trying to resolve a cryptocurrency name or ticker without first calling `init()`, and how to catch and handle that error.

## Error Handling

The `crypto-resolver` package throws errors if it's not properly initialized or if an issue occurs during the initialization process. Ensure you handle these errors in your application to maintain stability and provide feedback to your users.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub if you have any suggestions, improvements, or bug reports.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.