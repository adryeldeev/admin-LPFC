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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Switch from "react-switch";
import useApi from "../../Api/Api";







type Imagem = {
  id: number;
  url: string;
  carroId: number;
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
  portas:number;
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
type Marca = {
  id: number;
  nome: string;
};

const Carros: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [carros, setCarros] = useState<Carro[]>([]);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
   const [open, setOpen] = React.useState(false)
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [carroSelecionado, setCarroSelecionado] = useState<Carro | null>(null);

  const itensPorPagina = 3;
  const baseUrl = "https://my-first-project-repo-production.up.railway.app"; // Ou a URL do seu servidor

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
  onSubmit: (values) => {
    if (!carroSelecionado) {
      console.error("Nenhum carro selecionado para edição.");
      return;
    }
    const marcaSelecionada = marcas.find((marca) => marca.nome === values.marca)
    
 
  const dadosFormatados: Partial<Carro> = {
    modelo: values.modelo,
    ano: values.ano ? Number(values.ano) : undefined,
    preco: values.preco ? Number(values.preco) : undefined,
    descricao: values.descricao,
    quilometragem: values.quilometragem ? Number(values.quilometragem) : undefined,
    combustivel: values.combustivel,
    cambio: values.cambio,
    cor: values.cor,
    marca: marcaSelecionada ? { id: marcaSelecionada.id, nome: marcaSelecionada.nome } : undefined,
    destaque: values.destaque,
    portas: values.portas ? Number(values.portas) : undefined,
   imagens:  [], // Manter as imagens como estão

  };

  handleEdit({ ...carroSelecionado, ...dadosFormatados });
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
    }, []);
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
  }, []);
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
    formik.setFieldValue("imagens", carro.imagens);
    formik.setFieldValue("destaque", carro.destaque);
    formik.setFieldValue("portas", carro.portas);
   
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setCarroSelecionado(null);
    formik.resetForm();
  };



  const handleEdit = async (carro: Carro) => {
    try {
      const response = await api.put(`/carro/${carro.id}`, carro);
      if (response.status === 200) {
        setCarros((prevCarros) =>
          prevCarros.map((c) => (c.id === carro.id ? { ...c, ...carro } : c))
        );
        alert("Carro editado com sucesso.");
        
      }  else if(response.status === 400){
          alert('Carros em destaques no máximo 3')
      }else {
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
        <BotaoPaginacao onClick={handleNavigate}>Adicionar Carro</BotaoPaginacao>
      </DivAdd>
      <ListaCarrosContainer>
        {carrosPagina.map((carro) => (
          <CarroCard key={carro.id}>
            <CarroSliderWrapper>
  <Swiper
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
    spaceBetween={10}
    slidesPerView={1}
  >
    {carro.imagens && carro.imagens.length > 0 ? (
      carro.imagens.map((imagem) => (
        <SwiperSlide key={imagem.id}>
          <img
            src={`${baseUrl}/uploads/carros/${imagem.url}`}
            alt={carro.modelo}
            style={{ width: 120, height: 80, objectFit: "cover" }}
          />
        </SwiperSlide>
      ))
    ) : (
      <SwiperSlide>
        <img
          src="/imagem-nao-disponivel.png"
          alt="Sem imagem"
          style={{ width: 120, height: 80, objectFit: "cover" }}
        />
      </SwiperSlide>
    )}
  </Swiper>
</CarroSliderWrapper>

            <CarroInfo>
              <h3>{carro.modelo}</h3>
              <p>Ano: {carro.ano}</p>
             <p>Preço: R$ {carro.preco.toLocaleString("pt-BR")}</p>
              <p>Descrição: {carro.descricao}</p>
              <p>Cor: {carro.cor}</p>
              <p>Quilometragem: {carro.quilometragem} km</p>
              <p>Combustível: {carro.combustivel}</p>
              <p>Câmbio: {carro.cambio}</p>
              <p>Marca: {carro.marca.nome}</p>
            </CarroInfo>
            
                        <CardActions className="actions">
                          <button onClick={() => handleOpenModal(carro)}>Editar</button>
                          <button onClick={() => handleDelete(carro.id)}>Excluir</button>
                        </CardActions>
          </CarroCard>
        ))}
      </ListaCarrosContainer>
      <PaginacaoContainer>
        <BotaoPaginacao onClick={handleVoltar} disabled={paginaAtual === 1}>
          <FaArrowLeft />
        </BotaoPaginacao>

        <p>
          Página {paginaAtual} de {Math.ceil(carros.length / itensPorPagina)}
        </p>

        <BotaoPaginacao
          onClick={handleProximo}
          disabled={paginaAtual === Math.ceil(carros.length / itensPorPagina)}
        >
          <FaArrowRight />
        </BotaoPaginacao>
      </PaginacaoContainer>
      <ModalContainer open={open}>
        <ModalContent>
          <h3>Editar Carro</h3>
         <form onSubmit={formik.handleSubmit}>
         <div className="form-fields">

  <div className="form-group">
    <label>Modelo:</label>
    <input
      type="text"
      name="modelo"
      value={formik.values.modelo}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  </div>

  <div className="form-group">
    <label>Ano:</label>
   <input
  type="number"
  name="ano"
  value={formik.values.ano !== undefined ? String(formik.values.ano) : ""} 
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>
  </div>

  <div className="form-group">
    <label>Preço:</label>
 <input
      type="number"
      name="preco"
      value={formik.values.preco !== undefined ? String(formik.values.preco) : ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}

/>
  </div>

  <div className="form-group">
    <label>Descrição:</label>
    <textarea
      name="descricao"
      value={formik.values.descricao}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  </div>

  <div className="form-group">
    <label>Quilometragem:</label>
    <input
      type="number"
      name="quilometragem"
      value={formik.values.quilometragem !== undefined ? String(formik.values.quilometragem) : ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  </div>

  <div className="form-group">
    <label>Combustível:</label>
    <input
      type="text"
      name="combustivel"
      value={formik.values.combustivel}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  </div>

  <div className="form-group">
    <label>Câmbio:</label>
    <input
      type="text"
      name="cambio"
      value={formik.values.cambio}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  </div>

  <div className="form-group">
    <label>Cor:</label>
    <input
      type="text"
      name="cor"
      value={formik.values.cor}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  </div>

  <div className="form-group">
    <label>Marca:</label>
    <select
      name="marca"
      value={formik.values.marca}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <option value="">Selecione uma marca</option>
      {marcas.map((marca) => (
        <option key={marca.id} value={marca.nome}>
          {marca.nome}
        </option>
      ))}
    </select>
  </div>

  <div className="form-group">
    <label>Imagens:</label>
    <input
      type="file"
      name="imagens"
      multiple
      onChange={(event) => {
        const files = event.currentTarget.files;
        if (files) {
          const fileArray = Array.from(files);
          formik.setFieldValue("imagens", fileArray);
        }
      }}
    />
  </div>

  <div className="form-group">
    <label>Destaque:</label>
    <Switch
      onColor="#86d3ff"
      offColor="#ccc"
      checked={formik.values.destaque}
      onChange={(checked) => formik.setFieldValue("destaque", checked)}
      name="destaque"
      checkedIcon={false}
      uncheckedIcon={false}
      handleDiameter={20}
      height={20}
      width={48}
      offHandleColor="#000"
      onHandleColor="#2693e6"

      />
  </div>

  <div className="form-group">
    <label>Portas:</label>
    <input
      type="number"
      name="portas"
      value={formik.values.portas !== undefined ? String(formik.values.portas) : ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  </div>
      </div>

  <BotaoSalvar type="submit">Salvar</BotaoSalvar>
  <BotaoCancelar type="button" onClick={handleCloseModal}>Cancelar</BotaoCancelar>
</form>
        </ModalContent>
      </ModalContainer>
    </CarrosContainer>
  );
};

export default Carros;