<template>
  <layout-default>
    <v-text-field
      :value="search"
      clearable
      type="search"
      prepend-inner-icon="mdi-magnify"
      label="Search"
      @click:clear="search = ''"
      @click:prepend-inner="onSearch"
      @focus="$event.target.select()"
      @keyup.enter.exact="search = $event.target.value"
    />
    <h1>1997 FREQUENTLY ASKED QUESTIONS</h1>
    <p><small>(recreated from the original 1997 USPC website FAQ's)</small></p>
    <v-expansion-panels
      v-model="oldQuestion"
      accordion
      class="mb-4"
    >
      <v-expansion-panel
        v-for="item in filteredOldQuestions"
        :key="item.question"
        ref="oldQuestion"
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
    <v-expansion-panels
      v-model="newQuestion"
      accordion
    >
      <v-expansion-panel
        v-for="item in filteredNewQuestions"
        :key="item.question"
        ref="newQuestion"
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

import oldQuestions from '~/config/faq/old.json';
import newQuestions from '~/config/faq/new.json';

export default {
  name: 'PageFAQ',

  data() {
    const {
      o,
      n
    } = this.$route.query;

    return {
      oldQuestions,
      newQuestions,
      search: this.$route.query.q ?? '',
      oldQuestion: o >= 0 ? Number(o) : undefined,
      newQuestion: n >= 0 ? Number(n) : undefined
    };
  },

  head: () => ({
    title: 'FAQ'
  }),

  computed: {
    routeQuery() {
      return {
        q: this.search || undefined,
        o: this.oldQuestion >= 0 ? this.oldQuestion : undefined,
        n: this.newQuestion >= 0 ? this.newQuestion : undefined
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
  },

  watch: {
    search() {
      this.oldQuestion = undefined;
      this.newQuestion = undefined;
    },

    routeQuery(query) {
      const { route } = this.$router.resolve({
        query
      });

      if (route.fullPath !== this.$route.fullPath) {
        this.$router.replace(route);
      }
    }
  },

  mounted() {
    if (this.oldQuestion >= 0) {
      this.$vuetify.goTo(this.$refs.oldQuestion[this.oldQuestion]);
    } else {
      if (this.newQuestion >= 0) {
        this.$vuetify.goTo(this.$refs.newQuestion[this.newQuestion]);
      }
    }
  },

  methods: {
    onSearch(event) {
      const input = event.target.closest('.v-input').querySelector('input');

      this.search = input?.value ?? '';
    }
  }
}
</script>

<style lang="scss" scoped>
.v-expansion-panel-header {
  line-height: 1.5rem;
}
</style>
