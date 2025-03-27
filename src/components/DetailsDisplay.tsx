import { TableData } from '../types';
import { useTable } from '../context/TableContext';
import { ArrowUpDown, Search } from 'lucide-react';
import { DataTable } from './DataTable';
import DataRow from './DataRow';
import useWindowWidth from '../hooks/useWindowWidth';

interface DataTableProps {
    data: TableData[];
}

const DetailsDisplay: React.FC<DataTableProps> = ({ data }) => {
    const { state, dispatch } = useTable();
    const width = useWindowWidth() as number;
    const isSmallerScreen = (w: number) => (w < 770) ? true : false;

    const { sortField, sortDirection, searchTerm, currentPage, itemsPerPage } = state;

    const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const sortOptions = [
        { field: 'name' as keyof TableData, label: 'Name' },
        { field: 'role' as keyof TableData, label: 'Role' },
        { field: 'status' as keyof TableData, label: 'Status' }
    ];

    return (
        <div className=" rounded-lg p-6 max-md:p-1">
            <div className="mb-4 flex flex-wrap items-center gap-4 mb-6">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => dispatch({ type: 'SET_SEARCH', term: e.target.value })}
                        className="w-100 max-md:w-full pl-10 pr-4  h-[40px] rounded-lg bg-white outline-none border border-gray-200"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center gap-2 justify-center max-md:w-full">
                    {sortOptions.map((option) => (
                        <button
                            key={option.field}
                            onClick={() => dispatch({ type: 'SET_SORT', field: option.field })}
                            className={`flex cursor-pointer items-center justify-center gap-1 w-[95px] h-[40px] rounded-md border transition-colors ${sortField === option.field
                                ? 'bg-blue-50 border-blue-200 text-blue-600'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {option.label}
                            {sortField === option.field && (
                                <ArrowUpDown className="h-4 w-4" />
                            )}
                        </button>
                    ))}
                </div>
            </div>


            {
                isSmallerScreen(width) ?
                    <DataRow paginatedData={paginatedData} /> :
                    <DataTable data={data} paginatedData={paginatedData} />

            }

            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} entries
                </div>
                <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => dispatch({ type: 'SET_PAGE', page })}
                            className={`px-3 py-1 rounded cursor-pointer ${currentPage === page
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailsDisplay;
