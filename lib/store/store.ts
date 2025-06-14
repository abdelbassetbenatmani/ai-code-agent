import { create } from "zustand";

// Define types
export type ViewMode = "grid" | "list";
export type SortOption = "name-asc" | "name-desc" | "date-new" | "date-old";

// Define the filter store slice
interface FilterState {
  searchTerm: string;
  viewMode: ViewMode;
  sortOption: SortOption;
  activeFilters: string[];
  
  // Actions
  setSearchTerm: (term: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setSortOption: (option: SortOption) => void;
  updateActiveFilter: (type: string, value: string) => void;
  removeFilter: (filter: string) => void;
  clearAllFilters: () => void;
}


const useStore = create<FilterState>((set) => ({
  
  // New filter state
  searchTerm: "",
  viewMode: "grid",
  sortOption: "name-asc",
  activeFilters: [],
  
  // Filter actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  setSortOption: (option) => set((state) => {
    // Update sort option
    let filterLabel = "";
    switch(option) {
      case "name-asc": filterLabel = "Name (A-Z)"; break;
      case "name-desc": filterLabel = "Name (Z-A)"; break;
      case "date-new": filterLabel = "Newest First"; break;
      case "date-old": filterLabel = "Oldest First"; break;
    }
    
    // Update active filters
    const filtered = state.activeFilters.filter(item => !item.startsWith("sort:"));
    return { 
      sortOption: option,
      activeFilters: [...filtered, `sort:${filterLabel}`]
    };
  }),
  
  updateActiveFilter: (type, value) => set((state) => {
    // Remove existing filter of same type
    const filtered = state.activeFilters.filter(item => !item.startsWith(`${type}:`));
    // Add new filter
    return { activeFilters: [...filtered, `${type}:${value}`] };
  }),
  
  removeFilter: (filter) => set((state) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [type, _] = filter.split(':');
    
    if (type === "sort") {
      // Reset sort to default
      return { 
        sortOption: "name-asc", 
        activeFilters: state.activeFilters.filter(item => item !== filter)
      };
    } 
    else if (type === "date") {
      return { 
        selectedDate: undefined, 
        activeFilters: state.activeFilters.filter(item => item !== filter)
      };
    }
    
    return { activeFilters: state.activeFilters.filter(item => item !== filter) };
  }),
  
  clearAllFilters: () => set({
    searchTerm: "",
    sortOption: "name-asc",
    activeFilters: []
  }),
  
 
}));

export default useStore;