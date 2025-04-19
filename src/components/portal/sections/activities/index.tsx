import React from 'react';
import { useTranslation } from 'react-i18next'; // <-- Import do hook
import Pagination from '../../../paginate/index';
import { IActivity } from '../../../../models/models.activity';
import ActivityCardContainer from '../containerCards/index';
import { ISearchInterface } from './types';
import { ActivitiesContainer, FilterButton, FilterContainer, FilterForm, FilterInput, FilterSelect, SectionTitle } from './styled';

const SearchActivitiesComponent: React.FC<ISearchInterface> = ({
  filters,
  activities,
  currentPage,
  totalPages,
  handleFilterChange,
  handleSearch,
  handlePageChange
}) => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Título substituído por t('home.activitiesSectionTitle') */}
      <SectionTitle>{t('home.activitiesSectionTitle')}</SectionTitle>

      <FilterContainer>
        <FilterForm onSubmit={handleSearch}>
          <FilterInput
            type="text"
            name="keyword"
            placeholder={
              t('home.filters.keywordPlaceholder') || 'Palavra-chave'
            }
            value={filters.keyword}
            onChange={handleFilterChange}
          />
          <FilterInput
            type="text"
            name="category"
            placeholder={t('home.filters.categoryPlaceholder') || 'Categoria'}
            value={filters.category}
            onChange={handleFilterChange}
          />
          <FilterInput
            type="date"
            name="startDate"
            placeholder={
              t('home.filters.startDatePlaceholder') || 'Data Início'
            }
            value={filters.startDate}
            onChange={handleFilterChange}
          />
          <FilterInput
            type="date"
            name="endDate"
            placeholder={t('home.filters.endDatePlaceholder') || 'Data Fim'}
            value={filters.endDate}
            onChange={handleFilterChange}
          />
          <FilterInput
            type="number"
            name="minPrice"
            placeholder={
              t('home.filters.minPricePlaceholder') || 'Preço Mínimo'
            }
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <FilterInput
            type="number"
            name="maxPrice"
            placeholder={
              t('home.filters.maxPricePlaceholder') || 'Preço Máximo'
            }
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
          <FilterInput
            type="text"
            name="language"
            placeholder={t('home.filters.languagePlaceholder') || 'Idioma'}
            value={filters.language}
            onChange={handleFilterChange}
          />

          <FilterSelect
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
          >
            <option value="">{t('home.filters.sortTitle')}</option>
            <option value="alfabetica_a-z">
              {t('home.filters.sortAlphabeticalAZ')}
            </option>
            <option value="alfabetica_z-a">
              {t('home.filters.sortAlphabeticalZA')}
            </option>
            <option value="preco">{t('home.filters.sortPrice')}</option>
            <option value="data">{t('home.filters.sortDate')}</option>
            <option value="relevancia">
              {t('home.filters.sortRelevance')}
            </option>
            <option value="avaliacao_asc">
              {t('home.filters.sortRatingAsc')}
            </option>
            <option value="avaliacao_desc">
              {t('home.filters.sortRatingDesc')}
            </option>
            <option value="location">{t('home.filters.sortLocation')}</option>
          </FilterSelect>

          <FilterButton type="submit">
            {t('home.filters.searchButton')}
          </FilterButton>
        </FilterForm>
      </FilterContainer>

      <ActivitiesContainer>
        {activities?.length > 0 &&
          activities.map((activity: IActivity) => (
            <ActivityCardContainer key={activity._id} activity={activity} />
          ))}
      </ActivitiesContainer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchActivitiesComponent;
