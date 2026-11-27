let item = null;
const placeholder = document.createElement("div");
placeholder.className = "drop-placeholder";

export const drag = {
  placeholder,
  clearPlaceholder() { placeholder.remove(); },
  get item() { return item; },
  start(event, data) {
    item = data;
    event.dataTransfer.effectAllowed = "all";
    event.dataTransfer.setData("text/plain", String(data.type));
  },
  end() {
    item = null;
    placeholder.remove();
    document.querySelectorAll(".drop-into").forEach((node) => node.classList.remove("drop-into"));
  },
};
