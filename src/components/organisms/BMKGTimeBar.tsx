"use client";
import { useEffect, useState } from "react";

export default function BMKGTimeBar() {
  const [wibTime, setWibTime] = useState("");
  const [utcTime, setUtcTime] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // UTC time
      const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

      // WIB = UTC + 7 jam
      const wib = new Date(utc.getTime() + 7 * 60 * 60000);

      const formatWithSeconds = (d: Date) =>
        d.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

      setUtcTime(formatWithSeconds(utc));
      setWibTime(formatWithSeconds(wib));

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      setDateStr(wib.toLocaleDateString("id-ID", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // update tiap detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full text-xs md:text-sm px-4 py-2 flex justify-between items-center font-medium bg-[var(--bmkgblue1)] text-white">
      <span>{dateStr}</span>
      <span className="text-end">
        Standar Waktu Indonesia <br className="sm:hidden" /> | {wibTime} WIB |{" "}
        {utcTime} UTC
      </span>
    </div>
  );
}
