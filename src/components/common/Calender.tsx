import {
  eachDayOfInterval,
  endOfYear,
  startOfYear,
  getDay,
  startOfDay,
} from "date-fns";

function Calendar() {
  const currentDate = new Date();
  const firstDay = startOfYear(currentDate);
  const lastDay = endOfYear(currentDate);

  const daysInYear = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  const startingDayIndex = getDay(firstDay);

  return (
    <div>
      <div>
        <h1 className="flex justify-center text-6xl font-bold">
          {currentDate.getFullYear()}
        </h1>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="rounded border p-4">
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {/* Empty days */}
            {Array.from({ length: startingDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="h-4 w-4"></div>
            ))}
            {/* Days in the year */}
            {daysInYear.map((day) => {
              const activeColor =
                startOfDay(day).getTime().toString() ===
                startOfDay(currentDate).getTime().toString()
                  ? "bg-blue-300"
                  : "bg-green-200";
              return (
                <div
                  key={day.toISOString()}
                  className={`flex h-4 w-4 items-center justify-center rounded ${activeColor} text-sm`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
