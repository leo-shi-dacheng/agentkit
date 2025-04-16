import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { Network } from "../../network";
import { CreateAction } from "../actionDecorator";
import { WrapHskSchema } from "./schemas";
import { WHSK_ABI, WHSK_ADDRESS } from "./constants";
import { encodeFunctionData, Hex } from "viem";
import { EvmWalletProvider } from "../../wallet-providers";

/**
 * WhskActionProvider is an action provider for WHSK.
 */
export class WhskActionProvider extends ActionProvider<EvmWalletProvider> {
  /**
   * Constructor for the WhskActionProvider.
   */
  constructor() {
    super("whsk", []);
  }

  /**
   * Wraps HSK to WHSK.
   *
   * @param walletProvider - The wallet provider to use for the action.
   * @param args - The input arguments for the action.
   * @returns A message containing the transaction hash.
   */
  @CreateAction({
    name: "wrap_hsk",
    description: `
    This tool can only be used to wrap HSK to WHSK.
Do not use this tool for any other purpose, or trading other assets.

Inputs:
- Amount of HSK to wrap.

Important notes:
- The amount is a string and cannot have any decimal points, since the unit of measurement is wei.
- Make sure to use the exact amount provided, and if there's any doubt, check by getting more information before continuing with the action.
- 1 wei = 0.000000000000000001 WHSK
- Minimum purchase amount is 100000000000000 wei (0.0000001 WHSK)
- Only supported on the following networks:
  - Hashkey Testnet (ie, 'hashkey-testnet')
  - Hashkey Mainnet (ie, 'hashkey', 'hashkey-mainnet')
`,
    schema: WrapHskSchema,
  })
  async wrapHsk(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof WrapHskSchema>,
  ): Promise<string> {
    try {
      const hash = await walletProvider.sendTransaction({
        to: WHSK_ADDRESS as Hex,
        data: encodeFunctionData({
          abi: WHSK_ABI,
          functionName: "deposit",
        }),
        value: BigInt(args.amountToWrap),
      });

      await walletProvider.waitForTransactionReceipt(hash);

      return `Wrapped HSK with transaction hash: ${hash}`;
    } catch (error) {
      return `Error wrapping HSK: ${error}`;
    }
  }

  /**
   * Checks if the Whsk action provider supports the given network.
   *
   * @param network - The network to check.
   * @returns True if the Whsk action provider supports the network, false otherwise.
   */
  supportsNetwork = (network: Network) =>
    network.networkId === "hashkey-mainnet" || network.networkId === "hashkey-testnet";
}

export const whskActionProvider = () => new WhskActionProvider();
