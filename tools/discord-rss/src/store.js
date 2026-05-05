const fs = require('node:fs');
const path = require('node:path');

function ensureParent(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readMessages(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeMessages(filePath, messages) {
  ensureParent(filePath);
  fs.writeFileSync(filePath, `${JSON.stringify(messages, null, 2)}\n`, 'utf8');
}

function upsertMessage(filePath, message) {
  const messages = readMessages(filePath);
  if (messages.some((item) => item.message_id === message.message_id)) {
    return false;
  }

  messages.unshift(message);
  writeMessages(filePath, messages.slice(0, 200));
  return true;
}

module.exports = {
  readMessages,
  upsertMessage,
  writeMessages,
};
