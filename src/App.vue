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

function calculateQuestions() {
  let questions = 0;
  for (let i = 0;i < data.length;i++) {
    const elems = data[i].split('\n');
    for (let j = 0;j < elems.length;j++) {
      if (!(elems[j].trim() === '' || elems[j].trim().endsWith('no-question') || elems[j].trim().endsWith('】'))) {
        questions++;
      }
    }
  }
  return questions;
}
</script>

<template>
  <main>
    <p>{{ question.question }}</p>
    <button @click="showAnswer = !showAnswer" v-text="showAnswer ? '隐藏答案' : '揭晓答案'"></button>
    <button @click="newQuestion">换一道题</button>
    <p v-if="showAnswer" v-html="question.answer"></p>
  </main>

  <footer>
    共 {{ calculateQuestions() }} 道题
  </footer>
</template>

<style>
main, footer {
  text-align: center;
}

footer {
  position: absolute;
  top: 20px;
  left: 20px;
}

p, button {
  font-size: 2rem;
}
</style>
