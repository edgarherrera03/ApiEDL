import {
	Pie,
	PieChart,
	Tooltip,
	Legend,
	Cell,
	ResponsiveContainer,
} from "recharts";
import { PieChartContainer, DownloadButton, Title } from "./pie-chart.styles";
import html2canvas from "html2canvas";
import { useRef } from "react";

const PieChartComponent = ({ item }) => {
	const chartRef = useRef(null); // ref para el contenedor del chart

	const COLORS = [
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#FF8042",
		"#FF6384",
		"#36A2EB",
		"#FFCE56",
		"#4BC0C0",
		"#9966FF",
		"#FF9F40",
		"#C9CBCF",
		"#FF6666",
		"#66FF66",
		"#6666FF",
		"#FFB366",
		"#33CCFF",
		"#FF33CC",
		"#99FF33",
		"#FF3366",
		"#33FFCC",
		"#CCCC33",
		"#33CCCC",
		"#CC33FF",
		"#FF9933",
	];

	const downloadImage = () => {
		if (!chartRef.current) {
			alert("No se encontró el gráfico para exportar.");
			return;
		}

		html2canvas(chartRef.current, { scale: 3 }).then((canvas) => {
			const imgURI = canvas
				.toDataURL("image/png")
				.replace("image/png", "image/octet-stream");

			const a = document.createElement("a");
			a.setAttribute("download", "chart.png");
			a.setAttribute("href", imgURI);
			a.click();
		});
	};

	return (
		<PieChartContainer ref={chartRef}>
			<Title>
				<span>{item.labelTitle}</span>
				<DownloadButton onClick={downloadImage} />
			</Title>
			<ResponsiveContainer width={400} height={450}>
				<PieChart>
					<Pie
						dataKey="value"
						isAnimationActive={true}
						animationDuration={1000}
						animationEasing="ease-out"
						data={item.data}
						cx="50%"
						cy="50%"
						label
						outerRadius="80%" // Percentage-based for better scaling
					>
						{item.data.map((entry, index) => (
							<Cell
								key={`cell-${entry.name}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend verticalAlign="bottom" iconType="circle" />
				</PieChart>
			</ResponsiveContainer>
		</PieChartContainer>
	);
};

export default PieChartComponent;
