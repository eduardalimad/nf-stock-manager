from django.db import models

class Compra(models.Model):
    vendedor = models.CharField(max_length=255)
    valorTotal = models.DecimalField(max_digits=10, decimal_places=2)  # Usando DecimalField para valores monetários
    dataCompra = models.DateField()  # Usando DateField para armazenar datas

    def __str__(self):
        return f"{self.vendedor} - {self.valorTotal}"

class Item(models.Model):
    compra = models.ForeignKey(Compra, related_name='items', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=255)
    quantidade = models.IntegerField()  # Usando IntegerField para quantidade
    unidade = models.CharField(max_length=50)
    valor_unitario = models.DecimalField(max_digits=10, decimal_places=2)  # Usando DecimalField para valor unitário
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)  # Usando DecimalField para valor total

    def __str__(self):
        return self.titulo
