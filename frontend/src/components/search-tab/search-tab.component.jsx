import ScrollList from "../scroll-list/scroll-list.component";
import SearchBar from "../search-bar/search-bar.component";
import {
	SearchTabContainer,
	SearchTabTitle,
	SearchTabContent,
} from "./search-tab.styles";

const headersList = ["Elemento"];
const SearchTab = ({ clientsList, countryList }) => {
	return (
		<SearchTabContainer>
			<SearchTabTitle>
				<h1>Buscar</h1>
			</SearchTabTitle>
			<SearchTabContent>
				<SearchBar clientsList={clientsList} countryList={countryList} />
				{/* <ScrollList /> */}
			</SearchTabContent>
		</SearchTabContainer>
	);
};

export default SearchTab;
