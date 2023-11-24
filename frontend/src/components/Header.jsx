
function Header() {
    const isDark = false;

  return (
    <header className={`flex justify-between items-center px-10 py-4 `}>
        <h1 className={`font-bold text-4xl cursor-pointer`}>Share<span className={`${isDark?'text-darkPrimary':'text-accent'}`}>IT</span></h1>
        <div>
          <p className="text-lg font-medium">Login</p>
        </div>
    </header>
  )
}

export default Header