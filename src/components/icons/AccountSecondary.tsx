import { useState } from 'react';

export function AccountSecondary() {
  const [showToolTip, setShowToolTip] = useState<boolean>();

  const handleMouseEnter = () => {
    setShowToolTip(true);
  };

  const handleMouseLeave = () => {
    setShowToolTip(false);
  };

  return (
    <div className="relative group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        className="text-violet-700"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <g fill="none">
          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
          <path
            fill="currentColor"
            d="M12 13c2.396 0 4.575.694 6.178 1.672c.8.488 1.484 1.064 1.978 1.69c.486.615.844 1.351.844 2.138c0 .845-.411 1.511-1.003 1.986c-.56.45-1.299.748-2.084.956c-1.578.417-3.684.558-5.913.558s-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C3.41 20.01 3 19.345 3 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69C7.425 13.695 9.605 13 12 13m0-11a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
          />
        </g>
      </svg>
      {showToolTip && (
        <div className="absolute bottom-full mb-2 left-32 transform -translate-x-1/2 w-72 p-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity ">
          <ul>
            CUENTA SECUNDARIA:
            <li className="pb-1">
              - Jugas si o si con el usuario que nosotros te enviamos.
            </li>
            <li className="pb-1">
              - Necesitas conexión permanente a internet para poder jugar.
            </li>
            <li className="pb-1">
              - Podes jugar online siempre y cuando tengas ps plus en tu
              consola.
            </li>
            <li className="pb-1">
              - Es más económico que la cuenta primaria porque jugas desde el
              usuario que te pasamos.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
