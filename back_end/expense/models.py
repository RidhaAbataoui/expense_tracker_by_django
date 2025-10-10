from django.db import models

class TypeOfExpense(models.TextChoices):
    INCOME = 'income', 'Income'
    EXPENSE = 'expense', 'Expense'

# Create your models here.
class Expense(models.Model):
    CATEGORY_CHOICES = [
        ("food", "Food"),
        ("transport", "Transport"),
        ("entertainment", "Entertainment"),
        ("bills", "Bills"),
        ("others", "Others"),
    ]

    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100,choices=CATEGORY_CHOICES)
    date = models.DateField(auto_now_add=True)
    type = models.CharField(
        max_length=10,
        choices=TypeOfExpense.choices,
        default=TypeOfExpense.INCOME,
    )
    def __str__(self):
        return f"{self.title} -{self.amount}-{self.type}"