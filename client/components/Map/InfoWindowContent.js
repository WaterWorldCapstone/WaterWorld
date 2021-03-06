import React from 'react'

export const InfoWindowContent = ({pool}) => {
  const redirect = () => {
    console.log('in the redirect function')
  }

  return (
    <div>
      <div>
        {' '}
        {pool.town}, {pool.country}{' '}
      </div>
      <p>
        Goal: {pool.goalFunds} <br />
        Current: {pool.currentFunds}
      </p>

      <p>
        <a href="/donate">
          <button onClick={() => redirect()}>Donate</button>
        </a>
      </p>
    </div>
  )
}
