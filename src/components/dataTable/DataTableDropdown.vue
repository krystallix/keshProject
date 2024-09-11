<script setup lang="ts">
import { h } from 'vue';
import { MoreHorizontal } from 'lucide-vue-next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ref } from 'vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateMember, deleteMember } from '@/api/api'; // Import the updateMember function

const props = defineProps<{
  id: number;
  name: string;
  rt: string;
  role: string;
  phone_number: string;
}>();

const isEditDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);

const formData = ref({
  id: props.id,
  name: props.name,
  rt: props.rt,
  role: props.role,
  phone_number: props.phone_number,
});

function onSubmit(event: Event) {
  event.preventDefault();
  
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  updateMember(formData, () => {
    isEditDialogOpen.value = false;
  });
}

function deleteSubmit(event: Event) {
  event.preventDefault();
  console.log("test del func")
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  console.log("execute delete func")
  deleteMember(formData, () => {
    isDeleteDialogOpen.value = false;
  });
}
</script>


<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="isEditDialogOpen = true">
        Edit Member
      </DropdownMenuItem>
      <DropdownMenuItem @click="isDeleteDialogOpen = true">
        Delete Member
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
  
  <!-- Edit Member Dialog -->
  <Dialog v-model:open="isEditDialogOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Members</DialogTitle>
      </DialogHeader>
      
      <form @submit="onSubmit">
        <div class="grid w-full max-w-sm mb-2">
          <Label class="p-2" for="id">ID</Label>
          <Input
          class="w-full"
          id="id"
          name="id"
          type="text"
          v-model="formData.id"
          readonly
          />
        </div>
        <div class="grid w-full max-w-sm mb-2">
          <Label class="p-2" for="name">Name</Label>
          <Input
          class="w-full"
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          v-model="formData.name"
          />
        </div>
        <div class="grid w-full max-w-sm mb-2">
          <Label class="p-2" for="rt">RT</Label>
          <Select v-model="formData.rt">
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
          <!-- Hidden input for RT -->
          <input type="hidden" name="rt" :value="formData.rt">
        </div>
        
        <div class="grid w-full max-w-sm mb-4">
          <Label class="p-2" for="role">Role</Label>
          <Select v-model="formData.role">
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
          <div class="grid w-full max-w-sm mb-2">
            <Label class="p-2" for="phone_number">Phone</Label>
            <Input
            class="w-full"
            id="phone_number"
            name="phone_number"
            type="number"
            placeholder="phone_number"
            v-model="formData.phone_number"
            />
          </div>
          <!-- Hidden input for Role -->
          <input type="hidden" name="role" :value="formData.role">
        </div>
        <DialogFooter>
          <Button type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </form>
      
    </DialogContent>
  </Dialog>
  
  <!-- Delete Member Dialog -->
  <Dialog v-model:open="isDeleteDialogOpen">
    
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Member</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this member? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <form @submit="deleteSubmit">
        <Input
            class="w-full"
            id="id"
            name="id"
            type="hidden"
            v-model="formData.id"
            />
      <DialogFooter>
        <Button variant="outline" @click="isDeleteDialogOpen = false">Cancel</Button>
        <Button type="submit">
          Delete
        </Button>
      </DialogFooter>
    </form>

    </DialogContent>
  </Dialog>
</template>
