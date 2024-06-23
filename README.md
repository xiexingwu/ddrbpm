# Quickstart

## Depedencies
pnpm install

## Dev build
```shell
pnpm dev

```

## Prod build
For some reason, need to clear the build directory to continue an unsuccessful build.
```shell
rm -rf out/*
pnpm build
pnpm serve
```

# Tech Debt
- [ ] Avoid unnecessarily nested components
