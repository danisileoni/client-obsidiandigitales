import { useState } from 'react';

export function AccountPrimary() {
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
        className="text-sky-700"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <title>Cuenta Primaria</title>
        <g fill="none">
          <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
          <path
            fill="currentColor"
            d="M6 7a5 5 0 1 1 10 0A5 5 0 0 1 6 7m-1.178 7.672C6.425 13.694 8.605 13 11 13c.447 0 .887.024 1.316.07a1 1 0 0 1 .72 1.557A5.968 5.968 0 0 0 12 18c0 .92.207 1.79.575 2.567a1 1 0 0 1-.89 1.428L11 22c-2.229 0-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C2.41 20.01 2 19.345 2 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69ZM18 14a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1"
          />
        </g>
      </svg>
      {showToolTip && (
        <div className="absolute bottom-full mb-2 left-32 md:-translate-x-[20.8rem] transform max-md:-translate-x-[20.8rem] -translate-x-1/2 w-72 p-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          <ul>
            <li>CUENTA PRIMARIA:</li>
            <li className="pb-1">
              - Vas a poder jugar con tu usuario personal.
            </li>
            <li className="pb-1">
              - No necesitas conexión permanente a internet (Solamente para las
              descargas)
            </li>
            <li className="pb-1">
              - Los trofeos o cosas que ganes van a ir directamente a tu usuario
              personal.
            </li>
            <li className="pb-1">
              - Podes jugar online siempre y cuando tengas ps plus en tu
              consola.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
