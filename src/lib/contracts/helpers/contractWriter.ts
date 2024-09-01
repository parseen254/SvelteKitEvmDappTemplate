import { writeContract, type Config, type WriteContractParameters } from "@wagmi/core";

export default async function _writeContract(
    config: Config,
    params: WriteContractParameters
) {
    return writeContract(config, params);
}