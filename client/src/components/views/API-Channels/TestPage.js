import React from 'react'

const TestPage = () => {
  return (
    <div>
      <form
        action="https://a2delight.com/wp-admin/admin-post.php?action=fritadoai_submit_article"
        method="POST"
      >
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label for="article">Article:</label>
          <textarea id="article" name="article" rows="10" cols="30" required></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
//https://a2delight.com/thank-you
export default TestPage
