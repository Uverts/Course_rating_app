import { sql } from '../database/database.js'

export const listCoursesQuery = async (query) => {
    const courses = await sql`
    SELECT course_name, course_code 
    FROM courses
    WHERE course_code LIKE ${'%' + query + '%'}  LIMIT 10`
    return courses
}

export const listCourses = async () => {
  const courses = await sql`SELECT course_name, course_code FROM courses LIMIT 10`
  return courses
}

export const getCourse = async (courseCode) => {
  const courses = await sql`SELECT * FROM courses WHERE course_code = ${courseCode}`
  return courses
}

export const addFeedback = async (courseCode, userId, rating) => {
  await sql.begin(async sql => {
    const prevFeedback = await sql`
      SELECT * FROM feedbacks 
      WHERE course_code = ${courseCode} AND user_id = ${userId}
      LIMIT 1`

    if (prevFeedback.length === 0) {
      await sql`
        INSERT INTO feedbacks (course_code, user_id, rating) 
        VALUES (${courseCode},${userId} ,${rating} )`

      await sql`
        UPDATE courses
        SET rating_sum = rating_sum + ${rating},
            feedback_count = feedback_count + 1
        WHERE course_code = ${courseCode}`
    } else {
      await sql`
        UPDATE feedbacks
        SET rating = ${rating}
        WHERE course_code = ${courseCode} AND user_id = ${userId}`

      await sql`
        UPDATE courses
        SET rating_sum = rating_sum - ${prevFeedback[0].rating} + ${rating}
        WHERE course_code = ${courseCode}`
    }
  })
}

export const getComments = async (courseCode) => {
  // TODO
}

export const addComment = async (courseCode, userId, comment) => {
  // TODO
}

export const deleteComment = async (commentId) => {
  //  TODO
}

export const updateComment = async (commentId, updatedComment) => {
  // TODO
}
