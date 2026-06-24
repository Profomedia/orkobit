from django.core.cache import cache


def get_cached(key: str):
  return cache.get(key)

def set_cache(key: str, value, timeout: int=300):
  cache.set(key, value, timeout)

def delete_cached(key: str):
  cache.delete(key)