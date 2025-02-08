import React from "react";

const PaginationQuake = (equake, pageSize) => {

    console.log("iz paginationQuake konzola", equake)

    const pageCount = Math.ceil(equake.length / pageSize);
    return Array.from({ length: pageCount}, (_, index) =>
equake.slice(index * pageSize, (index + 1) * pageSize)
);
};
export default PaginationQuake;