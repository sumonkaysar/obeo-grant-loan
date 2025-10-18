import type { ITableState } from "@/Features/Loan/types";
import type { IEmployee } from "@/Features/Loan/types/employee.type";

export interface IGrantLoan {
  _id: string;
  employee: string;
  firstName: string;
  lastName: string;
  permittedBy: string;
  loanNo: string;
  totalAmount: number;
  interestPercentage: number;
  installmentPeriod: number;
  repaymentTotal: number;
  approveDate: string;
  repaymentFrom: string;
}

export interface IGrantLoanState {
  employees: IEmployee[];
  grantedLoan: IGrantLoan[];
  tableState: ITableState;
  grantLoanEditId: string;
  grantLoanDeleteId: string;
}
