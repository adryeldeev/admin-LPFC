import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineCar } from "react-icons/ai";
import {
  TbBrandTesla,
  TbCalendarTime,
  TbGauge,
  TbGasStation,
  TbCurrencyReal,
  TbFileDescription,
  TbPhoto,
  TbDoor,
  TbPalette,
  TbTag
} from "react-icons/tb";
import {
  ButtonCadastrarVeiculos,
  ContentCadastrarVeiculos,
  DivInputsCadastrarVeiculos,
  FormCadastrarVeiculos,
  IconWrapper,
  InfoCadastro,
  InputCadastrarVeiculos,
  TitleCadastrarVeiculos,
  SelectCadastrarVeiculos,
  InputUpload,
  PreviewContainer,
  Thumbnail,
} from "./CadastrarVeiculoStyyled";
import Switch from "react-switch";
import useApi from "../../Api/Api";
import { useNavigate } from "react-router-dom";

interface FormularioVeiculo {
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  portas: number;
  destaque: boolean;
  cor: string;
  combustivel: string;
  cambio: string;
  descricao: string;
  marca: string;
}

interface Marca {
  id: number;
  nome: string;
}



const CadastrarVeiculos: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [imagens, setImagens] = useState<
  { file: File; url: string; principal: boolean }[]
>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [marcas, setMarcas] = useState<Marca[]>([]);

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

  const formik = useFormik<FormularioVeiculo>({
    initialValues: {
      modelo: "",
      ano: 0,
      preco: 0,
      quilometragem: 0,
      portas: 0,
      destaque: false,
      cor: "",
      combustivel: "",
      cambio: "",
      descricao: "",
      marca: "",
    },
    validationSchema: Yup.object({
      modelo: Yup.string().required("Modelo é obrigatório"),
      marca: Yup.string().required("Marca é obrigatória"),
      ano: Yup.number().required("Ano é obrigatório").min(1900, "Ano inválido"),
      preco: Yup.number().required("Preço é obrigatório").min(0, "Preço inválido"),
      quilometragem: Yup.number().min(0, "Quilometragem inválida").nullable(),
      portas: Yup.number().min(1, "Deve ter pelo menos 1 porta").nullable(),
      destaque: Yup.boolean(),
      cor: Yup.string().nullable(),
      combustivel: Yup.string().nullable(),
      cambio: Yup.string().nullable(),
      descricao: Yup.string().nullable(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const imagemPrincipal = imagens.find((img) => img.principal);

      if (!imagemPrincipal) {
        alert("Você deve selecionar uma imagem principal");
        return;
      }

      setIsSubmitting(true);

      try {
        const formData = new FormData();

        // Append form fields
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        // Append imagens
        imagens.forEach(({ file, principal }, index) => {
  formData.append("imagens", file);
  formData.append(`principal_${index}`, String(principal)); // exemplo: "true" ou "false"
});

        const response = await api.post("/carro", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200 || response.status === 201) {
          alert("Veículo cadastrado com sucesso!");
          navigate("/");
          resetForm();
          setImagens([]);
        } else {
          alert("Erro ao cadastrar veículo.");
        }
      } catch (error) {
        console.error("Erro ao cadastrar veículo:", error);
        alert("Erro ao cadastrar veículo.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

const handleSetPrincipal = (index: number) => {
  setImagens((prev) =>
    prev.map((img, i) => ({
      ...img,
      principal: i === index,
    }))
  );
};
  return (
    <ContentCadastrarVeiculos>
      <TitleCadastrarVeiculos>Cadastre seu Veículo</TitleCadastrarVeiculos>
      <InfoCadastro>
        <FormCadastrarVeiculos onSubmit={formik.handleSubmit}>
          {[
            { id: "modelo", icon: <AiOutlineCar />, placeholder: "Modelo" },
            { id: "cambio", icon: <TbBrandTesla />, placeholder: "Câmbio" },
            { id: "ano", icon: <TbCalendarTime />, placeholder: "Ano" },
            { id: "quilometragem", icon: <TbGauge />, placeholder: "Quilometragem" },
            { id: "combustivel", icon: <TbGasStation />, placeholder: "Combustível" },
            { id: "preco", icon: <TbCurrencyReal />, placeholder: "Preço" },
            { id: "descricao", icon: <TbFileDescription />, placeholder: "Descrição" },
            { id: "portas", icon: <TbDoor />, placeholder: "Portas" },
            { id: "cor", icon: <TbPalette />, placeholder: "Cor" },
          ].map(({ id, icon, placeholder }) => {
            const valorCampo = formik.values[id as keyof typeof formik.values];
            return (
              <DivInputsCadastrarVeiculos key={id}>
                <IconWrapper>{icon}</IconWrapper>
                <InputCadastrarVeiculos
                  type={
                    id === "ano" || id === "quilometragem" || id === "preco" || id === "portas"
                      ? "number"
                      : "text"
                  }
                  id={id}
                  placeholder={placeholder}
                  value={typeof valorCampo === "boolean" ? "" : valorCampo ?? ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[id as keyof typeof formik.touched] &&
                  formik.errors[id as keyof typeof formik.errors] && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors[id as keyof typeof formik.errors]}
                    </div>
                  )}
              </DivInputsCadastrarVeiculos>
            );
          })}

          <DivInputsCadastrarVeiculos>
            <IconWrapper><TbTag /></IconWrapper>
            <SelectCadastrarVeiculos
              name="marca"
              value={formik.values.marca}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Selecione uma marca</option>
              {marcas.map((marca) => (
                <option key={marca.id} value={String(marca.id)}>
                  {marca.nome}
                </option>
              ))}
            </SelectCadastrarVeiculos>
            {formik.touched.marca && formik.errors.marca && (
              <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.marca}</div>
            )}
          </DivInputsCadastrarVeiculos>

          <DivInputsCadastrarVeiculos>
            <IconWrapper>
              <TbPhoto />
            </IconWrapper>
            <InputUpload
              type="file"
              id="imagens"
               name="imagens"
              multiple
              onChange={(e) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files).map((file, index) => ({
        file,
        url: URL.createObjectURL(file), // **importante**
        principal: index === 0,
      }));
      setImagens(filesArray);
    }
  }}
/>
    {imagens.length > 0 && (
              <PreviewContainer>
                {imagens.map(({ file, principal }, index) => (
                  <Thumbnail
                    key={index}
                    isPrincipal={principal}
                    onClick={() => handleSetPrincipal(index)}
                    title="Clique para definir como imagem principal"
                  >
                    <img src={URL.createObjectURL(file)} alt={`Imagem ${index + 1}`} />
                  </Thumbnail>
                ))}
              </PreviewContainer>
            )}
          </DivInputsCadastrarVeiculos>

          <DivInputsCadastrarVeiculos>
            <Switch
              onChange={(checked) => formik.setFieldValue("destaque", checked)}
              checked={formik.values.destaque}
              onColor="#86d3ff"
              offColor="#ccc"
              onHandleColor="#2693e6"
              offHandleColor="#000"
              handleDiameter={28}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={48}
              id="destaque"
            />
            <span style={{ marginLeft: "10px" }}>Destacar</span>
          </DivInputsCadastrarVeiculos>

          <ButtonCadastrarVeiculos type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </ButtonCadastrarVeiculos>
        </FormCadastrarVeiculos>
      </InfoCadastro>
    </ContentCadastrarVeiculos>
  );
};

export default CadastrarVeiculos;
