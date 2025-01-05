<script>
  export let search
  let query = ''
</script>

<div class="bg-prim p-6 rounded-lg shadow-md border-2 w-4/5"> 
  <h1 class="font-semibold">Search for course</h1>
  <div>
    <input 
      class="w-40 p-2 rounded-lg border-2 border-gray-100 mt-4"
      placeholder="course code" 
      bind:value={query}
    />
    <button on:click={search(query)} class="p-2 ml-1 rounded-lg bg-gray-100 hover:bg-gray-200">
      search
    </button>
  </div>
</div>
