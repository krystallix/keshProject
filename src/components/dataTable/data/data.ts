import { User, Users, PersonStanding} from 'lucide-vue-next'
import { h } from 'vue'

export const roles = [
    {
        value: 'risma',
        label: 'RISMA',
        icon: h(User),
    },
    {
        value: 'risma, pengurus',
        label: 'Pengurus',
        icon: h(Users),
    },
    {
        value: 'pra',
        label: 'PRA',
        icon: h(PersonStanding),
    },
]