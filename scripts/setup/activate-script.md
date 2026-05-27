### FASTEST FIX (inside WSL/bash)

Run this:

``` sed -i 's/\r$//' scripts/setup/init-frontend.sh```

Then:

```chmod +x scripts/setup/init-frontend.sh```

Then run:

```make frontend-i```