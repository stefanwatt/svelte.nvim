<script>
  let state = { name: "world" };
  const x = "foo";
  const y = "bar";
  let loading = false;
  const focus = (node) => {
    node.focus();
  };
</script>

<h1>{state.name === "world" ? x : y}</h1>
<div use:focus class:foo={loading} class="{x + y} btn">foo</div>
{#if loading || x === y.toLowerCase()}
  loading...
{:else}
  content
{/if}
