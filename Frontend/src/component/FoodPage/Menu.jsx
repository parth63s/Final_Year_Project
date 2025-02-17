import React from 'react';

function Menu() {
    const menuData = [
        { date: "27-9-2025", day: "Monday", lunch: "Roti, dal", dinner: "Roti, dal" },
        { date: "28-9-2025", day: "Tuesday", lunch: "Rice, curry", dinner: "Rice, curry" },
        { date: "29-9-2025", day: "Wednesday", lunch: "Paratha, sabzi", dinner: "Paratha, sabzi" },
        { date: "30-9-2025", day: "Thursday", lunch: "Pulao, raita", dinner: "Pulao, raita" },
        { date: "1-10-2025", day: "Friday", lunch: "Biryani, salad", dinner: "Biryani, salad" },
        { date: "2-10-2025", day: "Saturday", lunch: "Khichdi, yogurt", dinner: "Khichdi, yogurt" },
        { date: "3-10-2025", day: "Sunday", lunch: "Pasta, garlic bread", dinner: "Pasta, garlic bread" }
    ];

    return ( 
        <div className="menu">
            <table className="table table-striped container border">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Day</th>
                        <th scope="col">Lunch</th>
                        <th scope="col">Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    {menuData.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.date}</td>
                            <td>{item.day}</td>
                            <td>{item.lunch}</td>
                            <td>{item.dinner}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Menu;
