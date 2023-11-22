from django.db import migrations
from api.user.models import CustomerUser

class Migration(migrations.Migration):
    def seed_data(apps,schema_editor):
        user = CustomerUser(name='lav',
                            email="lav@gmail.com",
                            is_staff=True,
                            is_superuser = True,
                            phone='7777872828',
                            gender='male')
        user.set_password('lav2810')
        user.save()

    dependencies  = [

    ]

    operations = [
        migrations.RunPython(seed_data),
    ]
        