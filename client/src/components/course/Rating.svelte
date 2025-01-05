<script>
  export let course
  export let submitFeedback
  let starsSelected = null
</script>

<div class="flex w-full justify-around my-4">
  <div class="text-center">
    <p class="text-lg font-medium text-black">Average Rating</p>
    <span class="text-4xl font-semibold text-black">{course.rating_sum / course.feedback_count}</span>
  </div>
  <div class="text-center">
    <p class="text-lg font-medium text-black">Feedback Count</p>
    <span class="text-4xl font-semibold text-black">{course.feedback_count}</span>
  </div>
</div>

<div class="flex flex-col items-center gap-2">
  <div class="flex gap-2">
    {#each [1, 2, 3, 4, 5] as star}
      <button
        class="text-6xl text-yellow-500"
        on:click={() => starsSelected = star}
      >
        {star <= starsSelected ? '★' : '☆'}
      </button>
    {/each}
  </div>
  
  <button 
    class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    on:click={() => submitFeedback(course.course_code, starsSelected)}
    disabled={starsSelected === null}
  >
    Submit Feedback
  </button>
</div>
