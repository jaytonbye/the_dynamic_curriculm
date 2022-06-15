import React, { useEffect } from 'react'

export default function AccountsDisplayer(props: any) {


    const changeRole = (role: string, id: number) => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer token`,
            },
            body: JSON.stringify({
                role: role,
                id: id,
            }),
        };

        fetch(`/api/users/updateRole`, requestOptions).then((res) => {
            if (res.ok) {
                alert("The role was changed to " + role + "!");
            } else {
                alert("it didn't work! Coach Wayne Apologizes try again later and let him know what happened.");
            }
        });


    }

    const onDeleteItem = (id: number) => {
        if (confirm("Are you sure you want to delete this item? This cannot be undone. And will remove all grades and data associated with the user.")) {
            let token = localStorage.getItem("token");
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            fetch(`/api/users/${id}`, requestOptions).then((res) => {
                if (res.ok) {
                    alert("User deleted");
                    window.location.reload();
                } else {
                    alert("it didn't work! Contact support if this keeps happening.");
                }
            });
        }
    };

    return (
        <div className="row">
            <table className="table w-75 mx-auto">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>role</th>
                    </tr>
                </thead>
                <tbody>
                    {props.accounts.map((account: any) => {
                        return (
                            <tr key={account.id}>
                                <td>{account.id}</td>
                                <td>{account.email}</td>
                                <td>{account.real_email}</td>
                                <td>
                                    <label >Role:</label>
                                    <select name="languages" id="role" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        changeRole(e.target.value, account.id);
                                    }}>
                                        <option value={account.role}>{account.role}</option>
                                        <option value="wrestler">wrestler</option>
                                        <option value="coach">coach</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onDeleteItem(account.id)}
                                    >
                                        Delete!
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
