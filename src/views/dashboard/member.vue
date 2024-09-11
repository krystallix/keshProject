<template> 
  <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <div class="flex items-center">        
    </div>
    
    <Card>
      <CardHeader class="pb-2">
        <div class="flex justify-between">
          <div>
            <CardTitle>All Members</CardTitle>
            <CardDescription>Manage all members.</CardDescription>
          </div>
          <div> 
            <Dialog v-model:open="showAddMemberDialog">
              <DialogTrigger as-child>
                <Button size="sm" class="h-7 gap-1">
                  <PlusCircle class="h-3.5 w-3.5" />
                  <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Member
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Member</DialogTitle>
                  <DialogDescription>
                    Add Member to database. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                  <form @submit.prevent="handleSubmit">
                    <div class="grid w-full max-w-sm mb-2">
                      <Label class="p-2" for="name">Name</Label>
                      <Input
                        class="w-full"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        v-model="newMember.name"
                      />
                    </div>
                    <div class="grid w-full max-w-sm mb-2">
                      <Label class="p-2" for="rt">RT</Label>
                      <Select v-model="newMember.rt">
                        <SelectTrigger>
                          <SelectValue placeholder="Select RT" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>RT</SelectLabel>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div class="grid w-full max-w-sm mb-4">
                      <Label class="p-2" for="role">Role</Label>
                      <Select v-model="newMember.role">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="risma">RISMA</SelectItem>
                            <SelectItem value="risma, pengurus">Pengurus</SelectItem>
                            <SelectItem value="pra">PRA</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div class="grid w-full max-w-sm mb-2">
                      <Label class="p-2" for="phone_number">Phone</Label>
                      <Input
                        class="w-full"
                        id="phone_number"
                        name="phone_number"
                        type="number"
                        placeholder="62xxx"
                        v-model="newMember.phone_number"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable :key="dataKey" :columns="columns" :data="allData" />
      </CardContent>
    </Card>
  </main>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { onMounted, onUnmounted, ref, nextTick, computed } from 'vue';
import { PlusCircle } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DataTable from '@/components/dataTable/DataTable.vue';
import { columns } from '@/components/dataTable/data/columns';
import type { Members } from '@/components/dataTable/data/columns';
import eventBus from '@/eventBus';
import { fetchMembers, addMember } from '@/api/api'; // Import API functions

const allData = ref<Members[]>([]);
const newMember = ref({
  name: '',
  rt: '',
  role: '',
  phone_number: '',
});

const showAddMemberDialog = ref(false); // Manage dialog visibility
const dataKey = computed(() => allData.value.length);

async function loadData() {
  allData.value = await fetchMembers();
  await nextTick(); // Ensure DOM updates after data is fetched
}

async function handleSubmit() {
  try {
    await addMember(newMember.value, () => {
      showAddMemberDialog.value = false; // Close the dialog
    });
    await loadData();
    eventBus.emit('data-updated');
  } catch (error) {
    console.error('Error adding member:', error);
  }
}

onMounted(async () => {
  await loadData();
  eventBus.on('data-updated', loadData);
});

onUnmounted(() => {
  eventBus.off('data-updated', loadData);
});
</script>
