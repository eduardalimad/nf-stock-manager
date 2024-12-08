from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world),
    path("requestScrape/", views.requestScrape,),
    path('posts/', views.post_create_view, name='post_create'),
    path('compras/', views.get_compras, name='get_compras'),
    path('compras/<int:id>/itens/', views.listar_itens_de_compra, name='listar_itens_de_compra'),
]
