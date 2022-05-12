import React from 'react'

export default function AccountsDisplayer(props: any) {



    const onDeleteItem = (id: number) => {
        if (confirm("are you sure you want to delete this item?")) {
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
                    alert("Item deleted");
                    window.location.reload();
                } else {
                    alert("it didn't work!");
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
                                <td>{account.role}</td>
                                {/* <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => onEditMove(account.id)}
                                        >
                                            Submit Update
                                        </button>
                                    </td> */}
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
