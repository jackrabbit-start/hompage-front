const NavBar = () => {
  return (
    <nav className="px-10 py-2 flex justify-start items-center h-[5rem] bg-gray-300 text-white rounded-xl m-[1rem] bg-opacity-50">
      <div className="gap-4 flex items-center justify-start">
        <img className="w-[4rem] mt-2 mr-5" src="/icon.svg" />
        <span className="font-pretendard font-bold text-xl">
          <h1>JackRabbit</h1>
          <h2 className="font-semibold text-lg">김기현</h2>
        </span>
      </div>
    </nav>
  );
};
export default NavBar;