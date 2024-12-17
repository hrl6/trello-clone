'use client'

import { Search, Plus } from 'lucide-react'
import { NavItem } from './NavItem'
import { useState } from 'react'

export function Navbar() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <nav className="h-14 bg-white border-b px-4 flex items-center gap-4">
      <div className="flex items-center gap-4 flex-1">
        <span className="text-2xl font-bold text-blue-600">Trello Ciplak</span>
        
        <div className="flex items-center gap-2">
          <NavItem label="Workspaces" />
          <NavItem label="Recent" />
          <NavItem label="Starred" />
        </div>

        <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-sm flex items-center gap-1">
          <Plus size={16} />
          Create
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className={`
              pl-8 pr-4 py-1.5 
              bg-gray-50 
              rounded-sm 
              border 
              focus:outline-none 
              focus:bg-white
              transition-all duration-200 ease-in-out
              ${isFocused ? 'w-96' : 'w-64'}
            `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Search size={16} className="absolute left-2.5 top-2.5 text-gray-500" />
        </div>

        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          TC
        </div>
      </div>
    </nav>
  )
}