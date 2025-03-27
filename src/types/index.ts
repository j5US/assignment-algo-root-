export interface User {
  id: string;
  email: string;
  password: string;
}

export interface TableData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface TableState {
  sortField: keyof TableData;
  sortDirection: 'asc' | 'desc';
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
}

export type TableAction =
  | { type: 'SET_SORT'; field: keyof TableData }
  | { type: 'SET_SEARCH'; term: string }
  | { type: 'SET_PAGE'; page: number }
  | { type: 'RESET_TABLE' };

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGIN_ERROR'; error: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

export interface AppState {
  auth: AuthState;
  table: TableState;
}

export interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
  deleteAccount: () => void;
}