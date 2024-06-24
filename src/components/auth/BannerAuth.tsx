import { Link } from '@tanstack/react-router';
import logo from '../../assets/logo.webp';

export const BannerAuth = () => {
  return (
    <div className="bg-[url('./assets/banner-auth.webp')] bg-cover flex flex-col rounded-s-2xl pl-8 clip-corner text-white text-5xl text-left font-bold h-[45rem] w-[35rem]">
      <Link to="/" className="self-center">
        <img src={logo} alt="Obsidian Digitales" className="w-80 mt-20" />
      </Link>
      <h1 className="mt-56 w-96">
        Encuentra los juegos mas baratos del mercado
      </h1>
    </div>
  );
};
