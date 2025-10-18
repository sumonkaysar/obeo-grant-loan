import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  grantLoan,
  selectGrantLoanData,
} from "@/Features/Loan/loanSlices/GrantLoan.slice";
import { grantLoanZodSchema } from "@/Features/Loan/validations/grant-loan.validation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

const AddLoanForm = () => {
  const { employees } = useAppSelector(selectGrantLoanData);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(grantLoanZodSchema),
    defaultValues: {
      employee: "",
      loanNo: "",
      totalAmount: "",
      interestPercentage: "",
      installmentPeriod: "",
      permittedBy: "",
      repaymentFrom: new Date(),
    },
  });

  const handleSubmit = async (data: z.infer<typeof grantLoanZodSchema>) => {
    try {
      const selectedEmployee = employees.find(
        (employee) => employee._id === data.employee
      );
      const loanData = {
        _id: Number(
          `${
            Math.floor(Math.random() * (10000000 - 99999999 + 1)) + 99999999
          }${new Date().getTime()}`
        )
          .toString(16)
          .padStart(17, "0"),
        employee: data.employee,
        firstName: selectedEmployee?.firstName,
        lastName: selectedEmployee?.lastName,
        permittedBy: data.permittedBy,
        loanNo: data.loanNo,
        totalAmount: Number(data.totalAmount),
        interestPercentage: Number(data.interestPercentage),
        installmentPeriod: parseInt(data.installmentPeriod),
        repaymentTotal:
          Number(data.totalAmount) +
          (Number(data.totalAmount) * Number(data.interestPercentage)) / 100,
        approveDate: new Date().toISOString(),
        repaymentFrom: data.repaymentFrom.toISOString(),
      };

      console.log(loanData);

      dispatch(grantLoan(loanData));
      if (closeBtnRef.current) {
        closeBtnRef.current.click();
      }
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Add Loan
          </Button>
        </DialogTrigger>
        <DialogContent
          className="p-0 overflow-hidden min-w-11/12"
          aria-describedby="addLoanForm"
        >
          <DialogHeader className="sr-only">
            <DialogTitle className="text-xl">Add Loan</DialogTitle>
            <DialogDescription>Here you will Add Loan</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="border">
              <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
                Grant Loan
              </h2>
              <Form {...form}>
                <form
                  id="addLoan"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6 px-6 py-4"
                >
                  <FormField
                    control={form.control}
                    name="employee"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Employee<span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employees.map((employee) => (
                              <SelectItem
                                key={employee._id}
                                value={employee._id}
                              >
                                {employee.firstName} {employee.lastName} (
                                {employee.employeeId})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="sr-only">
                          Select an employee
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permittedBy"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Permitted By <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Permitted By" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter Permitted By.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loanNo"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Loan No <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Loan No" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter Loan No.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="totalAmount"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Total Amount <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="Total Amount"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter Total Amount.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interestPercentage"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Interest Percentage{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0.1}
                            step={0.1}
                            max={100}
                            placeholder="Interest Percentage"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter Interest Percentage.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="installmentPeriod"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Installment Period{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={120}
                            placeholder="Installment Period"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter Installment Period.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="repaymentFrom"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Repayment From <span className="text-red-500">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) => {
                                field.onChange(date);
                              }}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription className="sr-only">
                          Pick Repayment From Date.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <DialogFooter className="p-4">
            <DialogClose asChild>
              <Button type="button" ref={closeBtnRef} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="addLoan">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddLoanForm;
