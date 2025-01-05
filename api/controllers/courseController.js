import { listCoursesQuery, listCourses, getCourse, addFeedback } from '../services/courseService.js'
import { z } from '../deps.js'

const feedbackValidator = z.object({
    courseCode: z.string(),
    rating: z.number().min(1).max(5),
})

export const handleSearch = async (context) => {
  try {
    const query = context.params.query
    const searchResults = await listCoursesQuery(query)
    context.response.body = JSON.stringify(searchResults)
    context.response.status = 200
  } catch (err) {
    console.error('Failed while searching for courses with a query', err)
    context.response.status = 500
  }
}

export const handleGetCourses = async (context) => {
  try {
    const courses = await listCourses()
    context.response.body = JSON.stringify(courses)
    context.response.status = 200
  } catch (err) {
    console.error('Failed while searching for courses without a query', err)
    context.response.status = 500
  }
}

export const handleGetCourse = async (context) => {
  try {
    const courseCode = context.params.courseCode
    const course = await getCourse(courseCode)
    if (course.length < 1) {
      context.response.status = 404
      return
    }
    context.response.body = JSON.stringify(course[0])
    context.response.status = 200
  } catch (err) {
    console.error('Failed while retrieving course info', err)
    context.response.status = 500
  }
}

export const handleAddFeedback = async (context) => {
  try {
    const feedback = await context.request.body().value
    const validationRes = feedbackValidator.safeParse(feedback)
    if (!validationRes.success) {
      context.response.status = 400
      return
    }
    const { courseCode, rating } = feedback
    const course = await getCourse(courseCode)
    if (course.length < 1) {
      context.response.status = 404
      return
    }
    if (!context.userId) {
      context.response.status = 401
      return
    }
    await addFeedback(courseCode, context.userId, rating)
    context.response.status = 201
  } catch (err){
    console.error('Failed while adding feedback', err)
    context.response.status = 500 
  }
}
