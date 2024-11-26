from django.db import models

class Book(models.Model):
      title = models.CharField(max_length=50)
      release_year = models.IntegerField()

      def _str_(self):
          return self.title
