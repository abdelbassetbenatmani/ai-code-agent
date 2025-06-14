"use client";
import React from "react";
import ProjectsList from "./ProjectsList";
import FilterBar from "./FilterBar";

const DashboardContent = () => {
  return (
    <div className="container mx-auto px-4 pt-8 lg:pt-12">
      <FilterBar
        onSearch={(term) => console.log("Search:", term)}
        onSortChange={(option) => console.log("Sort:", option)}
        onViewChange={(view) => console.log("View:", view)}
        onDateChange={(date) => console.log("Date:", date)}
      />
      <ProjectsList />
    </div>
  );
};

export default DashboardContent;
