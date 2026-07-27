import random
from datetime import datetime, timedelta, date

def get_random_date(start_year: int = 2020, end_year: int = 2026) -> datetime:
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 12, 31)
    delta = end - start
    random_days = random.randrange(delta.days)
    return start + timedelta(days=random_days)

def get_random_date_between(start: date, end: date) -> date:
    if isinstance(start, datetime):
        start = start.date()
    if isinstance(end, datetime):
        end = end.date()

    delta = end - start
    if delta.days <= 0:
        return start
    random_days = random.randrange(delta.days)
    return start + timedelta(days=random_days)

def get_random_birthdate(min_age: int = 18, max_age: int = 80) -> date:
    today = date.today()
    start = date(today.year - max_age, 1, 1)
    end = date(today.year - min_age, 12, 31)
    delta = end - start
    random_days = random.randrange(delta.days)
    return start + timedelta(days=random_days)

def pick_weighted(options: list, weights: list):
    return random.choices(options, weights=weights, k=1)[0]
