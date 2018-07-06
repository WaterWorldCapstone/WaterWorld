import React from 'react'

export const InfoWindowContent = ({pool}) => {
  console.log('pool is', pool)

  return (
    <div>
      <a href={`/pools/${pool.id}`}>
        <div> {pool.name} </div>
        <p />
        {pool.currentFunds ? <div>Current: ${pool.currentFunds}</div> : <div />}
        {pool.goalFunds ? <div> Current: ${pool.goalFunds}</div> : <div />}

        <p>
          {/* <a href="/donate">
          <button onClick={() => redirect()}>Donate</button>
        </a> */}
        </p>
      </a>
    </div>
  )
}
