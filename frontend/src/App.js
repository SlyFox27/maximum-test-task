import React, { useState, useEffect } from "react";
import { BrandList } from "./components/BrandList";
import { ModelSelect } from "./components/ModelSelect";
import { StockTable } from "./components/StockTable";

const App = () => {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModels, setSelectedModels] = useState([]);
    const [stock, setStock] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/brands`)
            .then((response) => response.json())
            .then((data) => {
                const validBrands = data.filter((brand) => brand);
                setBrands(validBrands);
            });
    }, []);

    useEffect(() => {
        if (selectedBrand) {
            fetch(`${process.env.REACT_APP_API_URL}/models/${selectedBrand}`)
                .then((response) => response.json())
                .then((data) => {
                    const validModels = data.filter((model) => model);
                    setModels(validModels);
                });
        }
    }, [selectedBrand]);

    useEffect(() => {
        const fetchStock = () => {
            const params = new URLSearchParams({
                page,
                brand: selectedBrand,
                models: selectedModels.join(","),
            });
            fetch(`${process.env.REACT_APP_API_URL}/stock?${params.toString()}`)
                .then((response) => response.json())
                .then((data) => setStock(data));
        };
        fetchStock();
    }, [page, selectedBrand, selectedModels]);

    const handleSelectBrand = (brand) => {
        setSelectedModels([]);
        setSelectedBrand(brand);
    };

    return (
        <div>
            <BrandList
                brands={brands}
                selectedBrand={selectedBrand}
                onClick={handleSelectBrand}
            />
            <ModelSelect
                models={models}
                selectedModels={selectedModels}
                onChange={setSelectedModels}
            />
            <StockTable stock={stock} page={page} onPageChange={setPage} />
        </div>
    );
};

export default App;
