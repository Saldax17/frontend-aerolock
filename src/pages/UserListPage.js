import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

const UserListPage = () => {

    const [users, setUsers] = useState("");

    useEffect(() => {
        const url = "https://demo9330779.mockable.io/";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                
                setUsers(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

   
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr >
                        <th style={{backgroundColor: "#047d95", color: "#ffffff"}}>Name</th>
                        <th style={{backgroundColor: "#047d95", color: "#ffffff"}}>CC</th>
                        <th style={{backgroundColor: "#047d95", color: "#ffffff"}}>email</th>
                        <th style={{backgroundColor: "#047d95", color: "#ffffff"}}>FlightID</th>
                        <th style={{backgroundColor: "#047d95", color: "#ffffff"}}>Occupation</th>
                        <th style={{backgroundColor: "#047d95", color: "#ffffff"}}>Birthday</th>
                        <th style={{backgroundColor: "#047d95", color: "#ffffff"}}>Tel</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <>
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.CC}</td>
                                <td>{user.email}</td>
                                <td>{user.flightID}</td>
                                <td>{user.Occupation}</td>
                                <td>{user.Birthday}</td>
                                <td>{user.Tel}</td>
                            </tr>
                        </>
                    ))}

                </tbody>
            </Table>
            <hr />


        </>
    )
}
export default UserListPage;