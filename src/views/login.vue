<script setup lang="ts">
import { h } from 'vue'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Icon } from '@iconify/vue'
const { toast } = useToast()
import axios from 'axios';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

const formSchema = yup.object().shape({
    email: yup.string().required()
    .email("This is not a valid email."),
    password: yup.string().required()
    .min(8),
  })
const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
    try {
        const response = await axios.post('http://localhost:5000/api/login', values);
        toast({
            title: 'Login successful',
            duration: 1000,
            description: 'You have successfully logged in.',
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        store.loginUser(response.data);
        router.push('/');
    } catch (error) {
        // Handle login error
        toast({
            variant: 'destructive',
            duration: 2000, 
            title: 'Login failed',
            description: 'Check your email or password',
        });
    }
})

import { useStore } from '@/stores/store'
import { router } from '@/router/route'
const store = useStore()

</script>

<template>
      <Toaster />
    <div class="h-screen flex justify-center items-center">
        <Card class="w-[500px]">
            <form @submit="onSubmit">
                <CardHeader>
                    <div>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>Sign In to access all of our content.</CardDescription>
                    </div>
                    <div>
                        <Button type="button" @click="store.toggleDarkMode" variant="ghost">
                            <Icon icon="radix-icons:moon"
                                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Icon icon="radix-icons:sun"
                                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="grid items-center w-full gap-4">
                        <div class="flex flex-col space-y-1.5">
                            <FormField v-slot="{ componentField  }" name="email">
                                <FormItem v-auto-animate>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="email@mail.com" v-bind="componentField " />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <FormField v-slot="{ componentField  }" name="password">
                                <FormItem v-auto-animate>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="*******" v-bind="componentField " />
                                    </FormControl>
                                    <FormMessage />

                                </FormItem>
                            </FormField>
                        </div>
                    </div>
                    <div class="mt-2"></div>
                    <p class="text-sm text-muted-foreground">Dont Have Account? <router-link class="underline font-semibold" to="/register">Sign Up</router-link></p>
                </CardContent>
                <CardFooter class="flex justify-end px-6 pb-6">
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </form>
        </Card>
    </div>
</template>