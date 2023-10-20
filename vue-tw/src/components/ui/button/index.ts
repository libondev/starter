export { default as Button } from './Button.vue'

export const VARIANTS = {
  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/70 active:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/70 active:bg-destructive/90',
  ghost: 'hover:text-accent-foreground hover:bg-accent active:bg-input',
  link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80 active:text-primary/50',
  outline: 'border border-input bg-transparent shadow-sm hover:bg-accent active:bg-input hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:bg-input',
}

export const SIZES = {
  default: 'h-8 px-4 py-2',
  icon: 'h-8 w-8',
  lg: 'h-10 rounded-md px-8',
  sm: 'h-8 rounded-md px-3 text-xs',
}
