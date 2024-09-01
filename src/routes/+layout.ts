import type { LayoutLoad } from './$types';
import * as chains from 'viem/chains';


export const load = (async () => {
    return {
        chainArray: Object.values(chains)
    };
}) satisfies LayoutLoad;