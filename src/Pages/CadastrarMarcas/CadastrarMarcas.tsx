import React from 'react'
import {
  ButtonSalvar,
  ContentCadastrarMarcas,
  Div,
  Form,
  Input,
  Label
} from './CadastrarMarcasStyled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useApi from '../../Api/Api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CadastrarMarcas: React.FC = () => {
  const api = useApi()
  const navigate = useNavigate()

  const handleVoltar = () => {
    navigate('/marcas')
  }

  const formik = useFormik({
    initialValues: {
      nome: '',
      imagem: null as File | null,
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Nome é obrigatório'),
      imagem: Yup.mixed().required('Imagem é obrigatória'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData()
        formData.append('nome', values.nome)
        formData.append('imagem', values.imagem as File)

        const response = await api.post('/marca', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (response.status === 200 || response.status === 201) {
          toast.success('Marca cadastrada com sucesso!')
          handleVoltar()
          formik.resetForm()
        } else {
          toast.error('Erro ao cadastrar marca.')
        }
      } catch (error) {
        console.error('Erro ao cadastrar marca:', error)
        toast.error('Erro ao cadastrar marca.')
      }
    },
  })

  return (
    <ContentCadastrarMarcas>
      <h2>Cadastrar Marcas</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Div>
          <Label htmlFor="nome">Nome da Marca</Label>
          <Input
            type="text"
            id="nome"
            name="nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nome && formik.errors.nome && (
            <div style={{ color: 'red' }}>{formik.errors.nome}</div>
          )}
        </Div>

        <Div>
          <Label htmlFor="imagem">Logo da Marca</Label>
          <Input
            type="file"
            id="imagem"
            name="imagem"
            accept="image/*"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0]
              formik.setFieldValue('imagem', file)
            }}
          />
          {formik.touched.imagem && formik.errors.imagem && (
            <div style={{ color: 'red' }}>{formik.errors.imagem}</div>
          )}
        </Div>

        <ButtonSalvar type="submit">Salvar</ButtonSalvar>
      </Form>
    </ContentCadastrarMarcas>
  )
}

export default CadastrarMarcas
