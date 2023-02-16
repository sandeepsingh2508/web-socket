import React from 'react'

const SingleRow = ({item}) => {
  return (
    <div key={item._id} style={{display:'flex',flexDirection:'row',gap:'200px'}}>
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <p>{item.accountstatus}</p>
                        <p>{item.creationdate}</p>
                    </div>
  )
}

export default SingleRow