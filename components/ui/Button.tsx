type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost' | 'danger'
}

export function Button({ variant = 'default', className = '', ...props }: ButtonProps) {
  const baseClasses = 'p-2 rounded transition-colors'
  const variantClasses = {
    default: 'bg-blue-500 hover:bg-blue-600 text-white',
    ghost: 'hover:bg-gray-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}