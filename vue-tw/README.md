
router
```
src/pages/
├── index.vue
├── about.vue
└── users/
    ├── index.vue
    └── [id].vue
```

This will generate the following routes:

`/`: -> renders the `index.vue` component\
`/about`: -> renders the `about.vue` component\
`/users`: -> renders the `users/index.vue` component\
`/users/:id`: -> renders the `users/[id].vue` component. `id` becomes a route param.
