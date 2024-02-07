import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const NewEntry = ({ categories, addEntry }) => {
  const params = useParams()
  const [entry, setEntry] = useState()
  const nav = useNavigate()

  const createEntry = async (e) => {
      e.preventDefault()
      let id = await addEntry(params.category_id, entry)
      setEntry("")
      nav(`/entry/${id}`)
  }

  return (
    <>
      <h3>New entry in category {categories[params.category_id]?.name}</h3>
      <form className='section' onSubmit={createEntry}>
        <div className="field">
          <label className="label">Content</label>
          <div className='control'>
            <textarea className="textarea" value={entry} onChange={e => setEntry(e.target.value)} placeholder="Start typing here..."></textarea>
          </div>
        </div>
        <div className="field is-grouped">
          <div className='control'>
            <button className="button is-link">Create Entry</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default NewEntry