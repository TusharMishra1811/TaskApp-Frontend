export const formatTime = (time) => {
  const date = new Date(time);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
