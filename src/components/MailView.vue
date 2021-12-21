<template>
  <div class="email-display">
    <div>
      <button
        @click="toggleArchive"
      >{{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}</button>
      <button
        @click="toggleRead"
      >{{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</button>
      <button @click="goNewer">Newer (k)</button>
      <button @click="goOlder">Older (j)</button>
    </div>
    <h2 class="mb-0">
      Subject:
      <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em>From {{ email.from }} on {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</em>
    </div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<script>
import { format } from 'date-fns'
import { marked } from 'marked'
import useKeydown from '../composables/use-keydown'

export default {
  setup(props, { emit }) {
    const toggleRead = () => { emit('changeEmail', { toggleRead: true, save: true }) }
    const toggleArchive = () => { emit('changeEmail', { toggleArchive: true, save: true, closeModal: true }) }
    const goNewer = () => { emit('changeEmail', { changeIndex: -1 }) }
    const goOlder = () => { emit('changeEmail', { changeIndex: 1 }) }
    const goNewerAndArchive = () => { emit('changeEmail', { changeIndex: -1, toggleArchive: true, save: true }) }
    const goOlderAndArchive = () => { emit('changeEmail', { changeIndex: 1, toggleArchive: true, save: true }) }

    useKeydown([
      { key: 'r', fn: toggleRead },
      { key: 'e', fn: toggleArchive },
      { key: 'k', fn: goNewer },
      { key: 'j', fn: goOlder },
      { key: '[', fn: goNewerAndArchive },
      { key: ']', fn: goOlderAndArchive }
    ])

    return {
      format,
      marked,
      toggleRead,
      toggleArchive,
      goNewer,
      goOlder,
    }
  },
  props: {
    email: {
      type: Object,
      required: true
    }
  }
}
</script>

