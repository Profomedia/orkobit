# VERY IMPORTANT

After creating .sh files:

Run:

``` chmod +x scripts/setup/*.sh```

### This makes scripts executable.

### Then You Run
```./scripts/setup/bootstrap.sh```

### That’s your Linux-native bootstrap flow.


# If globstar fails:

```find scripts -name "*.sh" -exec chmod +x {} \;```

<!-- ================== -->

### Then Usage Becomes
## Bootstrap
```
./scripts/setup/bootstrap.sh
```

## Backend Shell
```
./scripts/dev/backend-shell.sh
```

##Frontend Shell
```
./scripts/dev/frontend-shell.sh
```

## Deploy
```
./scripts/deploy/deploy-prod.sh
```

## Backup DB
```
./scripts/backup/db-backup.sh
```