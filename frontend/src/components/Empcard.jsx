import React from 'react'

const Empcard = ({id, workCount,date}) => {

  return (
    <div className='p-2 rounded bg-gray-50 mt-2 flex justify-between'>
       <p>{id}</p>
       <p>{ workCount}</p>
       <p>{date}</p>
    </div>
  )
}

export default Empcard