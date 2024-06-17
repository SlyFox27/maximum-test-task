import React from "react";
import { Space } from "antd";

export const BrandList = ({ brands, selectedBrand, onClick }) => (
    <div>
        <Space>
            {brands.map((brand) => (
                <span
                    key={brand._id}
                    value={brand._id}
                    onClick={() => {
                        onClick(brand._id);
                    }}
                >
                    <span
                        style={{
                            cursor: "pointer",
                            color: "blue",
                            fontWeight: `${
                                brand._id === selectedBrand ? "bold" : "normal"
                            }`,
                        }}
                    >
                        {brand._id}
                    </span>{" "}
                    <span style={{ fontSize: "smaller" }}>{brand.count}</span>
                </span>
            ))}
        </Space>
    </div>
);
