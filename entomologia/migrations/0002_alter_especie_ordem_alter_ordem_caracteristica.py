# Generated by Django 5.1.6 on 2025-04-15 15:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entomologia', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='especie',
            name='ordem',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='especies', to='entomologia.ordem'),
        ),
        migrations.AlterField(
            model_name='ordem',
            name='caracteristica',
            field=models.ManyToManyField(blank=True, related_name='caracteristica', to='entomologia.caracteristica'),
        ),
    ]
