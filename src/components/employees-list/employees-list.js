import { useGetEmployeesQuery, useDeleteEmployeeMutation, useUpdateEmployeeMutation } from "../api/api-employees-slice";
import { useGetFiltersQuery } from "../api/api-filters-slice";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import EmployeesListItem from "../employees-list-item/employees-list-item";
import ErrorComponent from '../error-component/error-component';

import './employees-list.css';

const EmployeesList = () => {
    const {input} = useSelector(state => state.search);
    const {
        data: employees = [],
        isError
    } = useGetEmployeesQuery();

    const {
        data: filters = {}
    } = useGetFiltersQuery();

    const [deleteEmployee] = useDeleteEmployeeMutation();
    const [updateEmployee] = useUpdateEmployeeMutation();

    const onUpdate = useCallback((id, field, value) => {
        const data = {
            [field]: value
        }
        updateEmployee({id, data});
    }, []);
    
    const onDelete = useCallback((id) => {
        deleteEmployee(id);
    }, []);

    const prepareItems = (data) => {
        if (isError) {
            return null;
        }

        if (filters.activeFilter && data.length > 0) {
            switch(filters.activeFilter) {
                case 'All employees':
                    return renderItems(data);
                case 'For promotion':
                    return renderItems(data.filter(item => item.increase));
                case 'Salary more than 1000$':
                    return renderItems(data.filter(item => item.salary >= 1000));
                default:
                    throw new Error(`Can't apply filter!`);
            }
        }
    }

    const renderItems = (data) => {
        const searchResult = data.filter(item => item.name.indexOf(input) >= 0);
        if (searchResult.length > 0) {
            return searchResult.map(item => {
                return <EmployeesListItem key={item.id} 
                            {...item}
                            onDelete={onDelete}
                            onUpdate={onUpdate}/>
                }
            );
        } else {
            return <h5 className="empty-list-item">There is no such employees.</h5>;
        }
    }

    return (
       <>
            <ul className="app-list list-group">
                {prepareItems(employees)}
            </ul>
            {isError ? <ErrorComponent header="Could not fetch employees list!"
                                       description="Please, try to reload page."/> : null}
       </>
    ) 
}

export default EmployeesList;