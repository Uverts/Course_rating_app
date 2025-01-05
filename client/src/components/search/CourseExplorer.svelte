<script>
  import { onMount } from 'svelte'
  import SearchBox from './SearchBox.svelte'
  import SearchResults from './SearchResults.svelte'

  let courses = []

  const fetchCourses = (query) => {
    fetch(`/api/search/${query}`)
      .then((res) => res.json())
      .then((resJson) => {
        courses = resJson
      })
    }
    onMount(() => {
      fetchCourses('')
    })
</script>

<div class="h-screen flex flex-col">
  <div class="basis-1/4 flex justify-center mb-5">
    <SearchBox search={fetchCourses} />
  </div>
  <div class="basis-3/4 flex justify-center">
    <SearchResults results={courses} />
  </div>
</div>
