import { SearchInput } from '../common/SearchInput';
import { Select } from '../common/Select';

export function ProductFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  stockStatus,
  onStockStatusChange,
  categories = [],
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="جستجوی محصول..."
        className="sm:w-64"
      />

      <Select
        value={selectedCategory}
        onChange={(value) => onCategoryChange({ target: { value } })} // اگر onCategoryChange همان e.target.value را می‌خواند
        options={[
          { value: '', label: 'همه دسته‌بندی‌ها' },
          ...categories.map((cat) => ({ value: String(cat.id), label: cat.name })),
        ]}
        placeholder="همه دسته‌بندی‌ها"
      />

      <Select
        value={stockStatus}
        onChange={(value) => onStockStatusChange({ target: { value } })}
        options={[
          { value: 'all', label: 'همه وضعیت‌ها' },
          { value: 'inStock', label: 'موجود' },
          { value: 'outOfStock', label: 'ناموجود' },
        ]}
        placeholder="همه وضعیت‌ها"
      />
    </div>
  );
}