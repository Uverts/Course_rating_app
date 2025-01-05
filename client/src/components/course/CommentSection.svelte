<script>
  export let course
</script>

<div class="w-full mx-auto mt-10 p-4">
  <h1 class="text-2xl font-semibold text-center mb-6">Comment section</h1>
  <p class="text-sm">user123:</p>
  <div class="flex flex-col gap-1">
    <div class="p-4 border border-gray-300 rounded-lg shadow-sm">
      <p class="text-gray-700">cmmnt</p>
    </div>
  </div>
  <div class="mt-6">
    <textarea
      class="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
      rows="4"
      placeholder="comment content"
    ></textarea>
    <button
      class="mt-3 p-3 w-full bg-blue-500 text-white rounded-lg hover:bg-gray-300"
    >
      Submit
    </button>
  </div>
</div>