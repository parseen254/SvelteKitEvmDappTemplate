import { type ReadContractParameters, readContract } from "@wagmi/core";
import { type Abi, type ContractFunctionName } from "viem";
import { config } from "./config";

export default async function _readContract<
    TAbi extends Abi | readonly unknown[],
    TFunctionName extends ContractFunctionName<TAbi, 'pure' | 'view'>,
>(params: ReadContractParameters<TAbi, TFunctionName, never, typeof config>) {
    return readContract(config, params);
} 