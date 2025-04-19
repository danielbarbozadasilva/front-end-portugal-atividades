import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import ActivityAction from '../../../store/activity/activity.action';
import { useAppSelector } from '../../../hooks';
import { IActivity, IActivityFilters } from '../../../models/models.activity';
import { AppWrapperComponent } from './styled';
import { Helmet } from 'react-helmet';
import { PageTitle } from './types';
import GastronomySection from '../../../components/portal/sections/gastronomy/index';
import HeroSection from '../../../components/portal/heroSection/index';
import SearchActivitiesComponent from '../../../components/portal/sections/activities/index';
import ShowCaseSectionComponent from '../../../components/portal/sections/showCase/index';
import ApresentationSectionComponent from '../../../components/portal/sections/apresentation/index';

const HomePage: React.FC<PageTitle> = ({ title }) => {
  const dispatch = useDispatch<AppDispatch>();
  const activityAction = new ActivityAction();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const activityResult: IActivity[] = useAppSelector((state: RootState) => state.activity.all);
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
  });

  const fetchActivities = async () => {
    try {
      const params: any = {
        page: currentPage,
        itemsPerPage: itemsPerPage,
        ...filters
      };
      Object.keys(params).forEach((key) => {
        if (!params[key]) delete params[key];
      });
      await dispatch(activityAction.listAllActivitiesAction(params));
      setTotalPages(1);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [currentPage, itemsPerPage, filters]);

  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;

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
              });
            },
            (error) => {
              console.error('Erro ao obter localização:', error);
              setFilters({
                ...filters,
                sort: value,
                lat: '',
                lng: ''
              });
            }
          );
        } else {
          console.error('Geolocalização não é suportada pelo navegador.');
          setFilters({
            ...filters,
            sort: value,
            lat: '',
            lng: ''
          });
        }
      } else {
        setFilters({
          ...filters,
          sort: value,
          lat: '',
          lng: ''
        });
      }
    } else {
      setFilters({
        ...filters,
        [name]: value
      });
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchActivities();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Helmet title={title} />
      <AppWrapperComponent>
        <ApresentationSectionComponent />
        <SearchActivitiesComponent
          filters={filters}
          activities={activityResult}
          currentPage={currentPage}
          totalPages={totalPages}
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
          handlePageChange={handlePageChange}
        />
        <HeroSection />
        <ShowCaseSectionComponent />
        <GastronomySection />
      </AppWrapperComponent>
    </>
  );
};

export default HomePage;
