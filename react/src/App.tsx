import { Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

// Importe suas páginas de CRUD
import { ListRestaurante } from './pages/Restaurante/List';
import { CreateRestaurante } from './pages/Restaurante/Create';
import { EditRestaurante } from './pages/Restaurante/Edit';
import { ListUsuario } from './pages/Usuario/List';
import { CreateUsuario } from './pages/Usuario/Create';
import { EditUsuario } from './pages/Usuario/Edit';
// ... e as de Usuário
// import { ListUsuario } from './pages/Usuario/List';

// Layout simples com a Navbar
const AppLayout = () => (
  <div>
    <Navbar />
    <main style={{ padding: '1rem' }}>
      <Outlet /> {/* Suas páginas aparecem aqui */}
    </main>
  </div>
);

export const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Rotas de Restaurante */}
        <Route path="/restaurante/list" element={<ListRestaurante />} />
        <Route path="/restaurante/create" element={<CreateRestaurante />} />
        <Route path="/restaurante/edit/:id" element={<EditRestaurante />} />
        
        {/* TODO: Rotas de Usuário */}
        {/* Rotas de Usuário */}
        <Route path="/usuario/list" element={<ListUsuario />} />
        <Route path="/usuario/create" element={<CreateUsuario />} />
        <Route path="/usuario/edit/:id" element={<EditUsuario />} />
        
        {/* Rota Padrão */}
        <Route path="/" element={<ListRestaurante />} />
      </Route>

      {/* Rota para "Página não encontrada" */}
      <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
    </Routes>
  );
};