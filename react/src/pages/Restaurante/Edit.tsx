import { useState, useEffect, type FormEvent } from 'react';
import { RestauranteAPI } from '../../api/restaurante.api';
import { UsuarioAPI } from '../../api/usuario.api'; 
import { useNavigate, useParams } from 'react-router-dom';
import type { RestauranteDTO } from '../../types/restaurante';
import type { Usuario } from '../../types/usuario';

// Note que estamos usando "export const"
export const EditRestaurante = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const navigate = useNavigate();

  // Estados para os campos
  const [nome, setNome] = useState('');
  const [horario_func, setHorarioFunc] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [idUsuario, setIdUsuario] = useState(''); // ID do usuário dono

  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Lista de usuários
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca os dados iniciais (do restaurante e a lista de usuários)
  useEffect(() => {
    if (!id) return; // Se não tiver ID, não faz nada

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Busca os dados DO RESTAURANTE
        const restResponse = await RestauranteAPI.getOne(id);
        const restData = restResponse.data.dados; // Pega de ".dados"
        
        // 2. Busca a lista de TODOS OS USUÁRIOS
        const userResponse = await UsuarioAPI.getAll();
        setUsuarios(userResponse.data.dados); // Pega de ".dados"
        
        // 3. Preenche o formulário com os dados do restaurante
        setNome(restData.nome);
        setHorarioFunc(restData.horario_func);
        setCnpj(restData.cnpj);
        setTelefone(restData.telefone);
        setEndereco(restData.endereco);
        // Proteção contra usuário nulo (se houver)
        if (restData.usuario) {
          setIdUsuario(String(restData.usuario.idUsuario)); 
        }

      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]); // Roda se o ID mudar

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    // Monta o objeto DTO para enviar para a API
    const data: RestauranteDTO = {
      nome,
      horario_func,
      cnpj,
      telefone,
      endereco,
      idUsuario: Number(idUsuario), // Converte o ID para número
    };

    try {
      await RestauranteAPI.update(id, data);
      alert('Restaurante atualizado com sucesso!');
      navigate('/restaurante/list'); // Volta para a lista
    } catch (err) {
      console.error('Erro ao atualizar restaurante:', err);
      setError('Não foi possível atualizar o restaurante.');
    }
  };

  // Renderização
  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Editar Restaurante (ID: {id})</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="cnpj">CNPJ:</label>
          <input type="text" id="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="horario_func">Horário de Funcionamento:</label>
          <input type="text" id="horario_func" value={horario_func} onChange={(e) => setHorarioFunc(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="idUsuario">Usuário Dono:</label>
          <select id="idUsuario" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} required>
            <option value="">Selecione um usuário...</option>
            {usuarios.map((user) => (
              <option key={user.idUsuario} value={user.idUsuario}>
                {user.nome} (ID: {user.idUsuario})
              </option>
            ))}
          </select>
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};