
type Props = {
    text: string
    onClick: ()=> void,
    disable?: boolean
}

function Button({text, onClick, disable}:Props) {
  return (
    <>
      <button disabled={disable} onClick={onClick} className=" relative inline-flex items-center justify-center p-0.5 mb-2 mr-1 overflow-hidden text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 ">
        <span className="relative px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {text}
        </span>
      </button>
    </>
  );
}

export default Button