"use client";

import { useEffect, useId, useRef, useState } from "react";
import { inputClass } from "@/components/forms/Fields";

/**
 * Street-address field. With NEXT_PUBLIC_ADDRESSCOMPLETE_KEY set it suggests real
 * Canadian addresses (Canada Post AddressComplete); without a key it is a plain
 * text field that relies on the browser's own autofill.
 */
const KEY = process.env.NEXT_PUBLIC_ADDRESSCOMPLETE_KEY ?? "";
const BASE = "https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive";

type Item = { Id: string; Text: string; Description: string; Next: string };
export type PickedAddress = { line1: string; city: string };

export function AddressInput({
  id,
  value,
  onChange,
  onPick,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  onPick: (a: PickedAddress) => void;
  placeholder: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const skip = useRef(false);

  useEffect(() => {
    if (!KEY || skip.current || value.trim().length < 4) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        const q = new URLSearchParams({
          Key: KEY,
          SearchTerm: value,
          Country: "CAN",
          LanguagePreference: "fr",
          MaxSuggestions: "6",
        });
        const r = await fetch(`${BASE}/Find/v2.10/json3.ws?${q}`);
        const data = await r.json();
        const found: Item[] = (data.Items ?? []).filter((i: Item & { Error?: string }) => !i.Error);
        setItems(found);
        setOpen(found.length > 0);
        setActive(-1);
      } catch {
        setItems([]);
        setOpen(false);
      }
    }, 250);
    return () => clearTimeout(timer.current);
  }, [value]);

  async function pick(item: Item) {
    setOpen(false);
    skip.current = true;
    try {
      if (item.Next !== "Retrieve") {
        // A street or group of addresses: keep drilling down.
        onChange(item.Text);
        skip.current = false;
        return;
      }
      const r = await fetch(`${BASE}/Retrieve/v2.11/json3.ws?${new URLSearchParams({ Key: KEY, Id: item.Id })}`);
      const a = (await r.json()).Items?.[0];
      if (a?.Line1) {
        onChange(a.Line1);
        onPick({ line1: a.Line1, city: a.City ?? "" });
      } else onChange(item.Text);
    } catch {
      onChange(item.Text);
    }
  }

  function onKey(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      void pick(items[active]);
    } else if (e.key === "Escape") setOpen(false);
  }

  return (
    <div className="relative">
      <input
        id={id}
        name="street-address"
        autoComplete={KEY ? "off" : "address-line1"}
        placeholder={placeholder}
        value={value}
        role={KEY ? "combobox" : undefined}
        aria-expanded={KEY ? open : undefined}
        aria-controls={KEY ? listId : undefined}
        aria-autocomplete={KEY ? "list" : undefined}
        onChange={(e) => {
          skip.current = false;
          onChange(e.target.value);
        }}
        onKeyDown={onKey}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={inputClass}
      />
      {KEY && open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-2xl bg-surface p-1.5 shadow-[var(--shadow-soft)] ring-1 ring-ink/10"
        >
          {items.map((it, i) => (
            <li
              key={it.Id}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                void pick(it);
              }}
              className={`min-h-11 cursor-pointer rounded-xl px-3.5 py-2 text-[15px] ${
                i === active ? "bg-accent-tint text-accent-strong" : "text-ink hover:bg-ink/[0.05]"
              }`}
            >
              <span className="font-medium">{it.Text}</span>{" "}
              <span className="text-sm text-muted">{it.Description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
