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

  <img src="data:image/jpeg;base64,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" alt="">

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
