'use client'

import { Search, Plus, Menu, X } from 'lucide-react'
import { NavItem, NavMobileItem } from './NavItem'
import { useState } from 'react'

export function Navbar() {
  const [isFocused, setIsFocused] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="h-14 bg-white border-b px-4 flex items-center gap-4">
      <div className="flex items-center gap-4 flex-1">
        <button 
          className="lg:hidden text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <span className="text-2xl font-bold text-blue-600 line leading-6 truncate">Trello Ciplak</span>
        
        <div className="hidden lg:flex items-center gap-2">
          <NavItem label="Workspaces" />
          <NavItem label="Recent" />
          <NavItem label="Starred" />
        </div>

        <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 shadow-[#cee2ff] shadow-sm pr-5 px-3 py-1.5 rounded-md hidden lg:flex items-center gap-1">
          <Plus size={16} />
          Create
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button>
          <Search size={18} className="visible text-slate-600 md:hidden hover:scale-110"/>
        </button>
        
        <div className="relative hidden md:flex">
          <input
            type="text"
            placeholder="Search..."
            className={`
              pl-8 pr-4 py-1.5 
              bg-gray-50 
              rounded-lg 
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

        <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center text-white text-[0.8rem] leading-10">
          TC
        </div>
      </div>

      <div className={`
        absolute 
        inset-x-0 
        top-14 
        bg-white 
        border-b 
        lg:hidden
        transition-all 
        duration-200 
        ease-in-out
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        <div className="p-4 space-y-4">
          <NavMobileItem label="Workspaces" />
          <NavMobileItem label="Recent" />
          <NavMobileItem label="Starred" />
          <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-sm flex items-center gap-1">
            <Plus size={16} />
            Create
          </button>
        </div>
      </div>
    </nav>
  )
}