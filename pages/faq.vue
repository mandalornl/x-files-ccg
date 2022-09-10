<template>
  <layout-default>
    <v-text-field
      :value="search"
      clearable
      type="search"
      prepend-inner-icon="mdi-magnify"
      label="Search"
      @click:clear="search = ''"
      @keyup.enter.exact="search = $event.target.value"
    />
    <h1>1997 FREQUENTLY ASKED QUESTIONS</h1>
    <p><small>(recreated from the original 1997 USPC website FAQ's)</small></p>
    <v-expansion-panels
      accordion
      class="mb-4"
    >
      <v-expansion-panel
        v-for="item in filteredOldQuestions"
        :key="item.question"
      >
        <v-expansion-panel-header>
          <text-pre-line
            :highlight="search"
            tag="div"
          >
            {{ item.question }}
          </text-pre-line>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <text-pre-line
            :highlight="search"
            tag="div"
          >
            {{ item.answer }}
          </text-pre-line>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <h2>2021 FREQUENTLY ASKED QUESTIONS</h2>
    <p><small>(created to support the first XFCCG virtual tournament)</small></p>
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="item in filteredNewQuestions"
        :key="item.question"
      >
        <v-expansion-panel-header>
          <text-pre-line
            :highlight="search"
            tag="div"
          >
            {{ item.question }}
          </text-pre-line>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <text-pre-line
            :highlight="search"
            tag="div"
          >
            {{ item.answer }}
          </text-pre-line>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </layout-default>
</template>

<script>
import escapeRegExp from 'lodash/escapeRegExp';

import {
  oldQuestions,
  newQuestions
} from '~/config/faq'

export default {
  name: 'PageFAQ',

  data: () => ({
    oldQuestions,
    newQuestions
  }),

  head: () => ({
    title: 'FAQ'
  }),

  computed: {
    search: {
      get() {
        return this.$route.query.q ?? '';
      },
      set(value) {
        this.$router.replace({
          query: {
            ...this.$route.query,
            q: value || undefined
          }
        });
      }
    },

    regX() {
      if (!this.search) {
        return null;
      }

      return new RegExp(`(${escapeRegExp(this.search)})`, 'i');
    },

    filteredOldQuestions() {
      if (!this.regX) {
        return this.oldQuestions;
      }

      return this.oldQuestions.filter(({
        question,
        answer
      }) => this.regX.test(question) || this.regX.test(answer));
    },

    filteredNewQuestions() {
      if (!this.regX) {
        return this.newQuestions;
      }

      return this.newQuestions.filter(({
        question,
        answer
      }) => this.regX.test(question) || this.regX.test(answer));
    }
  }
}
</script>

<style lang="scss" scoped>
.v-expansion-panel-header {
  line-height: 1.5rem;
}
</style>
