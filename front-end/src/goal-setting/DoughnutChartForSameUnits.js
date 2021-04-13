import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";

export const DoughnutChartForSameUnits = ({ data, neededDataLabels: neededData }) => {
    const [chartData, setChartData] = useState();
    useEffect(() => {
        if (data) {
            const neededData = ["kills", "deaths", "assists"];
            let labels = [];
            let datasets = [];

            // THIS WILL BE IN A LOOP FOR WHAT WE WANT
            let datasetObject = {
                label: "Totals",
                backgroundColor: [],
                hoverBackgroundColor: [],
                data: [],
                hoverOffset: 4,
            };
            data.forEach((dataset) => {
                if (neededData.includes(dataset.label.toLowerCase())) {
                    labels = [...labels, dataset.label];
                    datasetObject.data = [...datasetObject.data, dataset.sum];
                    datasetObject.backgroundColor = [
                        ...datasetObject.backgroundColor,
                        dataset.borderColor,
                    ];
                    datasetObject.hoverBackgroundColor = [
                        ...datasetObject.hoverBackgroundColor,
                        dataset.backgroundColor,
                    ];
                }
            });
            datasets = [...datasets, datasetObject];
            // END OF THAT LOOP

            setChartData({
                labels: labels,
                datasets: datasets,
            });
        }
    }, [data, neededData]);

    return <div>{chartData && <Doughnut data={chartData} />}</div>;
};
