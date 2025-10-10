import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { filterExpenses, Expense } from "@/API/filterExpenses";




const categories = ["All", "Food", "Transport", "Entertainment", "Bills", "Others"];

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // filter state
  const [filterCategory, setFilterCategory] = useState<string>("All")
  const [filterType, setFilterType] = useState<string>("all")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch expenses from API
    (async () =>{
      setLoading(true)
      try{
        const data = await filterExpenses({
          category: filterCategory !== "All" ? filterCategory : undefined,
          date,
        })
        // ensure amount is a number (prevents toFixed errors)
        setExpenses(
          data.map((e) => ({
            ...e,
            amount: Number(e.amount) || 0,
          }))
        )
       }catch(error){
         console.error(error)
       }finally{
         setLoading(false)
       }
    })()
  }, [filterCategory, date])

  // apply type filter client-side because backend currently filters by category/date only
  const filteredExpenses = expenses.filter((e) =>
    filterType === "all" ? true : e.type === filterType
  )

  const handleDelete = (id: number) => {
    // TODO: Replace with actual API call
    setExpenses(expenses.filter((expense) => expense.id !== id));
    toast.success("Transaction deleted successfully");
  };

  const handleEdit = (id: number) => {
    // TODO: Implement edit functionality
    toast.info("Edit functionality coming soon");
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">View and manage all your transactions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter transactions by category and type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={filterCategory} onValueChange={(v) => setFilterCategory(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Select value={filterType} onValueChange={(v) => setFilterType(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Showing {filteredExpenses.length} of {expenses.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.title}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant={expense.type === "income" ? "default" : "secondary"}
                          className={
                            expense.type === "income"
                              ? "bg-success text-success-foreground"
                              : "bg-destructive/10 text-destructive"
                          }
                        >
                          {expense.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right font-semibold">
                        <span className={expense.type === "income" ? "text-success" : "text-destructive"}>
                          {expense.type === "income" ? "+" : "-"}${expense.amount.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(expense.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(expense.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;


