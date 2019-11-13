exports.config = {
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  baseUrl: 'https://testing-angular-applications.github.io',
  framework: 'jasmine',
  specs: [
    './e2e/add-*contact.e2e-spec.ts'
  ],
  onPrepare: () => {
    require('ts-node').register({
      project: 'e2e'
    });
  }
}