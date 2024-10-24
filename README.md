# rsk-cli

## Description

`rsk-cli` is a command-line tool for interacting with Rootstock blockchain

## Installation

To install the CLI tool globally, use the following command:

```bash
npm i -g @rsksmart/rsk-cli
```

## Development

### Prerequisites

Before you can start developing with `rsk-cli`, ensure that you have the following tools installed on your system:

- **Node.js**: Make sure Node.js is installed, as it is required for running the CLI tool.

## Features

### 1. Manage Wallet

The `wallet` command allows you to manage your wallet on the Rootstock blockchain. You can create a new wallet, use an existing wallet, or import a custom wallet.

```bash
rsk-cli wallet
```

This command will guide you through the process of wallet management, offering options to:

- Create a new Ethereum-compatible wallet
- Import an existing wallet
- List all saved wallets
- Switch between saved wallets
- Update a wallet's name
- Delete a saved wallet

> **ℹ️ Info:**
>
> When you choose to save a wallet using `rsk-cli`, your private key is securely encrypted to protect it from unauthorized access.
>
> The tool uses AES-256-CBC encryption, a robust encryption standard. Your password is used to derive a strong encryption key through the `scrypt` function, ensuring that even weak passwords result in strong keys. A random Initialization Vector (IV) is also generated to ensure that even if the same data is encrypted multiple times, the output will be different each time.
>
> After encryption, your wallet's private key, along with the necessary encryption metadata, is securely stored in a file named `rootstock-wallet.json` in the current working directory. This file allows you to manage and reuse your wallets securely within `rsk-cli` without exposing your sensitive private keys.

- Example output when creating a new wallet:

  ```
  🎉 Wallet created successfully on Rootstock!
  ? 🔒 Enter a password to encrypt your wallet: ****
  ? 🖋️ Enter a name for your wallet: firstWallet
  📄 Address: 0x443Cdb69aDA3B9Ca617cc14763FBA57bfB82fd00
  🔑 Private Key: <PRIVATE_KEY>
  🔒 Please save the private key in a secure location.
  💾 Wallet saved securely at /path/to/package/rootstock-wallet.json
  ```

- Example output when importing an existing wallet:

  ```
  ? 🔑 Enter your private key: ****************************************************************
  ? 🖋️ Enter a name for your wallet: imported
  ? 🔒 Enter a password to encrypt your wallet: ****
  ? 🔍 Would you like to set this as the current wallet? yes
  ✅ Wallet set as current!
  ✅ Wallet validated successfully!
  📄 Address: 0x4913AbCD40a9455a28134b4ccc37f4f95225e593
  💾 Wallet saved securely at /path/to/package/rootstock-wallet.json
  ```

- Example output when listing all saved wallets:

  ```
  📜 Saved wallets (2):

  - firstWallet: 0x443Cdb69aDA3B9Ca617cc14763FBA57bfB82fd00
  - imported: 0x4913AbCD40a9455a28134b4ccc37f4f95225e593

  🔑 Current wallet: imported
  ```

- Example output when switching between saved wallets:

  ```
  ? 🔁 Select the wallet you want to switch to: firstWallet
  ✅ Successfully switched to wallet: firstWallet
  📄 Address: 0x443Cdb69aDA3B9Ca617cc14763FBA57bfB82fd00
  💾 Wallet switch saved at /path/to/package/rootstock-wallet.json
  ```

- Example output when updating a wallet's name:

  ```
  📜 Available wallets:
  - firstWallet: 0x443Cdb69aDA3B9Ca617cc14763FBA57bfB82fd00 (Current)
  - imported: 0x4913AbCD40a9455a28134b4ccc37f4f95225e593
  ? 📝 Select the wallet you want to update the name for: imported
  ? 🖋️ Enter the new name for the wallet "imported": test
  ✅ Wallet name updated from "imported" to "test".
  💾 Changes saved at /path/to/package/rootstock-wallet.json
  ```

- Example output when deleting a wallet:

  ```
  📜 Other available wallets:
  - test: 0x4913AbCD40a9455a28134b4ccc37f4f95225e593
  ? ❌ Select the wallet you want to delete: test
  ? ⚠️ Are you sure you want to delete the wallet "test"? This action cannot be undone. yes
  🗑️ Wallet "test" has been deleted.
  💾 Changes saved at /path/to/package/rootstock-wallet.json
  ```

### 2. Check Balance

The `balance` command allows you to check the balance of your saved wallet on the Rootstock blockchain. You can check the balance on either the mainnet or testnet using the appropriate flags.

#### Mainnet

```bash
rsk-cli balance
```

Output example:

```
📄 Wallet Address: 0x08C4E4BdAb2473E454B8B2a4400358792786d341
🌐 Network: Rootstock Testnet
💰 Current Balance: 0.5015843199087592 RBTC
🔗 Ensure that transactions are being conducted on the correct network.
```

#### Testnet

Use the `-t` or `--testnet` flag to check the balance on the Rootstock testnet.

```bash
rsk-cli balance -t
```

Output example:

```
Balance on testnet: 0.6789 RBTC
```

### 3. Transfer rBTC

The `transfer` command allows you to transfer rBTC from your saved wallet to a specified address on the Rootstock blockchain. You can execute the transfer on either the mainnet or testnet using the appropriate flags.

#### Mainnet

```bash
rsk-cli transfer --address 0xRecipientAddress --value 0.001
```

#### Testnet

Use the `-t` or `--testnet` flag to execute the transfer on the Rootstock testnet.

```bash
rsk-cli transfer --testnet --address 0x0x08C4E4BdAb2473E454B8B2a4400358792786d341 --value 0.001
```

Output example:

```
📄 Wallet Address: 0x08C4E4BdAb2473E454B8B2a4400358792786d341
🎯 Recipient Address: 0x08C4E4BdAb2473E454B8B2a4400358792786d341
💵 Amount to Transfer: 0.001 RBTC
💰 Current Balance: 0.5015859620415593 RBTC
? Enter your password to decrypt the wallet: ****
🔄 Transaction initiated. TxHash: 0x0d27447f00c7de5b891d235268fc1e0b350ab46626aa93f8fb41f2cf9acb6a84
✅ Transaction confirmed successfully!
📦 Block Number: 5473422
⛽ Gas Used: 21000
🔗 View on Explorer: https://rootstock-testnet.blockscout.com/tx/0x0d27447f00c7de5b891d235268fc1e0b350ab46626aa93f8fb41f2cf9acb6a84
```

### 4. Check Transaction Status

The `tx` command allows you to check the status of a specific transaction on the Rootstock blockchain by providing the transaction ID. You can check the status on either the mainnet or testnet using the appropriate flags.

#### Mainnet

```bash
rsk-cli tx --txid 0x86deb77e1d666ae6848630496d672da8b5f48292681bda33f8f04245c55dde26
```

#### Testnet

```bash
rsk-cli tx --testnet --txid 0x86deb77e1d666ae6848630496d672da8b5f48292681bda33f8f04245c55dde26
```

Output example:

```
📄 Wallet Address: 0x08C4E4BdAb2473E454B8B2a4400358792786d341
🌐 Network: Rootstock Testnet
💰 Current Balance: 0.5015859620415593 RBTC
🔗 Ensure that transactions are being conducted on the correct network.
```

### 5. Deploy Smart Contract

The deploy command allows you to deploy a smart contract on the Rootstock blockchain. This command supports deployment on both the mainnet and testnet.

#### Mainnet

```bash
rsk-cli deploy --abi <path_to_abi> --bytecode <path_to_bytecode> --args <arg1> <arg2> ...
```

#### Testnet

```bash
rsk-cli deploy --testnet --abi <path_to_abi> --bytecode <path_to_bytecode> --args <arg1> <arg2> ...
```

Output example:

```
🔧 Initializing ViemProvider for testnet...
? Enter your password to decrypt the wallet: ****
🔑 Wallet account: 0xb4eb1352Ac339766727Df550A24D21f90935E78c
📄 Reading ABI from files/abi.json...
📄 Reading Bytecode from files/bytecode.bin...
✔ 🎉 Contract deployment transaction sent!
🔑 Transaction Hash: 0x4e4c6ed5998f3ea5391a66258c1dd0da1fa968d685b3d925d596ac16fdf81836
✔ 📜 Contract deployed successfully!
📍 Contract Address: 0xf922e98776686ae39119bc3ea224f54bd0500d3f
🔗 View on Explorer: https://explorer.testnet.rootstock.io/address/0xf922e98776686ae39119bc3ea224f54bd0500d3f
```

### 6. Verify Smart Contract

The verify command allows you to verify a smart contract on the Rootstock blockchain using JSON Standard Input via Rootstock Explorer API. This command supports contract verification on both the mainnet and testnet.

#### Mainnet

With arguments:

```bash
rsk-cli verify --json <path_to_json> --address <address> --name <contract_name> --decodedArgs <arg1> <arg2> ...
```

Without arguments:

```bash
rsk-cli verify --json <path_to_json> --address <address> --name <contract_name>
```

#### Testnet

With arguments:

```bash
rsk-cli verify --testnet --json <path_to_json> --address <address> --name <contract_name> --decodedArgs <arg1> <arg2> ...
```

Without arguments:

```bash
rsk-cli verify --testnet --json <path_to_json> --address <address> --name <contract_name>
```

Output example:

```
🔧 Initializing verification on testnet...
📄 Reading JSON Standard Input from files/30637d574184a42337b9861a661ee057.json...
🔎 Verifying contract ComplexStorage deployed at 0x5E6Fad85585E857A76368dD0962D3B0CCf48Eb21..
📄 Using constructor arguments: 0x28eb8d29e4713e211d1ddab19df3de16086bb8fa, 1
✔ 🎉 Contract verification request sent!
✔ 📜 Contract verified successfully!
🔗 View on Explorer: https://explorer.testnet.rootstock.io/address/0x5E6Fad85585E857A76368dD0962D3B0CCf48Eb21
```

### 7. Interact with verified smart contracts

The contract command allows you to interact with a smart contract on the Rootstock blockchain. This command lists all available read functions of a verified smart contract and allows you to call them. Write functions are excluded to ensure no state-changing operations are performed accidentally.

#### Mainnet

```bash
rsk-cli contract --address <address>
```

#### Testnet

```bash
rsk-cli contract --address <address> --testnet
```

Output example:

```
🔧 Initializing interaction on testnet...
🔎 Checking if contract 0x15c41c730b86d9a598bf00da2d27d963b6dd2318 is verified...
? Select a read function to call: symbol
📜 You selected: symbol

✅ Function symbol called successfully!
✔ 🔧 Result: ROOT
🔗 View on Explorer: https://explorer.testnet.rootstock.io/address/0x15c41c730b86d9a598bf00da2d27d963b6dd2318
```

### 8. Interact with RSK bridge contract

The bridge command allows you to interact with the RSK bridge contract on the Rootstock blockchain. This command lists all allowed read and write functions of the RSK bridge contract and allows you to call them.

#### Mainnet

```bash
rsk-cli bridge
```

#### Testnet

```bash
rsk-cli bridge --testnet
```

Output example:

```
🔧 Initializing bridge for testnet...
? Select the type of function you want to call: read
? Select a read function to call: getBtcBlockchainBestChainHeight
✅ Function getBtcBlockchainBestChainHeight called successfully!
✔ 🔧 Result: 3168757
🔗 View on Explorer: https://explorer.testnet.rootstock.io/address/0x0000000000000000000000000000000001000006
```

## Contributing

We welcome contributions from the community. Please fork the repository and submit pull requests with your changes. Ensure your code adheres to the project's main objective.

## Support

For any questions or support, please open an issue on the repository or reach out to the maintainers.

# Disclaimer

The software provided in this GitHub repository is offered “as is,” without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.

- **Testing:** The software has not undergone testing of any kind, and its functionality, accuracy, reliability, and suitability for any purpose are not guaranteed.
- **Use at Your Own Risk:** The user assumes all risks associated with the use of this software. The author(s) of this software shall not be held liable for any damages, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages arising out of the use of or inability to use this software, even if advised of the possibility of such damages.
- **No Liability:** The author(s) of this software are not liable for any loss or damage, including without limitation, any loss of profits, business interruption, loss of information or data, or other pecuniary loss arising out of the use of or inability to use this software.
- **Sole Responsibility:** The user acknowledges that they are solely responsible for the outcome of the use of this software, including any decisions made or actions taken based on the software’s output or functionality.
- **No Endorsement:** Mention of any specific product, service, or organization does not constitute or imply endorsement by the author(s) of this software.
- **Modification and Distribution:** This software may be modified and distributed under the terms of the license provided with the software. By modifying or distributing this software, you agree to be bound by the terms of the license.
- **Assumption of Risk:** By using this software, the user acknowledges and agrees that they have read, understood, and accepted the terms of this disclaimer and assumes all risks associated with the use of this software.
