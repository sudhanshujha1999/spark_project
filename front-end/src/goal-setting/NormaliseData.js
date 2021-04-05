import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

export const NormaliseData = ({ data, normalizeData = false, labels }) => {
    const [chartData, setChartData] = useState({});
    useEffect(() => {
        if (data) {
            const newData = data.map((eachFiled) => {
                if (normalizeData) {
                    const newDataset = eachFiled.data.map((dataItem) => {
                        return (
                            (dataItem - eachFiled.normalizeValue.min) /
                            (eachFiled.normalizeValue.max - eachFiled.normalizeValue.min)
                        );
                    });
                    return {
                        label: eachFiled.label,
                        borderColor: eachFiled.borderColor,
                        backgroundColor: eachFiled.backgroundColor,
                        fill: eachFiled.fill,
                        data: newDataset,
                    };
                } else {
                    return {
                        label: eachFiled.label,
                        borderColor: eachFiled.borderColor,
                        backgroundColor: eachFiled.backgroundColor,
                        fill: eachFiled.fill,
                        data: eachFiled.data,
                    };
                }
            });
            setChartData({
                labels: labels,
                datasets: newData,
            });
        }
    }, [data, normalizeData, labels]);

    const chartOptions = {
        elements: {
            // point: {
            //     pointStyle:
            // },
        },
        tooltips: {
            callbacks: {
                label: (tooltip) => {
                    // console.log(tooltip, data);
                    return `${data[tooltip.datasetIndex].label} ${
                        data[tooltip.datasetIndex].data[tooltip.index]
                    }`;
                },
                title: (tooltip, data) => {
                    // const { datasets } = data;
                    // console.log(tooltip, data);
                    // return datasets[tooltip[0].datasetIndex].label;
                    return tooltip[0].label;
                },
            },
            // enabled: false,
            // custom: (tooltip, data) => {
            //     if (tooltip) {
            //         console.log(tooltip, data);
            //     }
            // },
        },
    };

    return (
        <div>
            {chartData && (
                <Line
                    // width={500}
                    // height={500}
                    options={chartOptions}
                    data={chartData}
                />
            )}
        </div>
    );
};
