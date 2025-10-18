import z from "zod";

export const grantLoanZodSchema = z.object({
  employee: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Employee is required"
          : "Employee must be a string",
    })
    .nonempty("Employee can't be blank"),
  permittedBy: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Permitted by is required"
          : "Permitted by must be a string",
    })
    .nonempty("Permitted by can't be blank"),
  loanNo: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Loan no is required"
          : "Loan no must be a string",
    })
    .nonempty("Loan no can't be blank"),
  totalAmount: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Total amount must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Total amount must be greater than 0",
    }),
  interestPercentage: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Interest percentage must be a number",
    })
    .refine((val) => Number(val) >= 0.1, {
      message: "Interest percentage must be at least 0.1",
    })
    .refine((val) => Number(val) <= 100, {
      message: "Interest percentage cannot exceed 100",
    }),
  installmentPeriod: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Installment period must be a number",
    })
    .refine((val) => parseInt(val), {
      message: "Installment period must be an integer",
    })
    .refine((val) => Number(val) >= 1, {
      message: "Installment period must be at least 1 month",
    })
    .refine((val) => Number(val) <= 120, {
      message: "Installment period cannot exceed 120 months",
    }),
  repaymentFrom: z.date({
    error: (issue) =>
      issue.input === undefined
        ? "Repayment from date is required"
        : "Repayment from date must be a date",
  }),
});

export const grantLoanUpdateZodSchema = z.object({
  totalAmount: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Total amount must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Total amount must be greater than 0",
    })
    .optional(),
  interestPercentage: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Interest percentage must be a number",
    })
    .refine((val) => Number(val) >= 0.1, {
      message: "Interest percentage must be at least 0.1",
    })
    .refine((val) => Number(val) <= 100, {
      message: "Interest percentage cannot exceed 100",
    })
    .optional(),
  installmentPeriod: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Installment period must be a number",
    })
    .refine((val) => Number.isInteger(Number(val)), {
      message: "Installment period must be an integer",
    })
    .refine((val) => Number(val) >= 1, {
      message: "Installment period must be at least 1 month",
    })
    .refine((val) => Number(val) <= 120, {
      message: "Installment period cannot exceed 120 months",
    })
    .optional(),
  repaymentFrom: z.date("Repayment from date must be a date").optional(),
});
