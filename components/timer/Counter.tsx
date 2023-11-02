"use client";
import { useEffect, useState } from "react";
import { calculateTimeLeft } from "@/utils/TimeCounter";

import "./timer-styles.css";

type Props = {
    endDate: {
        $date: string;
    };
};
export const Counter = (props: Props) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // console.log("endDate",props?.endDate.$date);
        // let date = new Date(props?.endDate);
        // let year = date.getFullYear();
        // let month = date.getMonth() + 1;
        // let day = date.getDate();
        // const endDate = new Date(`${year}-${month}-${day}`);

        // console.log(day);

        if (!props?.endDate) return;

        // setTimeout(() => setTimeLeft(calculateTimeLeft(new Date(props?.endDate))), 1000);

        const timer = setInterval(() => {
            // console.log("timeLeft", timeLeft, props?.endDate);
            // const obj = new Date(new Date(props?.endDate?.$date).getUTCMilliseconds() - new Date().getUTCMilliseconds());
            setTimeLeft(calculateTimeLeft(new Date(props?.endDate.$date)));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, props?.endDate]);

    return (
        <div className="counter">
            <div className="counter-item bg-mobile">
                <span className="value">
                    {String(timeLeft?.days)?.padStart(2, "0")}
                </span>
                <span className="label">Days</span>
            </div>

            <div className="counter-item bg-mobile">
                <span className="value">
                    {String(timeLeft?.hours)?.padStart(2, "0")}
                </span>
                <span className="label">Hours</span>
            </div>

            <div className="counter-item bg-mobile">
                <span className="value">
                    {String(timeLeft?.minutes)?.padStart(2, "0")}
                </span>
                <span className="label">Minutes</span>
            </div>

            <div className="counter-item bg-mobile">
                <span className="value">
                    {String(timeLeft?.seconds)?.padStart(2, "0")}
                </span>
                <span className="label">Seconds</span>
            </div>
        </div>
    );
};
