# BARK Token Airdrop Script Sample

This TypeScript-based project automates the process of distributing BARK tokens on the Solana blockchain. The script is designed to efficiently manage batch processing, error handling, dynamic fee adjustments, and secure key management, ensuring reliable token distribution to predefined wallet addresses.

## Features

- **Batch Processing**: Manages network load and transaction costs by distributing tokens in predetermined batch sizes.
- **Error Handling and Retry Mechanism**: Robust mechanisms to resend transactions that initially fail due to network issues.
- **Dynamic Fee Adjustment**: Automatically adjusts transaction fees based on network congestion to ensure timely processing at optimal cost.
- **Concurrent Batch Processing**: Leverages JavaScript's asynchronous capabilities to process multiple batches simultaneously, enhancing throughput.
- **CLI Interface**: Provides a command-line interface for easier interaction and operational management.
- **Secure Key Management**: Implements best practices for the secure handling and storage of private keys.

## Prerequisites

Ensure you have the following installed before using the airdrop script:
- Node.js (v14.0 or later)
- npm (v6.0 or later)
- Solana CLI (for keypair management)

## Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/bark-community/bark-airdrop-ts.git
cd bark-airdrop-ts
npm install
```
## Install Anchor

```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```
## Configuration

1. **Set up environment variables**: Copy the `.env.example` file to a new file named `.env` and fill in your specific details:

    ```plaintext
    PRIVATE_KEY=[YourPrivateKeyHere]
    BARK_TOKEN_MINT_ADDRESS=
    CLUSTER_URL=https://api.devnet.solana.com
    BATCH_SIZE=22
    ```

2. **Input Data**: Ensure the `balances_post_content.json` file is in the root of project directory with the correct format:

    ```json
    [
        {"address": "ExampleBarkAddress1", "amount": 100000},
        {"address": "ExampleBarkAddress2", "amount": 200000}
    ]
    ```

## Network Connection

Configure your network connections with Solana CLI using the following commands:

- **Devnet**:
  ```bash
  solana config set --url https://api.devnet.solana.com
  ```

- **Mainnet**:
  ```bash
  solana config set --url https://api.mainnet-beta.solana.com
  ```

- **Custom RPC**:
  ```bash
  solana config set --url http://custom-rpc-url:port
  ```

## Usage

To execute the airdrop script, run the following command:

```bash
ts-node src/airdrop.ts
```

For command-line interface usage:

```bash
node src/cli.js --file balances_post_content.json --batch-size 25
```

## Development

Follow these standard Node.js development practices to contribute or modify this project:
- Run `npm install` to install dependencies.
- Make modifications to the TypeScript files in the `src` directory.
- Thoroughly test your changes.

## Troubleshooting

- **Transaction Failures**: Ensure your `.env` file has the correct private key and mint address.
- **Network Issues**: Verify your internet connection and the `CLUSTER_URL` specified in your environment settings.
- **Dependency Problems**: Use `npm ci` to reinstall dependencies if you encounter unexpected issues after updates.

## License

[LICENSE](LICENSE) file for details.
