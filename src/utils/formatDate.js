const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export function formatDateToDDMMYYYY(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export { capitalizeFirstLetter, generateRandomId };
