import React, { useState, useEffect } from "react";
import {
  ContentListaVendedor,
  TableVendedores,
  Thead,
  Tr,
  Th,
  Td,
  Button,
  ButtonExcluir,
  ModalBackground,
  ModalContent,
  Form,
  Label,
  Input,
  IconWrapper,
  ButtonSalvar,
  PaginacaoContainer,
  BotaoPaginacao,
  Div,
  TableContainer,
} from "./VendedoresStyled";
import { FaUser, FaPhone } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação
import useApi from "../../Api/Api";

// Tipagem para o estado do formulário e lista de vendedores
type Vendedor = {
  id: number;
  nome: string;
  telefone: string;
};

const Vendedores:React.FC = () => {
const api = useApi();
// Função para abrir o modal de edição
const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para controlar a abertura do modal
const [formData, setFormData] = useState<Vendedor>({
  id: 0,
  nome: "",
  telefone: "",
});

const [vendedores, setVendedores] = useState<Vendedor[]>([]); // Lista de vendedores
const navigate = useNavigate(); // Hook para navegação
const [paginaAtual, setPaginaAtual] = useState<number>(1); // Página atual
const itensPorPagina = 3; // Número de vendedores por página

// Função para buscar os dados do backend
const fetchDados = async () => {
  try {
    const response = await api.get("/vendedores");
    if (response.status === 200) {
      setVendedores(response.data); // Atualiza a lista de vendedores
    } else {
      alert("Erro ao buscar vendedores.");
    }
  } catch (error) {
    console.error("Erro ao buscar vendedores:", error);
    alert("Erro ao buscar vendedores.");
  }
};

// useEffect para buscar os dados ao montar o componente
useEffect(() => {
  fetchDados();
}, []);



const handleEdit = (vendedor: Vendedor) => {
  setFormData(vendedor); // Preenche o formulário com os dados do vendedor
  setIsModalOpen(true); // Abre o modal
};

// Função para fechar o modal
const handleCloseModal = () => {
  setIsModalOpen(false); // Fecha o modal
};
// Função para lidar com a mudança nos campos do formulário
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value })); // Atualiza o estado do formulário
};
// Função para lidar com o envio do formulário
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Previne o comportamento padrão do formulário
  try {
    const response = await api.put(`/vendedores/${formData.id}`, formData);
    if (response.status === 200) {
      alert("Vendedor atualizado com sucesso.");
      fetchDados(); // Atualiza a lista de vendedores
      handleCloseModal(); // Fecha o modal
    } else {
      alert("Erro ao atualizar vendedor.");
    }
  } catch (error) {
    console.error("Erro ao atualizar vendedor:", error);
    alert("Erro ao atualizar vendedor.");
  }
};
// Função para excluir um vendedor
const handleDelete = async (id: number) => {
  if (window.confirm("Tem certeza que deseja excluir este vendedor?")) {
    try {
      const response = await api.delete(`/vendedores/${id}`);
      if (response.status === 200) {
        alert("Vendedor excluído com sucesso.");
        fetchDados(); // Atualiza a lista de vendedores
      } else {
        alert("Erro ao excluir vendedor.");
      }
    } catch (error) {
      console.error("Erro ao excluir vendedor:", error);
      alert("Erro ao excluir vendedor.");
    }
  }
};


// Cálculo para exibir os vendedores da página atual
const indiceInicial = (paginaAtual - 1) * itensPorPagina;
const indiceFinal = indiceInicial + itensPorPagina;
const vendedoresPagina = vendedores.slice(indiceInicial, indiceFinal);

// Função para ir para a próxima página
const handleProximo = () => {
  if (paginaAtual < Math.ceil(vendedores.length / itensPorPagina)) {
    setPaginaAtual((prev) => prev + 1);
  }
};

// Função para voltar para a página anterior
const handleVoltar = () => {
  if (paginaAtual > 1) {
    setPaginaAtual((prev) => prev - 1);
  }
};
  return (
    <ContentListaVendedor>
      <Div>
      <h2>Lista de Vendedores</h2>
      <Button onClick={()=> navigate('/cadastrarVendedor')}>
        Adicionar Vendedor
      </Button>

      </Div>
  <TableContainer>

      <TableVendedores>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Telefone</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <tbody>
          {vendedoresPagina.map((vendedor) => (
            <Tr key={vendedor.id}>
              <Td>{vendedor.nome}</Td>
              <Td>{vendedor.telefone}</Td>
              <Td>
                <Button onClick={() => handleEdit(vendedor)}>Editar</Button>
                <ButtonExcluir onClick={() => handleDelete(vendedor.id)}>Excluir</ButtonExcluir>
              </Td>
            </Tr>
          ))}
        </tbody>
      </TableVendedores>
        </TableContainer>

      {/* Paginação */}
      <PaginacaoContainer>
        <BotaoPaginacao onClick={handleVoltar} disabled={paginaAtual === 1}>
          <FaArrowLeft /> {/* Ícone de voltar */}
        </BotaoPaginacao>
        <BotaoPaginacao
          onClick={handleProximo}
          disabled={paginaAtual === Math.ceil(vendedores.length / itensPorPagina)}
        >
          <FaArrowRight /> {/* Ícone de próximo */}
        </BotaoPaginacao>
      </PaginacaoContainer>

      <ModalBackground className={isModalOpen ? "active" : ""}>
        <ModalContent>
          <h2>Editar Vendedor</h2>
          <Form onSubmit={handleSubmit}>
            <Label>
              <IconWrapper>
                <FaUser />
              </IconWrapper>
              <Input
                type="text"
                placeholder="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </Label>
            <Label>
              <IconWrapper>
                <FaPhone />
              </IconWrapper>
              <Input
                type="text"
                placeholder="Telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
            </Label>
            <ButtonSalvar type="submit">Salvar</ButtonSalvar>
          </Form>
          <ButtonExcluir onClick={handleCloseModal}>Fechar</ButtonExcluir>
        </ModalContent>
      </ModalBackground>
    </ContentListaVendedor>
  );
};

export default Vendedores;