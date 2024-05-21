<template>
    <section>
        <base-card>
            <div><h3> {{ teacher.price }} PLN/hr </h3></div>
            <div>  
                <p>{{ teacher.firstName}} {{ teacher.lastName }}</p>
            </div>
            <ul class="subjects">
                <base-subject  
                v-for="subject in teacher.subjects" 
                :key="subject"
                :mode="subject">
                    {{ subject }}
                </base-subject>
            </ul>
            <div class="options">
                <base-button mode="contact">
                    <router-link :to="teacherContactLink">Contact Teacher</router-link>
                </base-button>
                <base-button mode="details">
                    <router-link :to="teacherDetailsLink">Details</router-link>
                </base-button>
            </div>
        </base-card>
    </section>
</template>

<script>
import BaseSubject from '@/components/UI/BaseSubject.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseButton from '@/components/UI/BaseButton.vue'

export default {
    props: ['teacher'],
    components: {
        BaseSubject,
        BaseCard,
        BaseButton,
    },  
    computed: {
        teacherContactLink(){
            return{
                name: 'contact-teacher',
                params: { teacherId: this.teacher.id }
            }
        },
        teacherDetailsLink(){
            return{
                name: 'teacher-details',
                params: { teacherId: this.teacher.id }
            }
        },
    }
}
</script>

<style scoped>
div{
    display: inline-block;
    padding: 0 1rem;
    margin: 0 auto;
}
.options{
    margin: 1.6rem auto 1rem;
    display: flex;
    justify-content:end;
    align-items:end;
}
a{
    text-decoration: none;
    color: black;
}
.contact a {
    color: white;
}
</style>