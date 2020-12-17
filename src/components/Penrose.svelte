<script>
  import { afterUpdate } from "svelte";
  export let exercise;
  $: independent = exercise.params.independent;

  let penroseDiv;

  afterUpdate(() => {
    console.log("Updated");
    renderPenrose();
  });

  let elem;
  const renderPenrose = async () => {
    const penrose = window.penrose.API;
    if (penroseDiv) {
      let res;
      if (independent) {
        res = await fetch("independent.json");
      } else {
        res = await fetch("dependent.json");
      }
      let state = await res.json();
      if (elem) penroseDiv.removeChild(elem);
      elem = document.createElement("div");
      penroseDiv.appendChild(elem);
      state = penrose.resample(state);
      penrose.diagram(state, elem);
    }
  };

  const loadPenrose = () => {
    console.log("Penrose loaded!", window.penrose);
    renderPenrose();
  };
</script>

<svelte:head>
  <script src="penrose.js" on:load={loadPenrose}>

  </script>
</svelte:head>

<div bind:this={penroseDiv} style="width: 75%; margin: auto" />
