import { IActivity } from "../../../../models/models.activity";

export interface ISearchInterface {
  filters: {
    keyword: string;
    category: string;
    startDate: string;
    endDate: string;
    minPrice: string;
    maxPrice: string;
    language: string;
    sort: string;
  };
  activities: IActivity[];
  currentPage: number;
  totalPages: number;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePageChange: (page: number) => void;
}

export interface ShowcaseItemProps {
  bgImage: string
}

export interface IShowcaseData {
  id: number
  title: string
  lead: string
  bgImage: string
  btnLabel: string
  reverse: boolean
}

