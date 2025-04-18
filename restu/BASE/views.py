from django.shortcuts import render,redirect
from BASE.models import ItemList,Items,About,Oder
from .forms import Oder
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import logout
import random
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect
from django.template.loader import render_to_string
from django.utils.html import strip_tags
# Create your views here.
def home(request):
    about = About.objects.all()
    items = Items.objects.all()[:6]
    list = ItemList.objects.all()
    return render(request, 'index.html', {
    'about': about,
    'items': items,
    'list': list
})
    

    
def about(request):
    about = About.objects.all()
    return render(request, 'about.html',{
        'about': about,
    })
    
    
def success(request):
    return render(request,'success.html')
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from BASE.models import ItemList, Items
from django.shortcuts import render
from BASE.models import ItemList, Items

from django.http import HttpResponse
from django.template.loader import render_to_string

def menu(request):
    query = request.GET.get('q')
    category = request.GET.get('category')

    items = Items.objects.all()

    if query:
        items = items.filter(Name__icontains=query)
    if category and category != 'all':
        items = items.filter(category__Cat_name=category)

    list = ItemList.objects.all()

    # ✅ AJAX request hole sudhu items er HTML render kore pathabe
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        html = render_to_string('partials/menu_items.html', {'items': items})
        return HttpResponse(html)

    # 🧾 Normal page load hole full page render
    return render(request, 'menu.html', {
        'items': items,
        'list': list
    })

from django.shortcuts import render, redirect
from BASE.models import Oder

@login_required(login_url='login')
def order(request):
    categories = ItemList.objects.all()  # Send category list to the template

    if request.method == "POST":
        order_name = request.POST.get('order_name')
        email = request.POST.get('email')
        item_name = request.POST.get('item_name')
        total = request.POST.get('total')
        phone = request.POST.get('phone')
        address = request.POST.get('address')

        new_order = Oder(
            order_name=order_name,
            email=email,
            item_name=item_name,
            total=total,
            phone=phone,
            address=address
        )
        new_order.save()
        return redirect('success')

    return render(request, 'order.html', {'categories': categories})
def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
        else:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.is_active = False
            user.save()

            code = random.randint(100000, 999999)
            request.session['verify_user'] = username
            request.session['verify_code'] = str(code)

            # 📨 customized email part
            html_message = render_to_string('emails/email.html', {
                'username': username,
                'code': code
            })
            plain_message = strip_tags(html_message)

            send_mail(
                'Your Verification Code ✉️',
                plain_message,
                'noreply@yourdomain.com',
                [email],
                html_message=html_message,
                fail_silently=False,
            )

            return redirect('verify_email')

    return render(request, 'register.html')


def verify_email(request):
    if request.method == 'POST':
        input_code = request.POST.get('code')
        session_code = request.session.get('verify_code')
        username = request.session.get('verify_user')

        if input_code == session_code:
            user = User.objects.get(username=username)
            user.is_active = True
            user.save()

            # Clear session
            del request.session['verify_code']
            del request.session['verify_user']

            messages.success(request, "Email verified! Please login.")
            return redirect('login')
        else:
            messages.error(request, "Invalid code. Try again.")

    return render(request, 'verify_email.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/')  # Redirect to your home/menu/dashboard
        else:
            messages.error(request, 'Invalid username or password')
    return render(request, 'login.html')
from django.contrib.auth import logout

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')  # user login na thakle login page e pathabe


def dashboard(request):
    return render(request, 'dashboard.html')

def login_redirect(request):
    if request.user.is_authenticated:
        return redirect('dashboard')  # jei url name dashboard er
    else:
        return redirect('login') 
    








def logout_view(request):
    logout(request)
    return redirect('login')


@login_required
def dashboard(request):
    user_email = request.user.email
    oder = Oder.objects.filter(email=user_email).order_by('-id')  # spelling must match your model

    return render(request, 'dashboard.html', {
        'orders': oder
    })
    
@login_required
def cancel_order(request, order_id):
    order = get_object_or_404(Oder, id=order_id, email=request.user.email)
    order.status = 'Cancelled'
    order.save()
    return redirect('dashboard')  # dashboard holo tomar oi page er url name

def single_item(request, id):
    item = get_object_or_404(Items, id=id)
    return render(request, 'single_item.html', {'item': item})


from django.http import JsonResponse
from BASE.models import Items

def get_items_by_category(request, cat_id):
    items = Items.objects.filter(category_id=cat_id).values('id', 'Name', 'price')
    return JsonResponse(list(items), safe=False)
