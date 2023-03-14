export default function formatDate(date) {
  const formattedDate = new Date(date);
  const [day, month, year, hours, minutes] = [
    formattedDate.getDate(),
    formattedDate.getMonth(),
    formattedDate.getFullYear(),
    formattedDate.getHours(),
    formattedDate.getMinutes(),
  ];
  return (
    <div>
      <small>
        {day}/{month}/{year}
      </small>{" "}
      <small>
        ({hours}:{minutes})
      </small>
    </div>
  );
}
