import dotenv from 'dotenv';
import { clusterApiUrl } from '@solana/web3.js';

dotenv.config();

export const config = {
    privateKey: process.env.PRIVATE_KEY as string,
    mintAddress: process.env.BARK_TOKEN_MINT_ADDRESS as string,
    clusterUrl: process.env.CLUSTER_URL || clusterApiUrl('devnet'),
    batchSize: parseInt(process.env.BATCH_SIZE || '22', 10)
};
