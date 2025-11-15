import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioAPI } from "../../api/usuario.api";
import type { CreateUsuarioDTO } from "../../types/usuario";

export const CreateUsuario = () => {
  // Estado para cada campo do DTO
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState(""); // O valor inicial do Tipo é '' (string vazia) para que a primeira opção seja "Selecione..."
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 🚨 NOVO: Array com os valores exatos que o Oracle aceita (em CAIXA ALTA)
  const tiposPermitidos = ["CLIENTE", "DONO_RESTAURANTE", "ADMIN_SISTEMA"];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // 🚨 VALIDAÇÃO ADICIONAL: Garante que um tipo foi selecionado
    if (!tiposPermitidos.includes(tipo)) {
      setError("Por favor, selecione um Tipo de usuário válido.");
      return;
    }

    const data: CreateUsuarioDTO = {
      nome,
      email,
      senha,
      telefone,
      endereco,
      tipo, // Garante que o valor enviado é 'CLIENTE', 'DONO_RESTAURANTE' ou 'ADMIN_SISTEMA'
    };

    try {
      await UsuarioAPI.create(data);
      alert("Usuário criado com sucesso!");
      navigate("/usuario/list");
    } catch (err) {
      console.error("Erro ao criar usuário:", err); // Mensagem de erro mais genérica para o usuário
      setError(
        "Não foi possível criar o usuário. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <div>
            <h2>Adicionar Novo Usuário</h2>     {" "}
      <form onSubmit={handleSubmit}>
               {" "}
        <div>
                    <label htmlFor="nome">Nome:</label>
                   {" "}
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
                 {" "}
        </div>
               {" "}
        <div>
                    <label htmlFor="email">Email:</label>
                   {" "}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
                 {" "}
        </div>
               {" "}
        <div>
                    <label htmlFor="senha">Senha:</label>
                   {" "}
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
                 {" "}
        </div>
               {" "}
        <div>
                    <label htmlFor="telefone">Telefone:</label>
                   {" "}
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
                 {" "}
        </div>
               {" "}
        <div>
                    <label htmlFor="endereco">Endereço:</label>
                   {" "}
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
                 {" "}
        </div>
               {/* 🚀 CAMPO TIPO ALTERADO PARA SELECT */}       {" "}
        <div>
                    <label htmlFor="tipo">Tipo:</label>         {" "}
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            {/* Opção padrão (sem valor, força o required a funcionar se não for selecionado) */}
            <option value="">Selecione o Tipo...</option>
            {/* Mapeia as opções permitidas para o Oracle */}
            {tiposPermitidos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
                     {" "}
          </select>
                 {" "}
        </div>
                {error && <p style={{ color: "red" }}>{error}</p>}       {" "}
        <button type="submit">Salvar</button>     {" "}
      </form>
         {" "}
    </div>
  );
};
