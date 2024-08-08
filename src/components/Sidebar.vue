<template>
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav class="flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <router-link
                to="/dashboard"
                class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                active-class="active"
              >
                <Home class="h-4 w-4 transition-all group-hover:scale-110" />
                <span class="sr-only">Dashboard</span>
              </router-link>
            </TooltipTrigger>
            <TooltipContent side="right">
              Dashboard
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
  
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <router-link
                to="/dashboard/member"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                active-class="active"
              >
                <Users2 class="h-5 w-5" />
                <span class="sr-only">Member</span>
              </router-link>
            </TooltipTrigger>
            <TooltipContent side="right">
              Member
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
  
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <router-link
                to="/dashboard/generate-document"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                active-class="active"
              >
                <FileText class="h-5 w-5" />
                <span class="sr-only">Generate Document</span>
              </router-link>
            </TooltipTrigger>
            <TooltipContent side="right">
              Generate Document
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings class="h-5 w-5" />
                <span class="sr-only">Settings</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  </template>
  
  <script setup lang="ts">
  import { Home, Users2, FileText, Settings } from 'lucide-vue-next';
  import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
  </script>
  
  <style scoped>
  nav a.active {
    background-color: var(--primary-color);
    color: var(--primary-foreground-color);
  }
  </style>
  