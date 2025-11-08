import { Link } from "react-router";

export const Logo = () => {
  return (
    <Link to={"/"}>
      <img src="/logo.svg" className="w-full block" alt="logotipo devtree" />
    </Link>
  );
};
