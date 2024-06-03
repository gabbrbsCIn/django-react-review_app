from rest_framework import serializers
from .models import Revision

class RevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revision
        fields = ['id', 'title', 'text', 'user_id']
        read_only_fields = ['user_id']