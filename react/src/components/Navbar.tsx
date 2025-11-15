import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    // BARRA DE NAVEGAÇÃO: Fundo escuro, padding, e sombra.
    <nav className="bg-gray-800 p-4 shadow-lg mb-6">
      {/* Container para centralizar o conteúdo (opcional, mas boa prática) */}
      <div className="max-w-7xl mx-auto flex">
        {/* Link Restaurantes: Texto branco, efeito de hover azul, espaçamento à direita */}
        <Link
          to="/restaurante/list"
          className="text-white text-lg font-semibold hover:text-blue-400 mr-6"
        >
          Restaurantes
        </Link>

        {/* Link Usuários: Texto branco, efeito de hover azul */}
        <Link
          to="/usuario/list"
          className="text-white text-lg font-semibold hover:text-blue-400"
        >
          Usuários
        </Link>
      </div>
         {" "}
    </nav>
  );
};
