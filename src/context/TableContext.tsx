import React, { createContext, useContext, useReducer } from 'react';
import { TableState, TableAction } from '../types';

const initialState: TableState = {
  sortField: 'name',
  sortDirection: 'asc',
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 5,
};

function tableReducer(state: TableState, action: TableAction): TableState {
  switch (action.type) {
    case 'SET_SORT':
      return {
        ...state,
        sortField: action.field,
        sortDirection: state.sortField === action.field && state.sortDirection === 'asc' ? 'desc' : 'asc',
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.term,
        currentPage: 1,
      };
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.page,
      };
    case 'RESET_TABLE':
      return initialState;
    default:
      return state;
  }
}

interface TableContextType {
  state: TableState;
  dispatch: React.Dispatch<TableAction>;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
};