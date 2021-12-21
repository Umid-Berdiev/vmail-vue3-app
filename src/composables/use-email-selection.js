import Axios from "axios";
import { reactive } from "vue";

const emails = reactive(new Set());
const useEmailSelection = function() {
  const toggle = function(email) {
    if (emails.has(email)) emails.delete(email);
    else emails.add(email);
  };

  const clear = function() {
    emails.clear();
  };

  const addMultiple = function(newEmails) {
    newEmails.forEach(email => emails.add(email));
  };

  const forSelected = fn => {
    emails.forEach(email => {
      fn(email);
      Axios.put(`http://localhost:3000/emails/${email.id}`, email);
    });
  };

  const markRead = () => forSelected(email => (email.read = true));

  const markUnread = () => forSelected(email => (email.read = false));

  const archive = () => {
    forSelected(email => (email.archived = true));
    clear();
  };

  return {
    emails,
    toggle,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive
  };
};

export default useEmailSelection;
