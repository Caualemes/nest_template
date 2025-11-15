import { useState, useEffect } from 'react';
import { RestauranteAPI } from '../../api/restaurante.api';
import { Link } from 'react-router-dom';
// Importa o tipo adaptado
import type { Restaurante } from '../../types/restaurante'; 

export const ListRestaurante = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurantes = async () => {
    try {
      setLoading(true);
      const response = await RestauranteAPI.getAll();
      console.log('RESPOSTA DA API:', response.data);
      setRestaurantes(response.data.dados);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar restaurantes:", err);
      setError("Não foi possível carregar os restaurantes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar este restaurante?')) {
      return;
    }
    try {
      await RestauranteAPI.delete(String(id));
      alert('Restaurante deletado com sucesso!');
      setRestaurantes(restaurantes.filter((rest) => rest.idRestaurante !== id));
    } catch (err) {
      console.error('Erro ao deletar:', err);
      alert('Não foi possível deletar o restaurante.');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Restaurantes</h2>
      <Link to="/restaurante/create">
        <button>+ Adicionar Novo</button>
      </Link>
      
      <table border={1} style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Funcionamento</th>
            <th>Usuário Dono</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {restaurantes.map((rest) => (
            <tr key={rest.idRestaurante}>
              <td>{rest.idRestaurante}</td>
              <td>{rest.nome}</td>
              <td>{rest.cnpj}</td>
              <td>{rest.telefone}</td>
              <td>{rest.endereco}</td>
              <td>{rest.horario_func}</td>
              {/* Mostra o nome do usuário dono */}
              <td>{rest.usuario?.nome} (ID)</td> 
              <td>
                <Link to={`/restaurante/edit/${rest.idRestaurante}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(rest.idRestaurante)}>
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