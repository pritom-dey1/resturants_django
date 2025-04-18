from django import forms
from .models import Oder

class Oder(forms.ModelForm):
    class Meta:
        model = Oder
        fields = ['order_name', 'email','item_name', 'total', 'phone', 'address']
