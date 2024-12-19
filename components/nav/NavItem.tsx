type NavItemProps = {
  label: string
}

export function NavItem({ label }: NavItemProps) {
  return (
    <button className="relative px-3 py-1.5 text-gray-600 group">
    {label}
    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
  </button>
  )
}

export function NavMobileItem({ label }: NavItemProps) {
  return (
    <button className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded-sm">
      {label}
    </button>
  )
}