import type { LayoutLoad } from './$types';

import * as chainsObject from '@wagmi/core/chains';



export const load = (async () => {
    return {
        chains: Object.values(chainsObject)
    };
}) satisfies LayoutLoad;