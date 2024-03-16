<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref, onMounted } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { useToast } from '@/components/ui/toast/use-toast';
import { useStore } from '@/store/store';
import UserNav from './components/Usernav.vue'
import { Icon } from '@iconify/vue'
import { ChevronsUpDown } from 'lucide-vue-next'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const isOpen = ref(false);

const isOpenSidebar = ref(true);
const isMobileVisible = ref(false);

const toggleSidebar = () => {
  isOpenSidebar.value = !isOpenSidebar.value;
  if (isOpenSidebar.value) {
    isMobileVisible.value = true; // Show mobile sidebar when sidebar is opened
  } else {
    isMobileVisible.value = false; // Hide mobile sidebar when sidebar is closed
  }
};
interface User {
  token: string;
  name: string;
  email: string;
  data?: { // Make 'data' optional
    token: string;
    name: string;
    email: string;
  };
}
const store = useStore();
const { toast } = useToast();
const route = useRoute();
const welcomeMessage = ref<string | null>(null);



onMounted(() => {
  if (route.name === 'dashboard') {
    const user = store.user;

    if (!user) {
      const storedUserState = localStorage.getItem('userState');

      if (storedUserState) {
        store.loginUser(JSON.parse(storedUserState));
      }
    }

    const userData = (user as { token: string; name: string; email: string; data?: { token: string; name: string; email: string; } }).data || { token: '', name: '', email: '' }; // Access user.data using type assertion
    const username = userData.name ?? '';

    welcomeMessage.value = `Hello, ${username}!`;

    toast({
      title: welcomeMessage.value,
      duration: 2000,
    });
  }
});
</script>

<template>
  <div>
    <Toaster />
    <RouterView />
    <div class="border-t">
      <div class="bg-background">
        <div class="h-screen flex lg:flex-row md:flex-col sm:flex-col xs:flex-col">
          <div v-if="isOpenSidebar || isMobileVisible" class="lg:w-1/5 sm:w-full xs:w-full lg:block border-r border-1">
            <div class=" px-2 pt-4">
              <div class="px-3 py-2">
                <div class="flex justify-between align-middle">
                  <div>
                    <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight"> KeshProject </h2>
                  </div>
                  <div>
                    <div class="lg:hidden md:block sm:block">
                      <Button variant="ghost" @click="toggleSidebar"
                        class="hover:bg-accent hover:text-accent-foreground hover:text-gray-700">
                        <Icon icon="mynaui:x" class="mr-2 h-8 w-8 text-currentColor"></Icon>
                      </Button>
                    </div>
                  </div>
                </div>
                <div class="space-y-1">
                  <Button variant="ghost"
                    class="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Icon icon="mynaui:grid" class="mr-2 h-4 w-4 text-currentColor"></Icon>
                    Dashboard
                  </Button>
                </div>
                <div class="space-y-1">
                  <Collapsible v-model:open="isOpen" class="">
                    <div class="flex items-center justify-between">
                      <Button variant="ghost"
                        class="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                        <Icon icon="mynaui:users" class="mr-2 h-4 w-4 text-currentColor"></Icon>
                        List Member
                      </Button>
                      <CollapsibleTrigger as-child>
                        <Button variant="ghost" size="sm" class="w-9 p-0">
                          <ChevronsUpDown class="h-4 w-4" />
                          <span class="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent class="space-y-2" style="padding-left: 1.4rem">
                      <Button variant="ghost"
                        class="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                        List RISMA
                      </Button> <Button variant="ghost"
                        class="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                        List Pengurus
                      </Button>
                      <Button variant="ghost"
                        class="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                        List Pra
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
              <div class="px-3 py-2">
                <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight"> Document </h2>
                <div class="space-y-1">
                  <Button variant="ghost"
                    class="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
                    <Icon icon="mynaui:file-text" class="mr-2 h-4 w-4 text-currentColor"></Icon>
                    Generate Document
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col px-4 py-4 w-full">
            <div class="lg:block w-full">
              <div :class="{ 'lg:flex lg:justify-between lg:w-full md:hidden xs:hidden sm:hidden': isOpenSidebar, 'flex justify-between sm:flex-row-reverse lg:flex-row': !isOpenSidebar }">
                <Button variant="ghost" @click="toggleSidebar"
                  :class="{ 'lg:float-left xs:float-right sm:float-right': !isOpenSidebar }"
                  class="hover:bg-accent hover:text-accent-foreground hover:text-gray-700">
                  <Icon icon="mynaui:text-align-left" class="mr-2 h-8 w-8 text-currentColor"></Icon>
                </Button>
                <UserNav />
              </div>
            </div>
            <div class="px-3 py-4 w-full">
              <p class="font-weight">
                {{ welcomeMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
