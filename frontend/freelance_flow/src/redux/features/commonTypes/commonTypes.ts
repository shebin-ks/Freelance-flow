export interface CreatedBy {
  id: number;
  name: string;
  email: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  company: Company;
}

export interface Company {
  id: number;
  name: string
}

export interface BaseResponse {
  success: boolean;
  message: string;
}




export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  leadCompanyName?: string;
  purpose: string;
  status: string;
  createdAt: string;
  createdBy: CreatedBy
}

export interface Pagination {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}