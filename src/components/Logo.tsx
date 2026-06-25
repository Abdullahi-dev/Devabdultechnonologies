import { Link } from "react-router-dom";

export function Logo({ className = "h-16 md:h-20", onClick, darkVariant = false }: { className?: string, onClick?: () => void, darkVariant?: boolean }) {
  return (
    <Link to="/" className="flex items-center group" onClick={onClick}>
      <div className={`relative flex items-center justify-start ${className} ${darkVariant ? 'bg-white px-4 py-2 rounded-xl shadow-lg' : ''}`}>
        <img 
          src="/Devabdultechnologies_logo.png" 
          alt="Devabdultechnologies Logo" 
          className="h-full w-auto object-contain object-left transition-all duration-300"
        />
      </div>
    </Link>
  );
}
