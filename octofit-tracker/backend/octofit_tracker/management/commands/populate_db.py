from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from django.db import connection

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    team = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    score = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    suggested_for = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete all data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        users = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': marvel},
            {'username': 'captainamerica', 'email': 'cap@marvel.com', 'team': marvel},
            {'username': 'batman', 'email': 'batman@dc.com', 'team': dc},
            {'username': 'superman', 'email': 'superman@dc.com', 'team': dc},
        ]
        user_objs = []
        for u in users:
            user = User.objects.create_user(username=u['username'], email=u['email'], password='password')
            user_objs.append(user)

        # Activities
        Activity.objects.bulk_create([
            Activity(user='ironman', type='run', duration=30, team='Marvel'),
            Activity(user='captainamerica', type='cycle', duration=45, team='Marvel'),
            Activity(user='batman', type='swim', duration=25, team='DC'),
            Activity(user='superman', type='run', duration=60, team='DC'),
        ])

        # Leaderboard
        Leaderboard.objects.bulk_create([
            Leaderboard(user='ironman', team='Marvel', score=100),
            Leaderboard(user='captainamerica', team='Marvel', score=90),
            Leaderboard(user='batman', team='DC', score=95),
            Leaderboard(user='superman', team='DC', score=110),
        ])

        # Workouts
        Workout.objects.bulk_create([
            Workout(name='Super Strength', description='Strength workout for heroes', suggested_for='Marvel'),
            Workout(name='Flight Training', description='Aerobic workout for flyers', suggested_for='DC'),
        ])

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
