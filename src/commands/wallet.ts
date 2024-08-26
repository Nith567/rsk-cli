import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const walletFilePath = path.join(process.cwd(), "rootstock-wallet.json");

type InquirerAnswers = {
  action?: string;
  password?: string;
  saveWallet?: boolean;
  privateKey?: string;
  address?: string;
  useExistingWallet?: boolean;
};

export async function walletCommand() {
  try {
    if (fs.existsSync(walletFilePath)) {
      const walletData = JSON.parse(fs.readFileSync(walletFilePath, "utf8"));

      const useExistingWalletQuestion: any = [
        {
          type: "confirm",
          name: "useExistingWallet",
          message:
            "🔍 A saved wallet was found. Would you like to use this existing wallet?",
          default: true,
        },
      ];

      const { useExistingWallet } = await inquirer.prompt<InquirerAnswers>(
        useExistingWalletQuestion
      );

      if (useExistingWallet) {
        console.log(chalk.green("🎉 Using the existing wallet."));
        console.log(
          chalk.white(`📄 Address:`),
          chalk.green(`${chalk.bold(walletData.address)}`)
        );
        return; // Exit the function as no further action is needed
      }

      const questions: any = [
        {
          type: "list",
          name: "action",
          message: "What would you like to do instead?",
          choices: [
            "🆕 Create a new wallet",
            "🔑 Insert wallet address and private key",
          ],
        },
      ];

      const { action } = await inquirer.prompt<InquirerAnswers>(questions);

      if (action === "🔑 Insert wallet address and private key") {
        const inputQuestions: any = [
          {
            type: "input",
            name: "address",
            message: "🏷️ Enter your wallet address:",
          },
          {
            type: "password",
            name: "privateKey",
            message: "🔑 Enter your private key:",
            mask: "*",
          },
        ];

        const { address, privateKey } = await inquirer.prompt<InquirerAnswers>(
          inputQuestions
        );

        const prefixedPrivateKey = `0x${privateKey!.replace(
          /^0x/,
          ""
        )}` as `0x${string}`;
        const account = privateKeyToAccount(prefixedPrivateKey);

        if (account.address.toLowerCase() === address!.toLowerCase()) {
          console.log(chalk.green("✅ Wallet validated successfully!"));
          console.log(
            chalk.white(`📄 Address:`),
            chalk.green(`${chalk.bold(account.address)}`)
          );

          const saveWalletQuestion: any = [
            {
              type: "confirm",
              name: "saveWallet",
              message:
                "💾 Would you like to save this wallet securely for future use?",
              default: true,
            },
          ];

          const { saveWallet } = await inquirer.prompt<InquirerAnswers>(
            saveWalletQuestion
          );

          if (saveWallet) {
            const passwordQuestion: any = [
              {
                type: "password",
                name: "password",
                message: "🔒 Enter a password to encrypt your wallet:",
                mask: "*",
              },
            ];

            const { password } = await inquirer.prompt<InquirerAnswers>(
              passwordQuestion
            );

            const iv = crypto.randomBytes(16);
            const key = crypto.scryptSync(password!, iv, 32);
            const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

            let encryptedPrivateKey = cipher.update(
              prefixedPrivateKey,
              "utf8",
              "hex"
            );
            encryptedPrivateKey += cipher.final("hex");

            const newWalletData = {
              address: account.address,
              encryptedPrivateKey: encryptedPrivateKey,
              iv: iv.toString("hex"),
            };

            fs.writeFileSync(
              walletFilePath,
              JSON.stringify(newWalletData, null, 2),
              "utf8"
            );
            console.log(
              chalk.green(`💾 Wallet saved securely at ${walletFilePath}`)
            );
          }
        } else {
          console.log(
            chalk.red(
              "❌ The provided private key does not match the provided address."
            )
          );
        }
        return;
      }
    }

    const privateKey: string = generatePrivateKey();
    const prefixedPrivateKey: `0x${string}` = `0x${privateKey.replace(
      /^0x/,
      ""
    )}` as `0x${string}`;
    const account = privateKeyToAccount(prefixedPrivateKey);

    console.log(
      chalk.rgb(255, 165, 0)(`🎉 Wallet created successfully on Rootstock!`)
    );
    console.log(
      chalk.white(`📄 Address:`),
      chalk.green(`${chalk.bold(account.address)}`)
    );
    console.log(
      chalk.white(`🔑 Private Key:`),
      chalk.green(`${chalk.bold(prefixedPrivateKey)}`)
    );
    console.log(
      chalk.gray("🔒 Please save the private key in a secure location.")
    );

    const saveWalletQuestion: any = [
      {
        type: "confirm",
        name: "saveWallet",
        message:
          "💾 Would you like to save this wallet securely for future use?",
        default: true,
      },
    ];

    const { saveWallet } = await inquirer.prompt<InquirerAnswers>(
      saveWalletQuestion
    );

    if (saveWallet) {
      const passwordQuestion: any = [
        {
          type: "password",
          name: "password",
          message: "🔒 Enter a password to encrypt your wallet:",
          mask: "*",
        },
      ];

      const { password } = await inquirer.prompt<InquirerAnswers>(
        passwordQuestion
      );

      const iv = crypto.randomBytes(16);
      const key = crypto.scryptSync(password!, iv, 32);
      const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

      let encryptedPrivateKey = cipher.update(
        prefixedPrivateKey,
        "utf8",
        "hex"
      );
      encryptedPrivateKey += cipher.final("hex");

      const walletData = {
        address: account.address,
        encryptedPrivateKey: encryptedPrivateKey,
        iv: iv.toString("hex"),
      };

      fs.writeFileSync(
        walletFilePath,
        JSON.stringify(walletData, null, 2),
        "utf8"
      );
      console.log(chalk.green(`💾 Wallet saved securely at ${walletFilePath}`));
    }
  } catch (error: any) {
    console.error(
      chalk.red("❌ Error creating or managing wallet:"),
      chalk.yellow(error.message || error)
    );
  }
}
