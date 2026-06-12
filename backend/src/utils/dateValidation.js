function validateDateRange(startDate, dueDate) {
  if (new Date(startDate) > new Date(dueDate)) {
    return false;
  }

  return true;
}

module.exports = {
  validateDateRange,
};