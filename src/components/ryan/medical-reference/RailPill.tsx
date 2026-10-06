"use client";

export interface RailItem {
  id: string;
  number: string;
  label: string;
  color: string;
}

export const MR_SECTIONS: RailItem[] = [
  { id: "sec-01", number: "01", label: "Overview", color: "#0284c7" },
  { id: "sec-02", number: "02", label: "Clinical presentation", color: "#0e9f8a" },
  { id: "sec-03", number: "03", label: "Differential considerations", color: "#8b5cf6" },
  { id: "sec-04", number: "04", label: "Management principles", color: "#d97706" },
  { id: "sec-05", number: "05", label: "Treatment considerations", color: "#2563eb" },
  { id: "sec-06", number: "06", label: "Special clinical considerations", color: "#059669" },
  { id: "sec-07", number: "07", label: "When to escalate or refer", color: "#e11d48" },
  { id: "sec-08", number: "08", label: "Clinical takeaway", color: "#0d9488" },
  { id: "sec-09", number: "09", label: "References", color: "#4f46e5" },
];

export function RailPill({
  item,
  active,
  onGo,
  collapsible = false,
  collapsed = false,
  onToggleCollapse,
}: {
  item: RailItem;
  active: boolean;
  onGo: (id: string) => void;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  return (
    <div className="relative w-full">
      <button
        onClick={() => onGo(item.id)}
        aria-current={active ? "true" : undefined}
        className="relative flex min-h-[46px] w-full items-center gap-2 rounded-lg border py-1 pl-[46px] pr-2 text-left text-xs transition-colors"
        style={
          active
            ? { background: "#059669", borderColor: "#059669", color: "#fff", fontWeight: 700, paddingRight: collapsible ? 30 : undefined }
            : {
                background: `${item.color}14`,
                borderColor: `${item.color}45`,
                color: "#1e293b",
                fontWeight: 600,
                paddingRight: collapsible ? 30 : undefined,
              }
        }
      >
        <span
          className={active ? "mr-v2-dot-active" : undefined}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 30,
            height: 30,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10.5,
            fontWeight: 800,
            background: active ? "#fff" : item.color,
            color: active ? "#059669" : "#fff",
          }}
        >
          {item.number}
        </span>
        {item.label}
      </button>
      {collapsible && (
        <button
          type="button"
          aria-label={collapsed ? `Expand ${item.label}` : `Collapse ${item.label}`}
          title={collapsed ? "Expand" : "Collapse"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse?.();
          }}
          style={{
            position: "absolute",
            right: 6,
            top: "50%",
            transform: `translateY(-50%) rotate(${collapsed ? -90 : 0}deg)`,
            width: 22,
            height: 22,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,.85)",
            border: "1px solid rgba(15,23,42,.12)",
            color: active ? "#059669" : "#475569",
            cursor: "pointer",
            transition: "transform .2s ease",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
