# vue-project

## router
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

## Icons
https://github.com/unplugin/unplugin-icons

<!-- 图标集通过 <ISolarSun /> 使用(前缀为 I, Solar 为集合, Sun 为图标名) -->
https://icon-sets.iconify.design/solar/
https://icon-sets.iconify.design/carbon/

<!-- 图标库通过 <IGdsAccessibility /> 使用(前缀为 I, Gds 为集合, Accessibility 为图标名) -->
https://vercel.com/geist/icons

### Add local svg icon
 - copy file to `src/icons/*/file.svg`
 - run `npm run format:icons file`

## CSS
https://tailwindcss.com/
