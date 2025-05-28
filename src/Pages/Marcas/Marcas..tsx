import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  ContentListaMarcas,
  Div,
  Button,
  ListaMarcaContainer,
  CardMarca,
  CardActions,
  ModalBackground,
  ModalContent
} from './MarcasStyled'
import useApi from '../../Api/Api'

const Marcas: React.FC = () => {
  const api = useApi()
  const navigate = useNavigate()

  const baseUrl = 'https://my-first-project-repo-production.up.railway.app'
  const [marcas, setMarcas] = React.useState<any[]>([])
  const [open, setOpen] = React.useState(false)
  const [marcaSelecionada, setMarcaSelecionada] = React.useState<any | null>(null)

  const [paginaAtual, setPaginaAtual] = React.useState<number>(1)
  const itensPorPagina = 3
  const indiceInicial = (paginaAtual - 1) * itensPorPagina
  const indiceFinal = indiceInicial + itensPorPagina
  const marcasPagina = marcas.slice(indiceInicial, indiceFinal)

  const fetchMarcas = async () => {
    try {
      const response = await api.get("/marcas")
      if (response.status === 200) {
        setMarcas(response.data)
      } else {
        alert("Erro ao buscar marcas.")
      }
    } catch (error) {
      console.error("Erro ao buscar marcas:", error)
      alert("Erro ao buscar marcas.")
    }
  }

  React.useEffect(() => {
    fetchMarcas()
  }, [])

  const handleProximo = () => {
    if (paginaAtual < Math.ceil(marcas.length / itensPorPagina)) {
      setPaginaAtual((prev) => prev + 1)
    }
  }

  const handleVoltar = () => {
    if (paginaAtual > 1) {
      setPaginaAtual((prev) => prev - 1)
    }
  }

  const handleNavigate = () => {
    navigate("/cadastrarMarca");
  }

  const handleOpenModal = (marca: any) => {
    setMarcaSelecionada(marca)
    formik.setFieldValue("nome", marca.nome)
    formik.setFieldValue("imagem", null)
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
    setMarcaSelecionada(null)
    formik.resetForm()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta marca?")) {
      try {
        const response = await api.delete(`/marca/${id}`)
        if (response.status === 200) {
          setMarcas((prev) => prev.filter((marca) => marca.id !== id))
        } else {
          alert("Erro ao deletar.")
        }
      } catch (err) {
        console.error("Erro ao deletar marca:", err)
        alert("Erro ao deletar marca.")
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      nome: '',
      imagem: null as File | null
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Nome obrigatório')
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData()
        formData.append("nome", values.nome)
        if (values.imagem) {
          formData.append("imagem", values.imagem)
        }

        const response = await api.put(`/marca/${marcaSelecionada.id}`, formData)
        if (response.status === 200) {
          alert("Marca atualizada com sucesso")
          fetchMarcas()
          handleCloseModal()
        } else {
          alert("Erro ao atualizar marca")
        }
      } catch (err) {
        console.error("Erro ao atualizar marca:", err)
        alert("Erro ao atualizar marca")
      }
    }
  })

  return (
    <ContentListaMarcas>
      <Div>
        <h2>Lista de marcas</h2>
        <Button onClick={handleNavigate}>Adicionar marca</Button>
      </Div>

      <ListaMarcaContainer>
        {marcasPagina.map((marca) => (
          <CardMarca key={marca.id}>
            <img src={`${baseUrl}${marca.logo}`} alt="Imagem da marca" />
            <h3>{marca.nome}</h3>

            <CardActions className="actions">
              <button onClick={() => handleOpenModal(marca)}>Editar</button>
              <button onClick={() => handleDelete(marca.id)}>Excluir</button>
            </CardActions>
          </CardMarca>
        ))}
      </ListaMarcaContainer>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <Button onClick={handleVoltar}>Voltar</Button>
        <Button onClick={handleProximo}>Próximo</Button>
      </div>

      <ModalBackground open={open}>
        <ModalContent>
          <h3>Editar Marca</h3>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>Nome:</label><br />
              <input
                type="text"
                name="nome"
                value={formik.values.nome}
                onChange={formik.handleChange}
              />
              {formik.errors.nome && <p style={{ color: "red" }}>{formik.errors.nome}</p>}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <label>Imagem (opcional):</label><br />
              <input
                type="file"
                name="imagem"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0]
                  formik.setFieldValue("imagem", file)
                }}
              />
            </div>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              <Button type="submit">Salvar</Button>
              <Button type="button" onClick={handleCloseModal}>Cancelar</Button>
            </div>
          </form>
        </ModalContent>
      </ModalBackground>
    </ContentListaMarcas>
  )
}

export default Marcas
