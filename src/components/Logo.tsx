
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo = ({ size = "medium" }: LogoProps) => {
  const sizeClasses = {
    small: "h-6",
    medium: "h-10",
    large: "h-16"
  };

  return (
    <Link to="/" className="inline-flex items-center transition-transform duration-300 hover:scale-105">
      <div className={`font-bold ${sizeClasses[size]} flex items-center`}>
        <span className="text-brand-yellow">In</span>
        <span>fix</span>
      </div>
    </Link>
  );
};

export default Logo;
