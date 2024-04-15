// Import the necessary classes from solana/web3.js
import { Keypair, Connection, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { Token } from "@solana/spl-token";
import fs from 'fs';
import { config } from './config';
import { logger } from './logger';

// Define the custom or Solana 2022 token program ID with the correct public key
const TOKEN_2022_PROGRAM_ID = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');

const connection = new Connection(config.clusterUrl, 'confirmed');

async function main() {
    const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(config.privateKey)));
    const token = new Token(connection, new PublicKey(config.mintAddress), TOKEN_2022_PROGRAM_ID, payer);

    const data = JSON.parse(fs.readFileSync('balances_post_content.json', 'utf8'));
    for (let i = 0; i < data.length; i += config.batchSize) {
        const batch = data.slice(i, i + config.batchSize);
        const transaction = new Transaction();
        for (const { address, amount } of batch) {
            try {
                const recipientPublicKey = new PublicKey(address);
                const recipientATA = await token.getOrCreateAssociatedAccountInfo(recipientPublicKey);
                transaction.add(
                    Token.createTransferInstruction(
                        TOKEN_2022_PROGRAM_ID,
                        recipientATA.address,
                        token.publicKey,
                        payer.publicKey,
                        [],
                        amount
                    )
                );
                logger.info(`Prepared transfer of ${amount} to ${address}`);
            } catch (error) {
                logger.error(`Error preparing transfer for ${address}: ${error}`);
            }
        }
        try {
            const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);
            logger.info(`Transaction ${signature} confirmed for batch starting at index ${i}`);
        } catch (error) {
            logger.error(`Transaction failed for batch starting at index ${i}: ${error}`);
        }
    }
}

main().then(() => logger.info("BARK Airdrop completed.")).catch(err => logger.error(`BARK Airdrop failed: ${err}`));
