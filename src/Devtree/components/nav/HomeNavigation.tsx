import { Link } from "react-router";

export const HomeNavigation = () => {
  return (
    <>
      <Link
        className=" bg-lime-100 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer mr-2"
        to="/auth/login"
      >
        Iniciar Sesión
      </Link>
      <Link
        className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
        to="/auth/register"
      >
        Registrarme
      </Link>
    </>
  );
};
