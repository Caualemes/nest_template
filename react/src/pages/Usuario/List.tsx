import { useState, useEffect } from 'react';
import { UsuarioAPI } from '../../api/usuario.api';
import { Link } from 'react-router-dom';
import type { Usuario } from '../../types/usuario';

export const ListUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await UsuarioAPI.getAll();
      setUsuarios(response.data.dados);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError("Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) {
      return;
    }
    try {
      await UsuarioAPI.delete(String(id));
      alert('Usuário deletado com sucesso!');
      setUsuarios(usuarios.filter((user) => user.idUsuario !== id));
    } catch (err) {
      console.error('Erro ao deletar:', err);
      alert('Não foi possível deletar o usuário.');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <Link to="/usuario/create">
        <button>+ Adicionar Novo Usuário</button>
      </Link>
      
      <table border={1} style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.idUsuario}>
              <td>{user.idUsuario}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.telefone}</td>
              <td>{user.endereco}</td>
              <td>{user.tipo}</td>
              <td>
                <Link to={`/usuario/edit/${user.idUsuario}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(user.idUsuario)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};