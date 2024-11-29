from django.contrib import admin
from .models import Compra, Item  # Certifique-se de importar sua model

admin.site.register(Compra)
admin.site.register(Item)  # Registre sua model aqui
