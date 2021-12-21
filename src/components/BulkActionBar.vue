<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allEmailsSelected"
        :class="[someEmailSelected ? 'partial-check' : '']"
        @click="bulkSelect"
      />
    </span>
    <span class="buttons">
      <button
        @click="emailSelection.markRead"
        :disabled="[...emailSelection.emails].every(email => email.read)"
      >Mark Read</button>
      <button
        @click="emailSelection.markUnread"
        :disabled="[...emailSelection.emails].every(email => !email.read)"
      >Mark Unread</button>
      <button
        @click="emailSelection.archive"
        :disabled="emailSelection.emails.size === 0"
      >Archive</button>
    </span>
  </div>
</template>

<script>
import { computed } from "vue"
import useEmailSelection from "../composables/use-email-selection"

export default {
  setup(props) {
    let numberEmails = computed(() => props.emails.length)
    const emailSelection = useEmailSelection()
    let numberSelected = computed(() => emailSelection.emails.size)
    let allEmailsSelected = computed(() => numberSelected.value === numberEmails.value)
    let someEmailSelected = computed(() => numberSelected.value > 0 && numberSelected.value < numberEmails.value)

    const bulkSelect = function () {
      if (allEmailsSelected.value)
        emailSelection.clear()
      else emailSelection.addMultiple(props.emails)
    }
    return {
      allEmailsSelected,
      someEmailSelected,
      bulkSelect,
      emailSelection
    }
  },
  props: {
    emails: {
      type: Array,
      required: true
    }
  }
}
</script>
