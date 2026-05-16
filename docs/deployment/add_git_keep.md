### This automatically adds .gitkeep to ALL empty directories.

```
find . -type d -empty -exec touch {}/.gitkeep \;
```
