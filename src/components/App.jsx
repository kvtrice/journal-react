import React, { useState, useEffect } from 'react'
import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry';

const App = () => {

  const [categories, setCategories] = useState(['Food', 'Gaming', 'Coding', 'Other'])
  const [entries, setEntries] = useState([{category: 0, content: 'I like pizza!'}])

  useEffect(() => {
    fetch('https://journal-api-xz6o.onrender.com/categories')
      .then(response => response.json())
      .then(data => setCategories(data))

      fetch('https://journal-api-xz6o.onrender.com/entries')
      .then(response => response.json())
      .then(data => setEntries(data))
  }, [])

  async function addEntry(category_id, content) {
    const newId = entries.length

    const newEntry = {
      category: categories[category_id]._id,
      content: content,
    }

    // POST to API
    const result = await fetch('https://journal-api-xz6o.onrender.com/entries', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry)
    })
      const data = await result.json()
      setEntries([...entries, data])

    return newId
  }

  // Higher Order Component (HOC)
  function ShowEntryWrapper({categories}) {
    const { id } = useParams()
    return <ShowEntry categories={categories} entry={entries[id]} /> 
  }

  return (
    <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home entries={entries} />} />
            <Route path="/category" element={
              <CategorySelection 
                categories={categories}
                />} 
              />
            <Route path="/entry" >
              <Route path=":id" element={<ShowEntryWrapper categories={categories} />}/>
              <Route path="new/:category_id" element={<NewEntry categories={categories} addEntry={addEntry} />}/>
            </Route>
            <Route path='*' element={<h3>Page not found</h3>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App