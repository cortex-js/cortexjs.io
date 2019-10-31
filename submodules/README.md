
## To create a submodule:
```bash
git submodule add -b master git@github.com:cortex-js/<PROJECT>.git submodules/<DIRECTORY>
git submodule init
```
**Note**: git tracks the submodules in a `./.gitmodules` files

## To get submodule
After doing a check-out of the parent project, for example.
```bash
git submodule init
```
Alternatively, use the `--recursive` option when cloning:
(`--jobs 8` requests parallel installs to take place)
```
git clone --recursive --jobs 8 <URL TO GIT REPO>
```
## To pull changes in the main module and the submodules
```bash
git pull --recurse-submodules
```

## To manually update the submodule
```bash
git submodule update --remote
```
