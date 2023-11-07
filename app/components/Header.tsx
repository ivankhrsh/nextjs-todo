import React from 'react'
import Login from './Auth/AuthContainer'

export default function Header () {
  const styles = {
    header: 'w-full',
  };

  return (
    <div className={styles.header}>
      <Login/>
    </div>
  )
}
