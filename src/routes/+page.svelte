<script lang="ts">
	import {
		wagmiLoaded,
		connected,
		chainId,
		signerAddress,
		web3Modal,
		disconnectWagmi,
		wagmiConfig
	} from 'svelte-wagmi';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { abi as counterAbi } from '$lib/contracts/abis/counterAbi.json';
	import type { Abi } from 'viem';
	import readContract from '$lib/contracts/helpers/contractReader';
	import writeContract from '$lib/contracts/helpers/contractWriter';
	import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';
	export let data: PageData;

	const counterAddress = PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
	let counterValue = 0;

	async function increment() {
		const tx = await writeContract($wagmiConfig, {
			abi: counterAbi as Abi,
			address: counterAddress,
			functionName: 'increment'
		});
		console.log('Increment transaction tx:', tx);
		await updateCounter();
	}

	async function decrement() {
		const tx = await writeContract($wagmiConfig, {
			abi: counterAbi as Abi,
			address: counterAddress,
			functionName: 'decrement'
		});
		console.log('Decrement transaction hash:', tx);
		await updateCounter();
	}

	async function setNumber(newNumber: number) {
		const tx = await writeContract($wagmiConfig, {
			abi: counterAbi as Abi,
			address: counterAddress,
			functionName: 'setNumber',
			args: [newNumber]
		});
		console.log('SetNumber transaction tx:', tx);
		await updateCounter();
	}

	async function readNumber() {
		const result = await readContract({
			abi: counterAbi as Abi,
			address: counterAddress,
			functionName: 'number'
		});
		counterValue = Number(result);
		console.log('Current counter value:', counterValue);
	}

	async function updateCounter() {
		await readNumber();
	}

	let newNumberInput = 0;

	onMount(() => {
		updateCounter();
	});
</script>

<h1>EVM Template Dapp</h1>

{#if $wagmiLoaded && $connected}
	<div>
		<h1>Connected</h1>
		<p>Current Chain ID: {$chainId}</p>
		<p>Current Chain: {data.chains.find((chain) => chain.id === $chainId)?.name}</p>
		<p>Signer Address: {$signerAddress}</p>
		<button
			on:click={async () => {
				await disconnectWagmi();
			}}>Disconnect Wallet</button
		>

		<h2>Counter Contract Interaction</h2>
		<p>Current Counter Value: {counterValue}</p>
		<button on:click={increment}>Increment</button>
		<button on:click={decrement}>Decrement</button>
		<div>
			<input type="number" bind:value={newNumberInput} />
			<button on:click={() => setNumber(newNumberInput)}>Set Number</button>
		</div>
		<button on:click={readNumber}>Refresh Counter</button>
	</div>
{:else}
	<div>
		<h1>Not Connected</h1>
		<button on:click={() => $web3Modal.open()}> Connect Wallet</button>
	</div>
{/if}
