import { Link } from 'react-router-dom'
import { HiDocumentDuplicate } from 'react-icons/hi'

const Logo = ({ size = 'default' }) => {
  const sizeClasses = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-3xl'
  }
  
  const iconSizes = {
    small: 'h-5 w-5',
    default: 'h-6 w-6',
    large: 'h-8 w-8'
  }

  return (
    <Link to="/" className={`flex items-center font-bold ${sizeClasses[size]} text-primary-600`}>
      <HiDocumentDuplicate className={`${iconSizes[size]} mr-2`} />
      <span className="tracking-tight">PeerTask</span>
    </Link>
  )
}

export default Logo