<script setup lang="ts">
import { ref } from 'vue';
import data from './assets/data';

interface Question {
  question: string;
  answer: string;
}

const question = ref<Question>({ question: "", answer: "" });
const showAnswer = ref(false);

newQuestion();

function newQuestion() {
  const r = data[Math.floor(Math.random() * data.length)];
  const elems = r.split('\n');
  const q = elems[Math.floor(Math.random() * elems.length)].trim();
  if (q === '' || q.endsWith('no-question') || q.endsWith('】')) {
    newQuestion();
    return;
  }

  let answer = '';
  for (let i = 0;i < elems.length;i++) {
    elems[i] = elems[i].trim().replace('no-question', '');
    if (answer.endsWith('，') || answer.endsWith('】') || elems[i].startsWith('no-newline'))
      answer += elems[i].replace('no-newline', '');
    else
      answer += `<br/>${elems[i]}`;
  }
  question.value = { question: q.replace('no-newline', ''), answer: answer };
}
</script>

<template>
  <main>
    <p>{{ question.question }}</p>
    <button @click="showAnswer = !showAnswer" v-text="showAnswer ? '隐藏答案' : '揭晓答案'"></button>
    <button @click="newQuestion">换一道题</button>
    <p v-if="showAnswer" v-html="question.answer"></p>
  </main>
</template>

<style>
main {
  text-align: center;
}

p, button {
  font-size: 2rem;
}
</style>
