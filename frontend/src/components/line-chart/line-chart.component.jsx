import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import {
	LineChartContainer,
	FilterContainer,
	DownloadButton,
} from "./line-chart.styles";
import { useContext, useState, useRef } from "react";
import { ClientsContext } from "../../context/clients.context";
import html2canvas from "html2canvas";

const LineChartComponent = ({ labelTitle, itemList }) => {
	const [view, setView] = useState("day");
	const [clientFilter, setClientFilter] = useState("");
	const { clientsList } = useContext(ClientsContext);
	const chartRef = useRef(null); // ref para el contenedor del chart

	const clientsUsername = clientsList.map((client) => client.username);

	function groupData(itemList, view = "day", clientFilter = "") {
		const formatter = (dateStr) => {
			const date = new Date(dateStr);
			if (view === "day") {
				const year = date.getUTCFullYear();
				const month = String(date.getUTCMonth() + 1).padStart(2, "0");
				const day = String(date.getUTCDate()).padStart(2, "0");
				return `${year}-${month}-${day}`; // YYYY-MM-DD
			}
			if (view === "month") {
				const year = date.getUTCFullYear();
				const month = String(date.getUTCMonth() + 1).padStart(2, "0");
				return `${year}-${month}`; // YYYY-MM
			}
			if (view === "year") {
				return String(date.getUTCFullYear());
			}
		};

		const grouped = {};

		itemList.forEach(({ creationDate, blocked, clients }) => {
			// Si hay filtro de cliente, ignorar si no está en el array clients
			if (clientFilter && (!clients || !clients.includes(clientFilter))) return;

			const key = formatter(creationDate);
			if (!grouped[key]) {
				grouped[key] = { date: key, Bloqueado: 0, Añadido: 0 };
			}
			if (blocked) grouped[key].Bloqueado += 1;
			grouped[key].Añadido += 1;
		});

		return Object.values(grouped).sort(
			(a, b) => new Date(a.date) - new Date(b.date)
		);
	}

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

	const chartData = groupData(itemList, view, clientFilter);

	return (
		<LineChartContainer>
			<span>{labelTitle}</span>
			<FilterContainer>
				<select value={view} onChange={(e) => setView(e.target.value)}>
					<option value="day">Por Dia</option>
					<option value="month">Por Mes</option>
					<option value="year">Por Año</option>
				</select>
				<select
					value={clientFilter}
					onChange={(e) => setClientFilter(e.target.value)}>
					<option key="all" value="">
						Todos los clientes
					</option>
					{clientsUsername.map((client) => (
						<option key={client} value={client}>
							{client}
						</option>
					))}
				</select>
				<DownloadButton onClick={downloadImage} />
			</FilterContainer>
			<div ref={chartRef} style={{ width: "100%", height: 400 }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={chartData}
						margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Legend verticalAlign="top" height={36} iconType="circle" />
						<Line
							type="monotone"
							dataKey="Bloqueado"
							stroke="#FF3333"
							strokeWidth={2}
							activeDot={{ r: 8 }}
						/>
						<Line
							type="monotone"
							dataKey="Añadido"
							stroke="#33AAFF"
							strokeWidth={2}
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</LineChartContainer>
	);
};

export default LineChartComponent;
