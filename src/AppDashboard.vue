<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <Sidebar />
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger as-child>
            <Button size="icon" variant="outline" class="sm:hidden">
              <PanelLeft class="h-5 w-5" />
              <span class="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="sm:max-w-xs">
            <nav class="grid gap-6 text-lg font-medium">
              <router-link
                to="/dashboard"
                class="group flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                :class="{ 'active': isActive('/dashboard') }"
              >
                <Home class="h-5 w-5" />
                Dashboard
              </router-link>
              <router-link
                to="/dashboard/member"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                :class="{ 'active': isActive('/dashboard/member') }"
              >
                <Users2 class="h-5 w-5" />
                Member
              </router-link>
              <router-link
                to="/dashboard/generate-document"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                :class="{ 'active': isActive('/dashboard/generate-document') }"
              >
                <FileText class="h-5 w-5" />
                Generate Document
              </router-link>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Settings class="h-5 w-5" />
                Settings
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb class="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem v-for="(crumb, index) in breadcrumbs" :key="index">
              <BreadcrumbLink :as-child="index < breadcrumbs.length - 1">
                <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">{{ crumb.label }}</router-link>
                <span v-else>{{ crumb.label }}</span>
              </BreadcrumbLink>
              <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="relative ml-auto flex-1 md:grow-0">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute for accessing route info
import Sidebar from './components/Sidebar.vue';
import {
  CircleUser,
  File,
  Home,
  PanelLeft,
  Search,
  Settings,
  Users2,
  FileText
} from 'lucide-vue-next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const route = useRoute();

const isActive = (path: string) => route.path === path;

const breadcrumbs = computed(() => {
  const path = route.path;
  const segments = path.split('/').filter(segment => segment);
  
  return segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize the first letter

    return { path, label };
  });
});
</script>

<style scoped>
nav a.active {
  background-color: var(--primary-color);
  color: var(--primary-foreground-color);
}
</style>
