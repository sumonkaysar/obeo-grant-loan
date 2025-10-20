import TableActions from "@/Features/Loan/Components/GrantLoan/TableActions";
import TableColumnHeader from "@/Features/Loan/Components/GrantLoan/TableColumnHeader";
import type { IGrantLoan } from "@/Features/Loan/types/grant-loan.type";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const tableColumns: ColumnDef<IGrantLoan>[] = [
  {
    accessorKey: "sl",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="SL" />
    ),
    cell: ({ row }) => <div className="px-3">{row.index + 1}</div>,
    enableHiding: false,
    sortingFn: (rowA, rowB) => {
      return rowA.index + 1 - (rowB.index + 1);
    },
  },
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Name" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "permittedBy",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Permitted By" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("permittedBy")}</div>
    ),
  },
  {
    accessorKey: "loanNo",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Loan No." />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("loanNo")}</div>,
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Total Amount" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("totalAmount")}</div>
    ),
  },
  {
    accessorKey: "interestPercentage",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Interest Percentage" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("interestPercentage")}</div>
    ),
  },
  {
    accessorKey: "installmentPeriod",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Installment Period" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("installmentPeriod")}</div>
    ),
  },
  {
    accessorKey: "repaymentTotal",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Repayment Total" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("repaymentTotal")}</div>
    ),
  },
  {
    accessorKey: "approveDate",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Approve Date" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {format(row.getValue("approveDate"), "do MMM yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "repaymentFrom",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Repayment From" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {format(row.getValue("repaymentFrom"), "do MMM yyyy")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { _id } = row.original;
      return <TableActions id={_id} />;
    },
  },
];
