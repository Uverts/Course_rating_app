<script>
  export let results
</script>

<div class="bg-prim p-6 rounded-lg shadow-md border-2 w-4/5"> 
  <h1 class="p-2 font-semibold">Courses:</h1>
  <ul>
  {#each results as result}
    <a href={`/courses?courseCode=${result.course_code}`}>
      <li class="hover:bg-gray-300 border border-gray-100 text-gray-100 rounded-lg m-1 p-2">
        {result.course_name} - {result.course_code}
      </li>
    </a>
  {/each}
  </ul>
</div>