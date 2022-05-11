<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import data from './assets/data';
import Highlight from './components/Highlight.vue';

interface Question {
  question: string;
  answer: string;
}

interface OneQuestion {
  knowledge: number;
  detail: number;
}

const question = ref<Question>({ question: "", answer: "" });
const showAnswer = ref(false);
const masteredQuestions = reactive<OneQuestion[]>(JSON.parse(window.localStorage.getItem('masteredQuestions') || '[]'));

let nowQuestion: OneQuestion = { knowledge: -1, detail: -1 };

newQuestion();

function newQuestion() {
  const knowledgePlace = Math.floor(Math.random() * data.length);
  const r = data[knowledgePlace];
  const elems = r.split('\n');
  const detailPlace = Math.floor(Math.random() * elems.length);
  const q = elems[detailPlace].trim();
  if (q === '' || q.endsWith('no-question') || q.endsWith('】') || isMasteredQuestion(knowledgePlace, detailPlace)) {
    if (masteredQuestions.length === calculateQuestions()) {
      alert('你已熟悉所有题目！');
    } else {
      newQuestion();
    }
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
  showAnswer.value = false;
  nowQuestion = { knowledge: knowledgePlace, detail: detailPlace };
  question.value = { question: q.replace('no-newline', ''), answer: answer.substring(5) };
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

function masterQuestion() {
  if (masteredQuestions.length === calculateQuestions()) {
    alert('你已熟悉所有题目！');
  } else {
    masteredQuestions.push(nowQuestion);
    newQuestion();
  }
}

function isMasteredQuestion(knowledgePlace: number, detailPlace: number) {
  for (const masteredQuestion of masteredQuestions) {
    if (masteredQuestion.knowledge === knowledgePlace && masteredQuestion.detail === detailPlace)
      return true;
  }
  return false;
}

function restart() {
  masteredQuestions.length = 0;
}

watch(masteredQuestions, value => {
  window.localStorage.setItem('masteredQuestions', JSON.stringify(value));
});
</script>

<template>
  <main>
    <p>{{ question.question }}</p>
    <button @click="showAnswer = !showAnswer" v-text="showAnswer ? '隐藏答案' : '揭晓答案'"></button>
    <button @click="newQuestion">换一道题</button>
    <button @click="masterQuestion">非常熟悉</button>
    <button @click="restart">重新来过</button>
    <!-- <p v-if="showAnswer" v-html="question.answer"></p> -->
    <Highlight :html="question.answer" :high-text="question.question" v-if="showAnswer" />
  </main>

  <footer>
    共 {{ calculateQuestions() }} 道题{{ masteredQuestions.length === 0 ? `` : `，已熟悉 ${masteredQuestions.length} 道题` }}
  </footer>
</template>

<style>
main {
  padding-top: 35px;
  text-align: center;
}

footer {
  position: absolute;
  top: 10px;
  left: 20px;
}

p, button {
  font-size: 2rem;
}

p {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
