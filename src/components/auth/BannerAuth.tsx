import { Link } from '@tanstack/react-router';
import logo from '../../assets/logo.webp';

export const BannerAuth = () => {
  return (
    <div className="relative bg-[url('./assets/banner-auth.webp')] bg-cover flex flex-col rounded-s-2xl pl-8 clip-corner text-white text-5xl text-left font-bold h-[45rem] w-[35rem]">
      <Link to="/" className="self-center relative z-10">
        <img src={logo} alt="QuaraStore" className="w-80 mt-14" />
      </Link>
      <h1 className="mt-56 w-96 relative z-10">
        Encuentra los juegos mas baratos del mercado
      </h1>
    </div>
  );
};
