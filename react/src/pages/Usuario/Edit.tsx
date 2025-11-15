import { useState, useEffect, type FormEvent } from 'react';
import { UsuarioAPI } from '../../api/usuario.api';
import { useNavigate, useParams } from 'react-router-dom';
import type { UpdateUsuarioDTO } from '../../types/usuario';

export const EditUsuario = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const navigate = useNavigate();

  // Estados para os campos (sem senha)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [tipo, setTipo] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUsuario = async () => {
      try {
        setLoading(true);
        const response = await UsuarioAPI.getOne(id);
        const userData = response.data.dados;
        
        // Preenche o formulário com os dados
        setNome(userData.nome);
        setEmail(userData.email);
        setTelefone(userData.telefone);
        setEndereco(userData.endereco);
        setTipo(userData.tipo);
        
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar o usuário.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsuario();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    const data: UpdateUsuarioDTO = {
      nome,
      email,
      telefone,
      endereco,
      tipo,
    };

    try {
      await UsuarioAPI.update(id, data);
      alert('Usuário atualizado com sucesso!');
      navigate('/usuario/list');
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      setError('Não foi possível atualizar o usuário.');
    }
  };

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Editar Usuário (ID: {id})</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
          <label htmlFor="tipo">Tipo (ex: admin, user):</label>
          <input type="text" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};