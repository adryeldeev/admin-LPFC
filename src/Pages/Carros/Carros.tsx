import React, { useState, useEffect } from "react";
import {
  ListaCarrosContainer,
  CarroCard,
  CarroInfo,
  PaginacaoContainer,
  BotaoPaginacao,
  CarroSliderWrapper,
  CarrosContainer,
  DivAdd,
  CardActions,
  ModalContainer,
  ModalContent,
  BotaoSalvar,
  BotaoCancelar,
} from "./CarrosStyled";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Switch from "react-switch";
import useApi from "../../Api/Api";

type Imagem = {
  id: number;
  url: string;
  carroId: number;
};

type Marca = {
  id: number;
  nome: string;
};

type Carro = {
  id: number;
  modelo: string;
  ano: number;
  preco: number;
  imagens: Imagem[];
  descricao: string;
  quilometragem: number;
  combustivel: string;
  cambio: string;
  cor: string;
  marca: Marca;
  portas: number;
  destaque: boolean;
};

type FormValues = {
  modelo: string;
  ano: number;
  preco: number;
  descricao: string;
  quilometragem: number;
  combustivel: string;
  cambio: string;
  cor: string;
  marca: string;
  destaque: boolean;
  portas: number;
  imagens: File[];
};

const Carros: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [carros, setCarros] = useState<Carro[]>([]);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [carroSelecionado, setCarroSelecionado] = useState<Carro | null>(null);
  const itensPorPagina = 3;
  const baseUrl =
    "https://my-first-project-repo-production.up.railway.app"; // URL do seu backend

  const formik = useFormik<FormValues>({
    initialValues: {
      modelo: "",
      ano: 0,
      preco: 0,
      descricao: "",
      quilometragem: 0,
      combustivel: "",
      cambio: "",
      cor: "",
      marca: "",
      destaque: false,
      portas: 0,
      imagens: [],
    },
    validationSchema: Yup.object().shape({
      modelo: Yup.string(),
      ano: Yup.number().typeError("Ano deve ser um número"),
      preco: Yup.number().typeError("Preço deve ser um número"),
      descricao: Yup.string(),
      quilometragem: Yup.number().typeError("Quilometragem deve ser um número"),
      combustivel: Yup.string(),
      cambio: Yup.string(),
      cor: Yup.string(),
      marca: Yup.string(),
      destaque: Yup.boolean(),
      portas: Yup.number().typeError("Portas deve ser um número"),
      imagens: Yup.array().of(Yup.mixed()),
    }),
    onSubmit: async (values) => {
      if (!carroSelecionado) {
        console.error("Nenhum carro selecionado para edição.");
        return;
      }

      const marcaSelecionada = marcas.find((marca) => marca.nome === values.marca);

      // Validação local para limite de 3 carros em destaque
      if (values.destaque) {
        const destaqueCount = carros.filter(
          (c) => c.destaque === true && c.id !== carroSelecionado.id
        ).length;

        if (destaqueCount >= 3) {
          alert(
            "Já existem 3 carros em destaque. Desmarque algum antes de adicionar outro."
          );
          return;
        }
      }

      try {
        const formData = new FormData();
        formData.append("modelo", values.modelo);
        formData.append("ano", String(values.ano));
        formData.append("preco", String(values.preco));
        formData.append("descricao", values.descricao);
        formData.append("quilometragem", String(values.quilometragem));
        formData.append("combustivel", values.combustivel);
        formData.append("cambio", values.cambio);
        formData.append("cor", values.cor);
        formData.append("marcaId", String(marcaSelecionada?.id || ""));
        formData.append("destaque", String(values.destaque));
        formData.append("portas", String(values.portas));

        values.imagens.forEach((file) => {
          formData.append("imagens", file);
        });

        await handleEdit(carroSelecionado.id, formData);
      } catch (error) {
        console.error("Erro ao enviar dados do formulário:", error);
        alert("Erro ao salvar alterações.");
      }
    },
  });

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await api.get("/marcas");
        setMarcas(response.data);
      } catch (error) {
        console.error("Erro ao buscar marcas:", error);
      }
    };

    fetchMarcas();
  }, [api]);

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const response = await api.get("/carros");
        if (response.status === 200) {
          setCarros(response.data);
        } else {
          alert("Erro ao buscar carros.");
        }
      } catch (error) {
        console.error("Erro ao buscar carros:", error);
        alert("Erro ao buscar carros.");
      }
    };
    fetchCarros();
  }, [api]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este carro?")) {
      try {
        const response = await api.delete(`/carro/${id}`);
        if (response.status === 200) {
          setCarros((prevCarros) => prevCarros.filter((carro) => carro.id !== id));
          alert("Carro excluído com sucesso.");
        } else {
          alert("Erro ao excluir carro.");
        }
      } catch (error) {
        console.error("Erro ao excluir carro:", error);
        alert("Erro ao excluir carro.");
      }
    }
  };

  const handleOpenModal = (carro: Carro) => {
    setCarroSelecionado(carro);
    formik.setFieldValue("modelo", carro.modelo);
    formik.setFieldValue("ano", carro.ano);
    formik.setFieldValue("preco", carro.preco);
    formik.setFieldValue("descricao", carro.descricao);
    formik.setFieldValue("quilometragem", carro.quilometragem);
    formik.setFieldValue("combustivel", carro.combustivel);
    formik.setFieldValue("cambio", carro.cambio);
    formik.setFieldValue("cor", carro.cor);
    formik.setFieldValue("marca", carro.marca.nome);
    formik.setFieldValue("destaque", carro.destaque);
    formik.setFieldValue("portas", carro.portas);
    formik.setFieldValue("imagens", []); // Reset imagens para upload (não carregar arquivos antigos)
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setCarroSelecionado(null);
    formik.resetForm();
  };

  const handleEdit = async (id: number, formData: FormData) => {
    try {
      const response = await api.put(`/carro/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        // Atualizar estado com o carro editado
        setCarros((prevCarros) =>
          prevCarros.map((c) => (c.id === id ? response.data : c))
        );
        alert("Carro editado com sucesso.");
      } else if (response.status === 400) {
        alert("Carros em destaque no máximo 3");
      } else {
        alert("Erro ao editar carro.");
      }
    } catch (error) {
      console.error("Erro ao editar carro:", error);
      alert("Erro ao editar carro.");
    } finally {
      handleCloseModal();
    }
  };

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const carrosPagina = carros.slice(indiceInicial, indiceFinal);

  const handleProximo = () => {
    if (paginaAtual < Math.ceil(carros.length / itensPorPagina)) {
      setPaginaAtual((prev) => prev + 1);
    }
  };

  const handleVoltar = () => {
    if (paginaAtual > 1) {
      setPaginaAtual((prev) => prev - 1);
    }
  };

  const handleNavigate = () => {
    navigate("/cadastrarVeiculo");
  };

  return (
    <CarrosContainer>
      <DivAdd>
        <h1>Lista de Carros</h1>
        <BotaoPaginacao onClick={handleNavigate}>Cadastrar Novo Veículo</BotaoPaginacao>
      </DivAdd>

      <ListaCarrosContainer>
        {carrosPagina.map((carro) => (
          <CarroCard key={carro.id}>
            <CarroSliderWrapper>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
              >
                {carro.imagens.map((imagem) => (
                  <SwiperSlide key={imagem.id}>
                    <img
                      src={`${baseUrl}/uploads/${imagem.url}`}
                      alt={carro.modelo}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </CarroSliderWrapper>

            <CarroInfo>
              <h3>{carro.modelo}</h3>
              <p>Ano: {carro.ano}</p>
              <p>Preço: R$ {carro.preco.toLocaleString("pt-BR")}</p>
              <p>Descrição: {carro.descricao}</p>
              <p>Quilometragem: {carro.quilometragem.toLocaleString("pt-BR")} km</p>
              <p>Combustível: {carro.combustivel}</p>
              <p>Câmbio: {carro.cambio}</p>
              <p>Cor: {carro.cor}</p>
              <p>Marca: {carro.marca.nome}</p>
              <p>Portas: {carro.portas}</p>
              <p>Destaque: {carro.destaque ? "Sim" : "Não"}</p>
            </CarroInfo>

            <CardActions>
              <button onClick={() => handleOpenModal(carro)}>Editar</button>
              <button onClick={() => handleDelete(carro.id)}>Excluir</button>
            </CardActions>
          </CarroCard>
        ))}
      </ListaCarrosContainer>

      <PaginacaoContainer>
        <BotaoPaginacao onClick={handleVoltar} disabled={paginaAtual === 1}>
          <FaArrowLeft /> Voltar
        </BotaoPaginacao>
        <span>
          Página {paginaAtual} de {Math.ceil(carros.length / itensPorPagina)}
        </span>
        <BotaoPaginacao
          onClick={handleProximo}
          disabled={paginaAtual === Math.ceil(carros.length / itensPorPagina)}
        >
          Próximo <FaArrowRight />
        </BotaoPaginacao>
      </PaginacaoContainer>

      {open && (
        <ModalContainer open={open}>
          <ModalContent>
            <h2>Editar Carro</h2>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <label>
                Modelo:
                <input
                  type="text"
                  name="modelo"
                  value={formik.values.modelo}
                  onChange={formik.handleChange}
                />
              </label>
              <label>
                Ano:
                <input
                  type="number"
                  name="ano"
                  value={formik.values.ano}
                  onChange={formik.handleChange}
                />
              </label>
              <label>
                Preço:
                <input
                  type="number"
                  name="preco"
                  value={formik.values.preco}
                  onChange={formik.handleChange}
                />
              </label>
              <label>
                Descrição:
                <input
                  type="text"
                  name="descricao"
                  value={formik.values.descricao}
                  onChange={formik.handleChange}
                  
                  
                />
              </label>
              <label>
                Quilometragem:
                <input
                  type="number"
                  name="quilometragem"
                  value={formik.values.quilometragem}
                  onChange={formik.handleChange}
                />
              </label>
              <label>
                Combustível:
                <input
                  type="text"
                  name="combustivel"
                  value={formik.values.combustivel}
                  onChange={formik.handleChange}
                />
              </label>
              <label>
                Câmbio:
                <input
                  type="text"
                  name="cambio"
                  value={formik.values.cambio}
                  onChange={formik.handleChange}
                />
              </label>
              <label>
                Cor:
                <input
                  type="text"
                  name="cor"
                  value={formik.values.cor}
                  onChange={formik.handleChange}
                />
              </label>
              <label>
                Marca:
                <select
                  name="marca"
                  value={formik.values.marca}
                  onChange={formik.handleChange}
                >
                  <option value="">Selecione uma marca</option>
                  {marcas.map((marca) => (
                    <option key={marca.id} value={marca.nome}>
                      {marca.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                Destaque:
                <Switch
                  onChange={(checked) => formik.setFieldValue("destaque", checked)}
                  checked={formik.values.destaque}
                />
              </label>
              <label>
                Portas:
                <input
                  type="number"
                  name="portas"
                  value={formik.values.portas}
                  onChange={formik.handleChange}
                />
              </label>
              <label>
                Imagens:
                <input
                  type="file"
                  name="imagens"
                  multiple
                  accept="image/*"
                  onChange={(event) => {
                    const files = event.currentTarget.files;
                    if (files) {
                      formik.setFieldValue("imagens", Array.from(files));
                    }
                  }}
                />
              </label>

              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <BotaoSalvar type="submit">Salvar</BotaoSalvar>
                <BotaoCancelar type="button" onClick={handleCloseModal}>
                  Cancelar
                </BotaoCancelar>
              </div>
            </form>
          </ModalContent>
        </ModalContainer>
      )}
    </CarrosContainer>
  );
};

export default Carros;
