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
import * as yup from 'yup'; 
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Icon } from '@iconify/vue'
import { useStore } from '@/store/store'
import axios from 'axios'
import { router } from '@/router/route'

const { toast } = useToast()

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

const formSchema = yup.object().shape({
    email: yup.string()
    .min(1)
    .email("This is not a valid email."),
    username: yup.string().required()
    .min(3),
    password: yup.string().required()
    .min(8),
    password_confirmation: yup.string()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  })


const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
    try {
        const response = await axios.post('http://localhost:5000/api/register', values);
        console.log('Register successful:', response.data);
        toast({
            title: 'Register successful',
            duration: 1000,
            description: 'Account Created. Please Sign In.',
        });
        // Wait for the toast to be hidden
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // After the toast is hidden, execute the router push
        router.push('/login');
    } catch (error) {
        // Handle login error
        toast({
            variant: 'destructive',
            duration: 2000, 
            title: 'Register Failed',
            description: 'Please Try again later.',
        });
    }
})

const store = useStore()

</script>

<template>
      <Toaster />
    <div class="h-screen flex justify-center items-center">
        <Card class="w-[500px]">
            <form @submit="onSubmit">
                <CardHeader>
                    <div>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Sign Up to access all of our content.</CardDescription>
                    </div>
                    <div>
                        <Button  type="button" @click="store.toggleDarkMode" variant="ghost">
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
                            <FormField v-slot="{ componentField  }" name="username">
                                <FormItem v-auto-animate>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="username" v-bind="componentField " />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </div>
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
                        <div class="flex flex-col space-y-1.5">
                            <FormField v-slot="{ componentField  }" name="password_confirmation">
                                <FormItem v-auto-animate>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="*******" v-bind="componentField " />
                                    </FormControl>
                                    <FormMessage />

                                </FormItem>
                            </FormField>
                        </div>
                    </div>
                    <div class="mt-2"></div>
                    <p class="text-sm text-muted-foreground">Already Have Account? <router-link class="underline font-semibold" to="/login">Sign In</router-link></p>
                </CardContent>
                <CardFooter class="flex justify-end px-6 pb-6">
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </form>
        </Card>
    </div>
</template>