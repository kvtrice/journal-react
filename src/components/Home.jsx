import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ entries }) => {
  return (
    <>
      <h5>Journal Entries</h5>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            <Link to={`/entry/${index}`}>{entry.content}</Link>
          </li>
        ))}
      </ul>
    </>
  ) 
}

export default Home