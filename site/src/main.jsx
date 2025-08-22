import React, { useEffect } from 'react'
import { globalCss } from '@stitches/react'

const globalStyles = globalCss({
  /* Sections are visible by default; reveal animation disabled for now */
  section: { opacity: 1, translate: '0 0' },
  // other global styles...
})

const styles = {
  header: {
    // header styles...
  },
  // other styles...
}

export default function App() {
  useEffect(() => {
    globalStyles()
  }, [])

  return (
    <>
      <header style={styles.header}>
        {/* header content */}
      </header>
      {/* rest of the app */}
    </>
  )
}