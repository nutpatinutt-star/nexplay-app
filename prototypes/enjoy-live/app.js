const details = {
  join: ["ลงทะเบียน", "ปุ่มตัวอย่างสำหรับเชื่อมกับหน้าลงทะเบียน"],
  line: ["Add LINE", "ปุ่มตัวอย่างสำหรับเชื่อมกับ LINE Official Account"]
};
const dialog = document.querySelector("dialog");
document.querySelectorAll("[data-detail]").forEach(button => button.addEventListener("click", () => {
  const [title, copy] = details[button.dataset.detail];
  document.getElementById("detail-title").textContent = title;
  document.getElementById("detail-copy").textContent = copy;
  dialog.showModal();
}));
