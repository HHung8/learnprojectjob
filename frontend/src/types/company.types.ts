// Company interface matching the database schema
export interface Company {
  id: number;
  name: string;
  description?: string | null;
  website?: string | null;
  location?: string | null;
  logo?: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
}

// API Response interfaces
export interface CompanyResponse {
  message: string;
  company?: Company;
  companies?: Company[];
  success: boolean;
}

// Register Company Request
export interface RegisterCompanyRequest {
  companyName: string;
}

// Update Company Request
export interface UpdateCompanyRequest {
  name?: string;
  description?: string;
  website?: string;
  location?: string;
  logo?: File | string | null;
}

