type OpeningHour = {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function OpeningHours({ hours }: { hours: OpeningHour[] }) {
  return (
    <div className="space-y-2">
      {days.map((day, dayOfWeek) => {
        const periods = hours
          .filter((h) => h.dayOfWeek === dayOfWeek)
          .sort((a, b) => a.openTime.localeCompare(b.openTime));

        return (
          <div
            key={day}
            className="flex justify-between gap-4 text-secondary-foreground"
          >
            <span className="font-medium">{day}</span>

            <div className="text-right">
              {periods.length === 0 ? (
                <span className="text-muted-foreground">Closed</span>
              ) : (
                periods.map((period, index) => (
                  <div key={index}>
                    {period.openTime} – {period.closeTime}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
