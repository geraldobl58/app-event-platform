type ButtonProps = {
  color?: boolean 
  children: React.ReactNode
}

export function Button({ color, children }: ButtonProps) {
  return (
    <a 
      href="#" 
      className={
        `${color ? 
          'p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors' 
          : 
          'p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors'}`
      }
    >
      {children}
    </a>
  )
}