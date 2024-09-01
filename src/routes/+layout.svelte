<script lang="ts">
	import { defaultConfig } from 'svelte-wagmi';
	import { walletConnect, injected } from '@wagmi/connectors';
	import { onMount } from 'svelte';
	import { PUBLIC_WALLETCONNECT_ID, PUBLIC_ALCHEMY_ID } from '$env/static/public';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	onMount(async () => {
		const erckit = defaultConfig({
			appName: 'EVM Template Dapp',
			walletConnectProjectId: PUBLIC_WALLETCONNECT_ID,
			alchemyId: PUBLIC_ALCHEMY_ID,
			connectors: [
				injected(),
				walletConnect({
					projectId: PUBLIC_WALLETCONNECT_ID
				})
			],
			chains: data.chains
		});
		await erckit.init();
	});
</script>

<slot />
