import React from "react";
import { Select } from "antd";

const { Option } = Select;

export const ModelSelect = ({ models, selectedModels, onChange }) => (
    <>
        <p style={{ margin: "1% 0 0 0" }}>Модель:</p>
        <Select
            mode="multiple"
            style={{ width: "10%", margin: "1% 0 1% 0" }}
            placeholder="Выберите модель"
            value={selectedModels}
            onChange={onChange}
        >
            {models.map((model) => (
                <Option key={model} value={model}>
                    {model}
                </Option>
            ))}
        </Select>
    </>
);
