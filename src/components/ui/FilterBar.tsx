import { Filters } from "../../config/filters";
import Wrapper from "./Wrapper";
import type { Filter } from "../../types/filters";
interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (label: string) => void;
}

export default function FilterBar({
  activeFilter,
  onFilterChange,
}: FilterBarProps) {
  return (
    <Wrapper>
      {/* overflow-x-auto = horizontal scroll on mobile */}
      {/* scrollbar-hide = clean look (add plugin or custom CSS) */}
      <div className="overflow-x-auto scrollbar-hide">
        {/* flex-nowrap prevents wrapping, gap-3 keeps pills breathing */}
        <div className="flex flex-nowrap gap-3 pb-1">
          {Filters.map((filter: Filter) => {
            const isActive = activeFilter === filter.label;

            return (
              <button
                key={filter.label}
                onClick={() => onFilterChange(filter.label)}
                className={`
                  whitespace-nowrap          
                  px-5 py-2               
                  rounded-full              
                  text-sm font-medium       
                  border                    
                  transition-all duration-200
                  cursor-pointer            
                  ${
                    isActive
                      ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-700"
                  }
                `}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}
