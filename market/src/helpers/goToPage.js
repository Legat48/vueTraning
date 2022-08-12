import eventBus from '@/eventBus';

export default function goToPage(pageName, pageParam) {
  eventBus.$emit('goToPage', pageName, pageParam);
}
