import React, { Children } from 'react'
import useHover from 'react-use-hover'
import { Link } from 'react-router-dom'

export default function PreFetchHoverLink({ to, onHover, delay, children }) {
  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: delay })

  if (isHovering) {
    // onHover()
  }
  return (
    <Link {...hoverProps} to={to}>
      {children}
    </Link>
  )
}
