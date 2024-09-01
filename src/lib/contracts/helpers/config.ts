import * as chainsObject from '@wagmi/core/chains';

import { createConfig, http } from '@wagmi/core'

import type { Chain } from '@wagmi/core/chains'
import { createClient } from 'viem'

export const config = createConfig({
    chains: Object.values(chainsObject) as unknown as readonly [Chain, ...Chain[]],
    client({ chain }) {
        return createClient({ chain, transport: http() });
    }
});
