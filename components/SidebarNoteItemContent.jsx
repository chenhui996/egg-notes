'use client'
import React, { useState, useRef, useEffect, useTransition } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const SidebarNoteItemContent = props => {
  const { id, title, expandedChildren, children } = props
  const router = useRouter()
  const pathname = usePathname()
  const selectedId = pathname.split('/')[1] || null

  const [isPending] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = id === selectedId

  const itemRef = useRef(null)
  const prevTitleRef = useRef(title)

  // ------------------------------------------------------------------------------------------

  const handleOpenClick = () => {
    const sidebarToggle = document.getElementById('sidebar-toggle')
    if (sidebarToggle) {
      sidebarToggle.checked = true
    }
    router.push(`/note/${id}`)
  }

  // ------------------------------------------------------------------------------------------

  const itemProps = {
    ref: itemRef,
    className: [
      'sidebar-note-list-item',
      isExpanded ? 'note-expanded' : ''
    ].join(' ')
  }

  const openBtnProps = {
    className: 'sidebar-note-open',
    style: {
      backgroundColor: isPending
        ? 'var(--gray-80)'
        : isActive
        ? 'var(--tertiary-blue)'
        : '',
      border: isActive
        ? '1px solid var(--primary-border)'
        : '1px solid transparent'
    },
    onClick: handleOpenClick
  }

  const toggleBtnProps = {
    className: 'sidebar-note-toggle-expand',
    style: {
      '--outline-box-shadow': 'none'
    },
    onClick: e => {
      e.stopPropagation()
      setIsExpanded(!isExpanded)
    }
  }

  // ------------------------------------------------------------------------------------------

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title
      itemRef.current.classList.add('flash')
    }
  }, [title])

  // ------------------------------------------------------------------------------------------

  return (
    <div {...itemProps}>
      {children}
      <button {...openBtnProps}>Open note for preview</button>
      <button {...toggleBtnProps}>
        {isExpanded ? (
          <img src='/chevron-down.svg' alt='Collapse' width={10} height={10} />
        ) : (
          <img src='/chevron-up.svg' alt='Expand' width={10} height={10} />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  )
}

export default SidebarNoteItemContent
