// ─── FLASH AUTO-DISMISS ──────────────────────────────
document.querySelectorAll('.flash').forEach(flash => {
  setTimeout(() => {
    flash.style.transition = 'opacity 0.4s';
    flash.style.opacity = '0';
    setTimeout(() => flash.remove(), 400);
  }, 5000);
});

// ─── IMAGE PREVIEW ───────────────────────────────────
const fileInput = document.querySelector('.file-input');
if (fileInput) {
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      let preview = document.getElementById('img-preview');
      if (!preview) {
        preview = document.createElement('img');
        preview.id = 'img-preview';
        preview.style.cssText = 'width:120px;height:90px;object-fit:cover;border-radius:8px;margin-top:10px;border:1px solid #E8D5BD;';
        fileInput.parentNode.insertBefore(preview, fileInput.nextSibling);
      }
      preview.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}
