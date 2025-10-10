from django.db.models import Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import models
from .expenseSerializer import ExpenseSerializer
from .models import Expense
from rest_framework.permissions import  AllowAny
from rest_framework import viewsets


# Create your views here.

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all().order_by("-date")
    serializer_class = ExpenseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Expense.objects.all()
        category = self.request.query_params.get('category')
        date = self.request.query_params.get('date')

        if category:
            queryset = queryset.filter(category=category)
        if date:
            queryset = queryset.filter(date=date)
        return queryset

@api_view(['GET'])
def balance(request):
    incomes = Expense.objects.filter(type='income').aggregate(total=models.Sum("amount"))["total"] or 0
    expenses = Expense.objects.filter(type="expense").aggregate(total=models.Sum("amount"))["total"] or 0
    balance = incomes - expenses
    return Response({
        "total_income":incomes,
        "total_expenses":expenses,
        "balance":balance,
    })

@api_view(['GET'])
def expense_distribution(request):
    data = (
        Expense.objects.filter(type="expense")
        .values("category")
        .annotate(total=Sum("amount"))
        .order_by("category")
    )
    formatted_data=[
        {"name": item["category"].capitalize(), "value": item["total"]}
          for item in data
    ]

    return Response(formatted_data)