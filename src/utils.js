const uuidRegex = /^[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}$/i;

// Validates a UUID to ensure it has the correct format
function validateUuid(uuid) {
  return uuidRegex.test(uuid);
}

module.exports = {
  validateUuid
};
