import { Header } from "../components/Header";
import { SearchForm } from "../components/SearchForm";

export const Home = () => {

  
  return (
    <>
      <Header />
      <main className="bg-gray-100 py-10 min-h-screen bg-no-repeat bg-top-right lg:bg-[url('/bg.svg')] md:bg-none">
        <div className="max-w-5xl mx-auto mt-10 ">
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-6 ">
            <h1 className="text-6xl font-black">
              Todas tus <span className="text-cyan-400 ">Redes Sociales</span>
              en un Solo Lugar
            </h1>
            <p className="text-slate-800 text-xl ">
              Crea tu perfil profesional y comparte tus enlaces de redes
              sociales
            </p>
            <SearchForm />
          </div>
        </div>
      </main>
    </>
  );
};
