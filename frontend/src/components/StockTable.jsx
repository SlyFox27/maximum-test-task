import React from "react";
import { Table } from "antd";

export const StockTable = ({ stock, page, onPageChange }) => {
    const columns = [
        { title: "ID", dataIndex: "_id", key: "_id" },
        {
            title: "Марка/модель",
            dataIndex: "mark",
            key: "mark",
            render: (text, record) =>
                `${record.mark ? record.mark : ""} ${
                    record.model ? record.model : ""
                }`,
        },
        {
            title: "Модификация",
            dataIndex: "engine",
            key: "engine",
            render: (engine) =>
                `${engine.power ? engine.power : ""}HP ${
                    engine.volume ? engine.volume : ""
                }L ${engine.transmission ? engine.transmission : ""}`,
        },
        {
            title: "Комплектация",
            dataIndex: "equipmentName",
            key: "equipmentName",
        },
        {
            title: "Стоимость",
            dataIndex: "price",
            key: "price",
            render: (price) =>
                `${
                    price
                        ? price.toLocaleString("ru", {
                              style: "currency",
                              currency: "RUB",
                          })
                        : "-"
                }`,
        },
        {
            title: "Дата создания",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) =>
                date
                    ? `${new Date(date).toLocaleDateString("ru")} ${new Date(
                          date
                      ).toLocaleTimeString("ru", {
                          hour: "2-digit",
                          minute: "2-digit",
                      })}`
                    : "-",
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={stock}
                pagination={{
                    current: page,
                    pageSize: 20,
                    onChange: onPageChange,
                }}
                rowKey="_id"
            />
        </>
    );
};
