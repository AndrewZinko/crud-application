import { useMemo } from 'react';
import { useGetEmployeesQuery } from '../api/api-employees-slice';

import "./app-info.css";

const AppInfo = () => {
    const {data: employees = []} = useGetEmployeesQuery();
    const memoEmployees = useMemo(() => ({
        length: employees.length,
        increase: employees.filter(item => item.increase).length
    }), [employees]);

    return (
        <div className="app-info">
            <h1>Accounting for employees in BluePrint Inc.</h1>
            <h2>Total number of employees: {memoEmployees.length}</h2>
            <h2>Bonus will be received: {memoEmployees.increase}</h2>
        </div>
    )
}

export default AppInfo;