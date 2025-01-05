<script>
  import { onMount } from 'svelte'
  import { authorization } from '../../stores/stores'
  import Rating from './Rating.svelte'
  import CommentSection from './CommentSection.svelte'

  let course = null
  let error = ''
    
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const courseCode = urlParams.get('courseCode')
    fetchCourse(courseCode)
  })

  const fetchCourse = (courseCode) => {
    fetch(`/api/courses/${courseCode}`)
      .then((res) => res.json())
      .then((resJson) => {
        course = resJson
      })
  }

  const submitFeedback = (courseCode, rating) => {
    fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': $authorization,
      },
      body: JSON.stringify({
        courseCode: courseCode,
        rating: rating,
      }),
    })
    .then((res) => {
      if (res.status === 400) {
        console.error('invalid input')
      } else if (res.status === 404) {
        console.error('course does not exist')
      } else if (res.status === 401) {
        error = 'You need to be logged in to submit feedback'
      } else if (res.status === 201) {
        fetchCourse(courseCode)
      }
    })
    .catch(err => console.error(err))
  }
  
</script>
{#if course}
  <div class="w-4/5 h-screen mx-auto flex flex-col">
    <div class="basis-1/6 text-center p-4">
      <h1 class="text-2xl text-bold mb-4">{course.course_name} - {course.course_code}</h1>
    </div>
    <div class="basis-3/6 flex flex-col flex-none justify-center items-center bg-prim p-4">
      <Rating course={course} submitFeedback={submitFeedback} />
      <div class="text-red-500 mt-3">{error}</div>
    </div>
      <CommentSection course={course} />
    </div>
{:else}
  <p>Loading...</p>
{/if}