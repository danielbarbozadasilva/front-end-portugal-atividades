import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import ActivityAction from '../../../store/activity/activity.action'
import { useAppSelector } from '../../../hooks'
import { IActivity, IActivityFilters } from '../../../models/models.activity'
import { IPagination, PageTitle } from './types'
import { styles } from './styled'
import { Helmet } from 'react-helmet'

const ActivityCardContainer: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const { images, name, description, startDate, endDate, likes } = activity
  return (
    <div className="card" style={styles.card}>
      <img
        src={images?.length > 0 ? images[0] : ''}
        alt={name}
        style={styles.image}
      />
      <div style={styles.cardBody}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>
          <strong>Início:</strong> {new Date(startDate).toLocaleString()} <br />
          <strong>Fim:</strong> {new Date(endDate).toLocaleString()}
        </p>
        <p>
          <strong>Curtidas:</strong> {likes?.length || 0}
        </p>
      </div>
    </div>
  )
}

const Pagination: React.FC<IPagination> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }
  return (
    <div style={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          disabled={page === currentPage}
          onClick={() => onPageChange(page)}
          style={styles.pageButton}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export const HomePage: React.FC<PageTitle> = ({ title }) => {
  const dispatch = useDispatch<AppDispatch>()
  const activityAction = new ActivityAction()
  const [activities, setActivities] = useState<IActivity[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [totalPages, setTotalPages] = useState<number>(1)
  const activityResult: IActivity[] = useAppSelector((state: RootState) => state.activity.all)
  const [filters, setFilters] = useState<IActivityFilters>({
    keyword: '',
    category: '',
    startDate: '',
    endDate: '',
    minPrice: '',
    maxPrice: '',
    language: '',
    lat: '',
    lng: '',
    sort: ''
  })

  const fetchActivities = async () => {
    try {
      const params: any = {
        page: currentPage,
        itemsPerPage: itemsPerPage,
        ...filters
      }
      Object.keys(params).forEach((key) => {
        if (!params[key]) delete params[key]
      })
      const response = await dispatch(
        activityAction.listAllActivitiesAction(params)
      )
      // Se a resposta conter os dados (ajuste conforme sua resposta)
      setActivities(response.payload.data)
      setTotalPages(1)
    } catch (error) {
      console.error('Erro ao buscar atividades:', error)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [currentPage, itemsPerPage, filters])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'sort') {
      if (value === 'location') {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setFilters({
                ...filters,
                sort: value,
                lat: position.coords.latitude.toString(),
                lng: position.coords.longitude.toString()
              })
            },
            (error) => {
              console.error('Erro ao obter localização:', error)
              setFilters({
                ...filters,
                sort: value,
                lat: '',
                lng: ''
              })
            }
          )
        } else {
          console.error('Geolocalização não é suportada pelo navegador.')
          setFilters({
            ...filters,
            sort: value,
            lat: '',
            lng: ''
          })
        }
      } else {
        setFilters({
          ...filters,
          sort: value,
          lat: '',
          lng: ''
        })
      }
    } else {
      setFilters({
        ...filters,
        [name]: value
      })
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchActivities()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Helmet title={title} />
      <div style={styles.container}>
        <h1>Atividades Turísticas</h1>
        <form onSubmit={handleSearch} style={styles.filterForm}>
          <input
            type="text"
            name="keyword"
            placeholder="Palavra-chave"
            value={filters.keyword}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="text"
            name="category"
            placeholder="Categoria"
            value={filters.category}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="date"
            name="startDate"
            placeholder="Data Início"
            value={filters.startDate}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="date"
            name="endDate"
            placeholder="Data Fim"
            value={filters.endDate}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Preço Mínimo"
            value={filters.minPrice}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Preço Máximo"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="text"
            name="language"
            placeholder="Idioma"
            value={filters.language}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            style={styles.input}
          >
            <option value="">Ordenar por</option>
            <option value="alfabetica_a-z">Alfabética (A-Z)</option>
            <option value="alfabetica_z-a">Alfabética (Z-A)</option>
            <option value="preco">Preço</option>
            <option value="data">Data</option>
            <option value="relevancia">Relevância</option>
            <option value="avaliacao_asc">Avaliação (asc)</option>
            <option value="avaliacao_desc">Avaliação (desc)</option>
            <option value="location">Localização</option>
          </select>
          <button type="submit" style={styles.button}>
            Buscar
          </button>
        </form>

        <div style={styles.activitiesContainer}>
          {activities?.map((activity: IActivity) => (
            <ActivityCardContainer key={activity._id} activity={activity} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
