module.exports = {
  disableEmoji: false,
  list: ["test", "feat", "fix", "chore", "docs", "ci", "perf"],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ["type", "scope", "subject", "body"],
  scopes: [],
  types: {
    chore: {
      description: "项目架构调整",
      emoji: "🤖",
      value: "chore",
    },
    docs: {
      description: "文档更新",
      emoji: "✏️",
      value: "docs",
    },
    feat: {
      description: "开发一个新功能",
      emoji: "🎸",
      value: "feat",
    },
    fix: {
      description: "修复bug",
      emoji: "🐛",
      value: "fix",
    },
    perf: {
      description: "A code change that improves performance",
      emoji: "⚡️",
      value: "perf",
    },
    test: {
      description: "Adding missing tests",
      emoji: "💍",
      value: "test",
    },
  },
};
