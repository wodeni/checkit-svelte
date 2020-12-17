<script lang="ts">
    import Nav from "./components/Nav.svelte";
    import { onMount } from "svelte";
    import { banks } from "./stores/banks";
    import Router from "svelte-spa-router";
    import { routes } from "./routes";
    import { Spinner } from "sveltestrap";

    let loading = true;
    onMount(async () => {
        const diffEq = await fetch(`./banks/clontz-diff-eq.json`);
        const linearAlg = await fetch(`./banks/tbil-la-bank.json`);
        const vis = await fetch(`./banks/nimo-vis-bank.json`);
        banks.set([
            await vis.json(),
            await diffEq.json(),
            await linearAlg.json(),
        ]);
        loading = false;
    });
</script>

<style>
    h1 {
        margin-top: 1em;
    }
</style>

{#if loading}
    <Nav />
    <div class="text-center">
        <h1 class="display-4">Loading ☑️It...</h1>
        <Spinner color="primary" />
    </div>
{:else}
    <Router {routes} />
{/if}
