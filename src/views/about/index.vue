<template>
  <div class="about">
    <section>
      <h1 align="center">该模版集成以下内容</h1>
    </section>
    <section class="list">
      <section class="row">
        <section class="item">
          <li>Vue 3</li>
          <li>Vue Router</li>
          <li>Vite</li>
          <li>Vitest</li>
          <li>Pinia</li>
          <li>TypeScript</li>
        </section>
        <section class="item">
          <li>Sass/Scss</li>
          <li>PostCss</li>
          <li>Normalize.css</li>
          <li>Element Plus</li>
          <li>Iconify</li>
        </section>
      </section>
      <section class="row">
        <section class="item">
          <li>Axios</li>
          <li>Crypto.js</li>
          <li>Day.js</li>
          <li>Decimal.js</li>
          <li>Lodash</li>
        </section>
        <section class="item">
          <li>pnpm (-g)</li>
          <li>Eslint</li>
          <li>Prettier</li>
          <li>Commit Lint</li>
          <li>CSpell</li>
          <li>Husky</li>
          <li>lint-staged</li>
          <li>Docker & Nginx Config</li>
          <li>Git & GitHub Action CI (With Jenkins)</li>
        </section>
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}

.list {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  justify-content: center;
  align-items: center;

  .row {
    .item {
      margin: 2rem;
    }
  }
}
</style>
