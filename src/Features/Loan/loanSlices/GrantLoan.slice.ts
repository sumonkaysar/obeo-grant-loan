import { employeesData } from "@/Features/Loan/consts/employees.const";
import { grantedLoanData } from "@/Features/Loan/consts/grant-loan.const";
import type { ITableState } from "@/Features/Loan/types";
import type { IGrantLoanState } from "@/Features/Loan/types/grant-loan.type";
import type { RootState } from "@/Redux/store";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { Updater } from "@tanstack/react-table";
import { toast } from "sonner";

const initialState: IGrantLoanState = {
  employees: employeesData,
  grantedLoan: grantedLoanData,
  tableState: {
    globalFilter: "",
    sorting: [{ desc: false, id: "sl" }],
    rowSelection: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
  grantLoanEditId: "",
  grantLoanDeleteId: "",
};

export const grantLoanSlice = createSlice({
  name: "grantLoan",
  initialState,
  reducers: {
    grantLoan: (state, action) => {
      state.grantedLoan = [...state.grantedLoan, action.payload];
      toast.success("Loan granted succesfully");
      console.log(current(state));
    },
    selectGrantLoanEditId: (state, action) => {
      state.grantLoanEditId = action.payload;
    },
    removeGrantLoanEditId: (state) => {
      state.grantLoanEditId = "";
    },
    selectGrantLoanDeleteId: (state, action) => {
      state.grantLoanDeleteId = action.payload;
    },
    removeGrantLoanDeleteId: (state) => {
      state.grantLoanDeleteId = "";
    },
    editGrantLoan: (state, action) => {
      const index = state.grantedLoan.findIndex(
        (c) => c._id === state.grantLoanEditId
      );
      state.grantedLoan[index] = {
        ...state.grantedLoan[index],
        ...action.payload,
      };
      toast.success("Grant loan updated succesfully");
      state.grantLoanEditId = "";
    },
    deleteGrantLoan: (state) => {
      state.grantedLoan = state.grantedLoan.filter(
        (l) => l._id !== state.grantLoanDeleteId
      );
      toast.success("Grant loan deleted succesfully");
      state.grantLoanDeleteId = "";
    },
    updateGrantLoanTableState: (
      state,
      action: PayloadAction<{
        key: keyof ITableState;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updater: Updater<any>;
      }>
    ) => {
      const { key, updater } = action.payload;

      const currentValue = state.tableState[key];
      const newValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      state.tableState[key] = newValue;
    },
  },
});

export const {
  grantLoan,
  selectGrantLoanEditId,
  removeGrantLoanEditId,
  selectGrantLoanDeleteId,
  removeGrantLoanDeleteId,
  editGrantLoan,
  deleteGrantLoan,
  updateGrantLoanTableState,
} = grantLoanSlice.actions;

export const selectGrantLoanData = (state: RootState) => state.grantLoan;

export default grantLoanSlice.reducer;
