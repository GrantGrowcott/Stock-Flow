'use client'
import { YearDropdownProps } from "@/constants"

export default function YearDropdown({ selectedYears, setSelectedYears }: YearDropdownProps) {
  

  return (
    <div className="mt-2 mb-10">
      <label htmlFor="years" className="block mb-1 font-medium">
        Select Term:
      </label>
      <select
        id="years"
        value={selectedYears}
        onChange={(e) => setSelectedYears(Number(e.target.value))}
        className="border rounded px-3 py-2 text-[var(--black)] placeholder:text-[var(--black)] bg-[var(--grey)]"
      >
        <option className="placeholder:text-[var(--black)]" value={5}>5 Years</option>
        <option value={10}>10 Years</option>
      </select>
    </div>
  )
}
