<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
</script>

<template>
  <p>
    adsad

    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis recusandae magni commodi debitis temporibus libero iure nisi fugit? Pariatur, adipisci? Nulla, laudantium totam accusantium accusamus ipsa modi nostrum doloremque laborum!
  </p>

  <a href="https://baidu.com">123123</a>
  <h1>123</h1>
  <h2>123</h2>
  <h3>123</h3>
  <h4>123</h4>
  <h5>123</h5>

  <ul>
    <li>12312</li>
    <li>12312</li>
    <li>12312</li>
    <li>12312</li>
  </ul>

  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button>
        Show Dialog
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
