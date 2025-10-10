from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet, balance, expense_distribution

router = DefaultRouter()
router.register(r'expenses',ExpenseViewSet, basename='expenses')

urlpatterns = [
    path('',include(router.urls)),
    path('balance/',balance,name='balance'),
    path("expense-distribution/", expense_distribution , name="expense-distribution"),
]