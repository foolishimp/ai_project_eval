// Cucumber.js Configuration
// cucumber.js

module.exports = {
  default: {
    require: [
      'claude_tasks/behaviors/step_definitions/**/*.js'
    ],
    format: [
      'progress-bar',
      'html:claude_tasks/behaviors/reports/cucumber_report.html',
      'json:claude_tasks/behaviors/reports/cucumber_report.json'
    ],
    paths: [
      'claude_tasks/behaviors/features/**/*.feature'
    ],
    parallel: 2
  }
};