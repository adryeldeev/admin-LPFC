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
  principal?: boolean;
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
  const baseUrl = "https://my-first-project-repo-production.up.railway.app";

  // Formik setup
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

      // Limite de 3 carros em destaque
      if (values.destaque) {
        const destaqueCount = carros.filter(
          (c) => c.destaque === true && c.id !== carroSelecionado.id
        ).length;

        if (destaqueCount >= 3) {
          alert("Já existem 3 carros em destaque. Desmarque algum antes de adicionar outro.");
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
        values.imagens.forEach((file) => formData.append("imagens", file));

        await handleEdit(carroSelecionado.id, formData);
      } catch (error) {
        console.error("Erro ao enviar dados do formulário:", error);
        alert("Erro ao salvar alterações.");
      }
    },
  });

  // Fetch marcas
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

  // Fetch carros
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

  // Delete carro
  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este carro?")) {
      try {
        const response = await api.delete(`/carro/${id}`);
        if (response.status === 200) {
          setCarros((prev) => prev.filter((carro) => carro.id !== id));
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

  // Abrir modal e preencher formulário
  const handleOpenModal = (carro: Carro) => {
    setCarroSelecionado(carro);
    formik.setValues({
      modelo: carro.modelo,
      ano: carro.ano,
      preco: carro.preco,
      descricao: carro.descricao,
      quilometragem: carro.quilometragem,
      combustivel: carro.combustivel,
      cambio: carro.cambio,
      cor: carro.cor,
      marca: carro.marca.nome,
      destaque: carro.destaque,
      portas: carro.portas,
      imagens: [],
    });
    setOpen(true);
  };

  // Fechar modal e resetar formulário
  const handleCloseModal = () => {
    setOpen(false);
    setCarroSelecionado(null);
    formik.resetForm();
  };

  // Editar carro
  const handleEdit = async (id: number, formData: FormData) => {
    try {
      const response = await api.put(`/carro/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setCarros((prev) => prev.map((c) => (c.id === id ? response.data : c)));
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

  // Paginação
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

  // Navegar para cadastro de veículo
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
        {carrosPagina.map((carro) => {
          // Ordenar imagens para mostrar principal primeiro
          const imagensOrdenadas = [...carro.imagens].sort((a, b) => {
            if (a.principal === b.principal) return 0;
            return a.principal ? -1 : 1;
          });

          return (
            <CarroCard key={carro.id}>
              <CarroSliderWrapper>
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {imagensOrdenadas.map((imagem) => (
                    <SwiperSlide key={imagem.id}>
                      <img src={`${baseUrl}/uploads/carros/${imagem.url}`} alt={carro.modelo}
                      style={{
       width: "100%", height: "auto", maxHeight: "200px", objectFit: "cover"}} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </CarroSliderWrapper>

              <CarroInfo>
                <h3>{carro.modelo}</h3>
                <p>Marca: {carro.marca.nome}</p>
                <p>Ano: {carro.ano}</p>
                <p>Preço: R$ {carro.preco.toFixed(2)}</p>
                <p>Descrição: {carro.descricao}</p>
                <p>Quilometragem: {carro.quilometragem} km</p>
                <p>Combustível: {carro.combustivel}</p>
                <p>Câmbio: {carro.cambio}</p>
                <p>Cor: {carro.cor}</p>
                <p>Portas: {carro.portas}</p>
                <p>Destaque: {carro.destaque ? "Sim" : "Não"}</p>
              </CarroInfo>

              <CardActions className="actions">
                <button onClick={() => handleOpenModal(carro)}>Editar</button>
                <button onClick={() => handleDelete(carro.id)}>Excluir</button>
              </CardActions>
            </CarroCard>
          );
        })}
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
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="form-fields">
              <div className="form-group">

              <label>
                Modelo:
                <input
                  type="text"
                  name="modelo"
                  value={formik.values.modelo}
                  onChange={formik.handleChange}
                  />
              </label>

                  </div>
                  <div className="form-group">

              <label>
                Ano:
                <input
                  type="number"
                  name="ano"
                  value={formik.values.ano}
                  onChange={formik.handleChange}
                />
                {formik.errors.ano && <div>{formik.errors.ano}</div>}
              </label>
                </div>
        <div className="form-group">

              <label>
                Preço:
                <input
                  type="number"
                  name="preco"
                  value={formik.values.preco}
                  onChange={formik.handleChange}
                  />
                {formik.errors.preco && <div>{formik.errors.preco}</div>}
              </label>
                  </div>
        <div className="form-group">

              <label>
                Descrição:
                <textarea
                  name="descricao"
                  value={formik.values.descricao}
                  onChange={formik.handleChange}
                  />
              </label>
                  </div>
                  <div className="form-group">


              <label>
                Quilometragem:
                <input
                  type="number"
                  name="quilometragem"
                  value={formik.values.quilometragem}
                  onChange={formik.handleChange}
                  />
                {formik.errors.quilometragem && <div>{formik.errors.quilometragem}</div>}
              </label>
                  </div>

        <div className="form-group">

              <label>
                Combustível:
                <input
                  type="text"
                  name="combustivel"
                  value={formik.values.combustivel}
                  onChange={formik.handleChange}
                />
              </label>
                  </div>
        <div className="form-group">

              <label>
                Câmbio:
                <input
                  type="text"
                  name="cambio"
                  value={formik.values.cambio}
                  onChange={formik.handleChange}
                  />
              </label>
                  </div>
        <div className="form-group">

              <label>
                Cor:
                <input
                  type="text"
                  name="cor"
                  value={formik.values.cor}
                  onChange={formik.handleChange}
                  />
              </label>
                  </div>
                  <div className="form-group">


              <label>
                Marca:
                <select
                  name="marca"
                  value={formik.values.marca}
                  onChange={formik.handleChange}
                >
                  <option value="">Selecione a marca</option>
                  {marcas.map((marca) => (
                    <option key={marca.id} value={marca.nome}>
                      {marca.nome}
                    </option>
                  ))}
                </select>
              </label>
                  </div>
                  <div className="from-group">


              <label>
                Destaque:
                <Switch
                  onChange={(checked) => formik.setFieldValue("destaque", checked)}
                  checked={formik.values.destaque}
                />
              </label>
                  </div>
                  <div className="form-group">


              <label>
                Portas:
                <input
                  type="number"
                  name="portas"
                  value={formik.values.portas}
                  onChange={formik.handleChange}
                  />
                {formik.errors.portas && <div>{formik.errors.portas}</div>}
              </label>
                  </div>
                  <div className="form-group">


              <label>
                Imagens (múltiplas):
                <input
                  type="file"
                  name="imagens"
                  onChange={(e) => {
                    const files = e.currentTarget.files;
                    if (files) {
                      formik.setFieldValue("imagens", Array.from(files));
                    }
                  }}
                  multiple
                  accept="image/*"
                  />
              </label>
                  </div>

              <BotaoSalvar type="submit">Salvar</BotaoSalvar>
              <BotaoCancelar type="button" onClick={handleCloseModal}>
                Cancelar
              </BotaoCancelar>
            </form>
          </ModalContent>
        </ModalContainer>
      )}
    </CarrosContainer>
  );
};

export default Carros;
