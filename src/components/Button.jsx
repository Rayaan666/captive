const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-full font-sans font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 inline-block text-center";
  
  const variants = {
    primary: "bg-gradient-brand text-black shadow-[0_0_15px_rgba(255,140,0,0.5)] hover:shadow-[0_0_25px_rgba(255,140,0,0.8)]",
    outline: "border-2 border-brand-orange text-brand-orange hover:bg-brand-orange/10",
    ghost: "text-white hover:text-brand-orange"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
