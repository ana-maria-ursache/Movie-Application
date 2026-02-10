import './Dropdown.css';

export default function Dropdown({
  label,
  items,
  selectedItems,
  onToggle,
  isOpen,
  onOpenToggle,
}) {
  return (
    <div className="custom-dropdown">
      <button className="dropdown-toggle" onClick={onOpenToggle}>
        {label} {selectedItems.length > 0 && `(${selectedItems.length})`}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item) => (
            <label key={item} className="dropdown-item">
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => onToggle(item)}
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
