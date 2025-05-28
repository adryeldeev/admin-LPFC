import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUser, FaPhone } from "react-icons/fa";
import {
  ContentCadastrarVendedor,
  FormCadastrarVendedor,
  DivInputsCadastrarVendedor,
  IconWrapper,
  InputCadastrarVendedor,
  ButtonCadastrarVendedor,
} from "./CadastrarVendedorStyled";
import { useNavigate } from "react-router-dom";
import useApi from "../../Api/Api";

// Formata o telefone para padrão internacional do WhatsApp
const formatTelefone = (telefone: string) => {
  return telefone
    .replace(/\D/g, "") // remove tudo que não for número
    .replace(/^0+/, "") // remove zeros à esquerda
    .replace(/^(\d{2})(\d{5})(\d{4})$/, "+55$1$2$3");
};

const CadastrarVendedor = () => {
  const navigate = useNavigate();
  const api = useApi();

  const formik = useFormik({
    initialValues: {
      nome: "",
      telefone: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("Nome é obrigatório"),
      telefone: Yup.string()
        .required("Telefone é obrigatório")
        .matches(
          /^[1-9]{2}[9]{1}[0-9]{8}$/,
          "Telefone inválido. Ex: 85999998888 (apenas números)"
        ),
    }),
    onSubmit: async (values) => {
      try {
        const telefoneFormatado = formatTelefone(values.telefone);
        const response = await api.post("/vendedores", {
          nome: values.nome,
          telefone: telefoneFormatado,
        });

        if (response.status === 200 || response.status === 201) {
          alert("Vendedor cadastrado com sucesso!");
          navigate("/vendedores");
        } else {
          alert("Erro ao cadastrar vendedor.");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao cadastrar vendedor.");
      }
    },
  });

  return (
    <ContentCadastrarVendedor>
      <h1>Cadastrar Vendedor</h1>
      <FormCadastrarVendedor onSubmit={formik.handleSubmit}>
        <DivInputsCadastrarVendedor>
          <IconWrapper>
            <FaUser />
          </IconWrapper>
          <InputCadastrarVendedor
            type="text"
            name="nome"
            placeholder="Nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nome && formik.errors.nome && (
            <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.nome}</div>
          )}
        </DivInputsCadastrarVendedor>

        <DivInputsCadastrarVendedor>
          <IconWrapper>
            <FaPhone />
          </IconWrapper>
          <InputCadastrarVendedor
            type="text"
            name="telefone"
            placeholder="Ex: 85999998888 (apenas números)"
            value={formik.values.telefone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.telefone && formik.errors.telefone && (
            <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.telefone}</div>
          )}
        </DivInputsCadastrarVendedor>

        <ButtonCadastrarVendedor type="submit" disabled={formik.isSubmitting}>
          Cadastrar
        </ButtonCadastrarVendedor>
      </FormCadastrarVendedor>
    </ContentCadastrarVendedor>
  );
};

export default CadastrarVendedor;
