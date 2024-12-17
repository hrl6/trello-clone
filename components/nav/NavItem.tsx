type NavItemProps = {
  label: string
}

export function NavItem({ label }: NavItemProps) {
  return (
    <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-sm">
      {label}
    </button>
  )
}
