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
  editGrantLoan,
  removeGrantLoanEditId,
  selectGrantLoanData,
} from "@/Features/Loan/loanSlices/GrantLoan.slice";
import type { IGrantLoan } from "@/Features/Loan/types/grant-loan.type";
import { grantLoanUpdateZodSchema } from "@/Features/Loan/validations/grant-loan.validation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

const EditGrantLoanForm = () => {
  const closeCalendarRef = useRef<HTMLButtonElement>(null);
  const { grantedLoan, grantLoanEditId } = useAppSelector(selectGrantLoanData);
  const dispatch = useAppDispatch();
  const prevData = grantedLoan.find((s) => s._id === grantLoanEditId);
  const form = useForm({
    resolver: zodResolver(grantLoanUpdateZodSchema),
    values: {
      totalAmount: String(prevData?.totalAmount || 0),
      interestPercentage: String(prevData?.interestPercentage || 0),
      installmentPeriod: String(prevData?.installmentPeriod || 0),
      repaymentFrom: prevData?.repaymentFrom
        ? parseISO(prevData?.repaymentFrom)
        : "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof grantLoanUpdateZodSchema>
  ) => {
    try {
      let updatedData = {} as Partial<IGrantLoan>;
      for (const key in data) {
        if (key === "repaymentFrom") {
          updatedData = {
            ...updatedData,
            [key]: new Date(
              data[key as keyof typeof data] as string
            ).toISOString(),
          };
        } else if (key === "totalAmount" || key === "interestPercentage") {
          updatedData = {
            ...updatedData,
            repaymentTotal:
              Number(data.totalAmount) +
              (Number(data.totalAmount) * Number(data.interestPercentage)) /
                100,
            [key]: Number(data[key as keyof typeof data]),
          };
        } else {
          updatedData = {
            ...updatedData,
            [key]: Number(data[key as keyof typeof data]),
          };
        }
      }

      dispatch(editGrantLoan(updatedData));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={!!grantLoanEditId}
      onOpenChange={(open: boolean) => {
        if (!open) {
          dispatch(removeGrantLoanEditId());
        }
      }}
    >
      <DialogContent
        className="p-0 overflow-hidden min-w-11/12"
        aria-describedby="EditGrantLoan"
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="text-xl">Edit Grant Loan</DialogTitle>
          <DialogDescription>Here you will Edit Grant Loan</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="border">
            <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
              Edit Grant Loan
            </h2>
            <Form {...form}>
              <form
                id="editGrantLoan"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 px-6 py-4"
              >
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Total Amount <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Total Amount" {...field} />
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
                        <Input placeholder="Interest Percentage" {...field} />
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
                        <Input placeholder="Installment Period" {...field} />
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
                              ref={closeCalendarRef}
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
                              closeCalendarRef.current?.click();
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="editGrantLoan">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditGrantLoanForm;
