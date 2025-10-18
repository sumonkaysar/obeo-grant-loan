import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDeleteDialog from "@/Features/Loan/Components/GrantLoan/ConfirmDeleteDialog";
import EditGrantLoanForm from "@/Features/Loan/Components/GrantLoan/EditGrantLoanForm";
import SearchData from "@/Features/Loan/Components/GrantLoan/SearchData";
import ShowEntries from "@/Features/Loan/Components/GrantLoan/ShowEntries";
import { tableColumns } from "@/Features/Loan/Components/GrantLoan/TableColumns";
import TablePagination from "@/Features/Loan/Components/GrantLoan/TablePagination";
import {
  deleteGrantLoan,
  removeGrantLoanDeleteId,
  selectGrantLoanData,
  updateGrantLoanTableState,
} from "@/Features/Loan/loanSlices/GrantLoan.slice";
import type { IGrantLoan } from "@/Features/Loan/types/grant-loan.type";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type TableState,
} from "@tanstack/react-table";

const GrantLoanTable = () => {
  const { grantedLoan, tableState, grantLoanDeleteId } =
    useAppSelector(selectGrantLoanData);
  const dispatch = useAppDispatch();

  const table = useReactTable<IGrantLoan>({
    data: grantedLoan,
    columns: tableColumns,
    onSortingChange: (updater) =>
      dispatch(updateGrantLoanTableState({ key: "sorting", updater })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: (updater) =>
      dispatch(updateGrantLoanTableState({ key: "rowSelection", updater })),
    onPaginationChange: (updater) =>
      dispatch(updateGrantLoanTableState({ key: "pagination", updater })),
    onGlobalFilterChange: (updater) =>
      dispatch(updateGrantLoanTableState({ key: "globalFilter", updater })),
    state: tableState as unknown as Partial<TableState>,
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <ShowEntries table={table} />
        <SearchData table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-10 text-center bg-[#F4F4F5]"
                >
                  No results found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
      <ConfirmDeleteDialog
        open={!!grantLoanDeleteId}
        onOpenChange={(open: boolean) => {
          if (!open) {
            dispatch(removeGrantLoanDeleteId());
          }
        }}
        onConfirm={() => dispatch(deleteGrantLoan())}
      />
      <EditGrantLoanForm />
    </div>
  );
};

export default GrantLoanTable;
