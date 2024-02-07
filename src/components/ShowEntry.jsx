import React from "react"

const ShowEntry = ({ entry }) => {
  return entry ? (
   <>
    <h5>{entry.content}</h5>
    <p>Posted in {entry.category?.name}</p>
   </>
  ) : (
    <h5>Entry not found!</h5>
  )
}

export default ShowEntry