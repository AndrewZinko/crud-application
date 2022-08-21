import { useMemo } from "react";
import { useGetFiltersQuery, useUpdateActiveFilterMutation } from "../api/api-filters-slice";
import "./app-filter.css";

const AppFilter = () => {
    const {
        data: filters = {},
        isLoading,
        isError
    } = useGetFiltersQuery();
    const [updateActiveFilter] = useUpdateActiveFilterMutation();

    const memorizedFilters = useMemo(() => {
        if (filters.all) {
            return [...filters.all];
        }
        return null;
    }, [filters.all]);

    const onChangeFilter = (name) => {
        const requestBody = { activeFilter: name };
        updateActiveFilter(requestBody);
    }

    const renderOptions = (data) => {
        if (isLoading) {
            return <h6 className="text-white">Loading filters...</h6>
        } else if (isError) {
            return <h6 className="text-white">Could not fetch filters. Please, reload this page.</h6>
        }

        let clazz = '';
        if (memorizedFilters) {
            return memorizedFilters.map(item => {
                clazz = data.activeFilter === item.name ? "btn btn-light" : "btn btn-outline-light";
                return <button key={item.id}
                               type="button"
                               className={clazz}
                               onClick={() => onChangeFilter(item.name)}>
                               {item.name}
                       </button>;
            });
        }
    }

    return (
        <div className="btn-group">
            {renderOptions(filters)}
        </div>
    )
}

export default AppFilter;