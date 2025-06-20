import React from 'react';
import useCard from '../hooks/useCard';
import { Card, Typography } from "@material-tailwind/react";

const SalesTable = () => {
    const { stat } = useCard();

    const sortedStat = [...stat].sort((a, b) => a.id - b.id);
    const sorted7Stat = sortedStat.slice(-7);

    interface SalesInfo {
        heures: string[];
    }

    interface DataElement {
        information: { [key: string]: SalesInfo };
    }

    const generateSalesData = (): string[][][] => {
        const salesData: string[][][] = [];

        for (let hour = 0; hour < 24; hour++) {
            const hourlySales: string[][] = [];

            sorted7Stat.forEach((el: DataElement, index: number) => {
                const hourSalesSet: Set<string> = new Set();
                Object.keys(el.information).forEach((key: string) => {
                    el.information[key].heures.forEach((h: string) => {
                        if (h.split(":")[0] === hour.toString().padStart(2, '0')) {
                            hourSalesSet.add(key);
                        }
                    });
                });
                hourlySales[index] = Array.from(hourSalesSet);
            });

            salesData.push(hourlySales);
        }

        return salesData;
    };

    const getLast7Dates = () => {
        const dates = stat ? stat.map((el: any) => el.date).sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime()) : [];
        return dates.slice(0, 7).reverse();
    };

    const ListOfDay = getLast7Dates();
    const tt = generateSalesData();

    return (
        <>
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr >
                        <th  className="border border-gray-100 bg-gray-150 text-center ">Hour</th>
                        {ListOfDay.map((date:any, index:any) => (
                            <th key={index}  className="border-b border-gray-100 bg-gray-150 text-center ">{date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tt.map((hourlyData, hourIndex) => (
                        <tr key={hourIndex}>
                            <td className='border border-gray-300 px-2 py-2'>{hourIndex}</td>
                            {Array.from({ length: 7 }).map((_, dayIndex) => (
                                <td key={dayIndex} className='border border-gray-300 text-sm px-2 py-2'>
                                    {hourlyData[dayIndex] ? hourlyData[dayIndex].map((el) => <>{el}<br /></>) : ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
        </>
    );
};

export default SalesTable;
