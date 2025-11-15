import { useState, useEffect, type FormEvent } from 'react';
import { RestauranteAPI } from '../../api/restaurante.api';
import { UsuarioAPI } from '../../api/usuario.api'; // <-- IMPORTA API DE USUÁRIO
import { useNavigate } from 'react-router-dom';
import type { RestauranteDTO } from '../../types/restaurante';
import type { Usuario } from '../../types/usuario'; // <-- IMPORTA TIPO USUÁRIO

export const CreateRestaurante = () => {
  // Estados para todos os campos do DTO
  const [nome, setNome] = useState('');
  const [horario_func, setHorarioFunc] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [idUsuario, setIdUsuario] = useState(''); // <-- ID do usuário dono

  // Estado para a lista de usuários do dropdown
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Busca os usuários para preencher o <select>
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await UsuarioAPI.getAll();
        setUsuarios(response.data.dados);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        setError("Não foi possível carregar a lista de usuários.");
      }
    };
    fetchUsuarios();
  }, []); // [] = Roda só uma vez

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!idUsuario) {
      setError("Você precisa selecionar um usuário dono.");
      return;
    }

    const data: RestauranteDTO = {
      nome,
      horario_func,
      cnpj,
      telefone,
      endereco,
      idUsuario: Number(idUsuario), // Converte a string do select para número
    };

    try {
      await RestauranteAPI.create(data);
      alert('Restaurante criado com sucesso!');
      navigate('/restaurante/list');
    } catch (err) {
      console.error('Erro ao criar restaurante:', err);
      setError('Não foi possível criar o restaurante.');
    }
  };

  return (
    <div>
      <h2>Adicionar Novo Restaurante</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo Nome */}
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        
        {/* Campo CNPJ */}
        <div>
          <label htmlFor="cnpj">CNPJ:</label>
          <input type="text" id="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
        </div>
        
        {/* Campo Telefone */}
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </div>
        
        {/* Campo Endereço */}
        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
        </div>
        
        {/* Campo Horário de Funcionamento */}
        <div>
          <label htmlFor="horario_func">Horário de Funcionamento:</label>
          <input type="text" id="horario_func" value={horario_func} onChange={(e) => setHorarioFunc(e.target.value)} required />
        </div>
        
        {/* Campo Usuário Dono (Dropdown) */}
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
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};