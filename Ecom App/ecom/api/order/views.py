from django.http import JsonResponse,HttpResponse
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import orderSerializer,orderreturnsSerializer
from .models import order,orderreturns
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
# Create your views here.

def validate_user_session(id,token):
    UserModel = get_user_model()
    try:
        user =UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False
    
@csrf_exempt
def add(request, id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error': 'Please re-login','code':'1'})
    
    if request.method == 'POST':
        user_id = id
        txn_id = request.POST['transaction_id']
        amount = request.POST['amount']
        products = request.POST['products']

        total_pro = len(products.split(',')[:-1])

        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})
        ordr = order(user=user,product_names=products,total_product=total_pro,transaction_id=txn_id,total_amount=amount)
        ordr.save()

        return JsonResponse({'success': True,'error':False, 'Msg':'order placed successfully.'})
    
@csrf_exempt
def history(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error': 'Please re-login','code':'1'})
    
    queryset = order.objects.filter(user=id).values().first() # Replace with your actual QuerySet
    
    #data_list = list(queryset.values())  # Convert QuerySet to a list of dictionaries
    #return JsonResponse(data_list, safe=False)
    #return JsonResponse({'order history':order_history, 'success': True})
    
    return JsonResponse({'success':True,'order_history': queryset})



    
class orderViewSet(viewsets.ModelViewSet):
    queryset = order.objects.all().order_by('id')
    serializer_class = orderSerializer

@csrf_exempt
def orderreturn(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Please re-login', 'code': '1'})

    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method', 'code': '1'})

    product = request.POST.get('product')
    reason = request.POST.get('reason')
    rimage = request.FILES.get('rimage')
    user_id = id

    userModel = get_user_model()
    print(product,reason,rimage,id)
    try:
        user = userModel.objects.get(pk=user_id)
        print(user)
        
    except userModel.DoesNotExist:
        print('except1')
        return JsonResponse({'error': 'User does not exist', 'code': '1'})

    if not product or not reason or not rimage:
        print('ifnot')
        return JsonResponse({'error': 'Missing required data', 'code': '1'})

    try:
        queryset = orderreturns.objects.create(user=user, return_product=product, return_reason=reason, product_image=rimage)
        print('try2')
        return JsonResponse({'success': True, 'Message': 'Return request placed successfully.'})
    except Exception as e:
        print('except2')
        return JsonResponse({'error': str(e), 'code': '1'})
    