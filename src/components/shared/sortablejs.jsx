const listRef = useRef(null);

useEffect(() => {
  if (!listRef.current) return;

  Sortable.create(listRef.current, {
    animation: 150,
    ghostClass: "opacity-40",
    dragClass: "opacity-50",
    direction: "horizontal",
    forceFallback: true, // IMPORTANT for mobile dragging
    onEnd: (evt) => {
      setFiles((prev) => {
        const updated = [...prev];
        const [moved] = updated.splice(evt.oldIndex, 1);
        updated.splice(evt.newIndex, 0, moved);
        return updated;
      });
    },
  });
}, [files]);
