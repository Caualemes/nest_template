import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}>
      <Link to="/restaurante/list" style={{ marginRight: '1rem' }}>
        Restaurantes
      </Link>
      
      {/* 1. ADICIONA O LINK DE USUÁRIO */}
      <Link to="/usuario/list" style={{ marginRight: '1rem' }}>
        Usuários
      </Link>

      {/* 2. O LINK DE LOGIN FOI REMOVIDO */}
    </nav>
  );
};