<script lang="ts">
	import {
		wagmiLoaded,
		connected,
		chainId,
		signerAddress,
		web3Modal,
		disconnectWagmi
	} from 'svelte-wagmi';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>EVM Template Dapp</h1>

{#if $wagmiLoaded && $connected}
	<div>
		<h1>Connected</h1>
		<p>Current Chain ID: {$chainId}</p>
		<p>Current Chain: {data.chainArray.find((chain) => chain.id === $chainId)?.name}</p>
		<p>Signer Address: {$signerAddress}</p>
		<button
			on:click={async () => {
				await disconnectWagmi();
			}}>Disconnect Wallet</button
		>
	</div>
{:else}
	<div>
		<h1>Not Connected</h1>
		<button on:click={() => $web3Modal.open()}> Connect Wallet</button>
	</div>
{/if}
