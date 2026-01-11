# 📸 Beauty Screenshot – Product Specification

## 1. Tổng quan sản phẩm

**Beauty Screenshot** là một công cụ **frontend-only** giúp người dùng **làm đẹp ảnh chụp màn hình** bằng cách thay đổi background, bố cục, hiệu ứng hiển thị, thêm frame, và vẽ/chú thích trực tiếp trên ảnh.  
Sản phẩm hướng tới **developer, designer, content creator** muốn tạo screenshot đẹp để chia sẻ trên mạng xã hội, blog, portfolio hoặc tài liệu kỹ thuật.

**Tính năng chính:**
- Thay đổi background (solid, gradient, cosmic, desktop, custom)
- Công cụ vẽ và chú thích (bút, shape, zoom in, đánh dấu)
- Frame cửa sổ macOS
- Thao tác ảnh (crop, flip, chỉnh vị trí)
- Điều chỉnh layout (scale, padding, rounded, shadow)

---

## 2. Mục tiêu sản phẩm

- Biến screenshot “thô” thành hình ảnh **thẩm mỹ, hiện đại**
- Không cần backend, chạy hoàn toàn trên trình duyệt
- Xử lý ảnh **offline**
- Xuất ảnh chất lượng cao
- Dễ mở rộng tính năng trong tương lai

---

## 3. Đối tượng người dùng

### 🎯 Primary users
- Developer (chia sẻ code, UI, dashboard)
- Designer
- Technical blogger
- Content creator

### 🎯 Secondary users
- Sinh viên IT
- Người viết tài liệu / báo cáo

---

## 4. Phạm vi sản phẩm (Scope)

### ✅ Có trong phiên bản đầu (v1)
- Upload / paste screenshot
- Chọn background (solid / gradient / cosmic gradient / desktop / custom)
- Điều chỉnh layout (scale, padding, rounded, shadow)
- Công cụ vẽ (bút, shape, zoom in, đánh dấu)
- Tùy chỉnh nét vẽ (độ đậm nhạt, màu sắc)
- Frame cho ảnh (macOS window frame)
- Thao tác ảnh (crop, flip, chỉnh vị trí)
- Preview realtime
- Export ảnh

### 🚧 Chưa có (roadmap)
- Beautify text trong ảnh
- Beautify code block
- OCR
- Template preset
- Watermark
- Pattern background
- Cartoon / Illustration background

---

## 5. Tổng quan giao diện (UI Overview)

```
┌─────────────────────────────────────────────────────────────┐
│ Top Bar                                                      │
│ [Logo]  [Pen|Shape|Zoom|Mark] [Undo|Redo]  [Theme|Export|Del]│
└─────────────────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────────────────────┐
│ Left Panel   │ Canvas Preview                               │
│ (Controls)   │ (Live preview + Drawing)                     │
│              │                                               │
│ Background   │                                               │
│ - Solid      │                                               │
│ - Gradient   │                                               │
│ - Cosmic     │                                               │
│ - Desktop    │                                               │
│ - Custom     │                                               │
│              │                                               │
│ Layout       │                                               │
│ - Scale      │                                               │
│ - Padding    │                                               │
│ - Rounded    │                                               │
│ - Shadow     │                                               │
│              │                                               │
│ Frame        │                                               │
│ - macOS      │                                               │
│              │                                               │
│ Image Tools  │                                               │
│ - Crop       │                                               │
│ - Flip       │                                               │
│ - Position   │                                               │
│              │                                               │
│              │                                    [🔍- 45% +]│
│              │                                    [⛶]        │
│              │                                    (Zoom Toolbar)│
│              │                                               │
│ [Export]     │                                               │
│ [Delete]     │                                               │
└──────────────┴──────────────────────────────────────────────┘
```

---

## 6. Chi tiết từng khu vực giao diện

### 6.1 Top Bar

Top Bar được chia thành 3 phần:

#### 6.1.1 Left Section
- Logo / App name

#### 6.1.2 Middle Section (Drawing Tools)
- Pen Tool button
- Shape Tool button
- Zoom In Tool button (kính lúp)
- Mark Tool button
- Undo button (cho drawing tools)
- Redo button (cho drawing tools)

#### 6.1.3 Right Section
- Theme toggle button (Dark/Light mode)
- Export button (dropdown: PNG, JPEG, với các tùy chọn scale)
- Delete button (xóa ảnh hiện tại)

### 6.2 Left Panel

Left Panel chứa các controls để chỉnh sửa ảnh:
- Background Section
- Layout Section
- Frame Section
- Image Manipulation Section
- Export button (nằm dưới cùng)
- Delete button (nằm dưới cùng)

**Upload ảnh:**
- Drag & drop ảnh vào Canvas Preview
- Paste từ clipboard (Ctrl/Cmd + V)
- Click vào Canvas Preview khi chưa có ảnh để mở file picker

### 6.3 Canvas Preview

Canvas Preview hiển thị ảnh và cho phép vẽ/chú thích trực tiếp:
- Live preview realtime
- Drawing interaction (khi chọn drawing tools từ top bar)
- Zoom Toolbar (góc dưới bên phải của canvas)

### 6.4 Zoom Toolbar

Zoom Toolbar nằm ở góc dưới bên phải của Canvas Preview, bao gồm:
- **Zoom In button**: Tăng mức zoom (phóng to)
- **Zoom level display**: Hiển thị mức zoom hiện tại dưới dạng phần trăm (ví dụ: 45%, 100%, 200%)
- **Zoom Out button**: Giảm mức zoom (thu nhỏ)
- **Expand/Fullscreen button**: Mở rộng canvas ra fullscreen hoặc thu nhỏ về bình thường

Zoom Toolbar cho phép người dùng điều chỉnh view của canvas để làm việc chi tiết hơn hoặc xem tổng quan.

### 6.5 Theme Toggle

Theme toggle button nằm ở **Top Bar - Right Section**:
- Toggle giữa Dark mode và Light mode
- Áp dụng cho toàn bộ giao diện ứng dụng
- Lưu preference trong localStorage (nếu có)
- Icon thay đổi theo theme hiện tại (mặt trăng/ mặt trời)

---

## 7. Background Section

### 7.1 Solid Background
- Màu đa dụng (preset colors)
- Custom color picker
  - Nhập mã màu (hex, rgb, hsl)
  - Pick màu trên giao diện
  - Color palette

### 7.2 Gradient Background
- Preset gradient
- Custom color picker (2 màu trở lên)
- Direction control (linear, radial, angular)

### 7.3 Cosmic Gradient Background
- Preset cosmic gradients (màu vũ trụ, nebula)
- Custom cosmic color picker
- Direction control

### 7.4 Desktop Background
- Background desktop thông dụng (macOS, Windows, Linux themes)
- Preset desktop wallpapers
- Optional blur effect

### 7.5 Custom Background
- Color picker đầy đủ tính năng
  - Nhập mã màu (hex, rgb, hsl)
  - Pick màu trên giao diện
  - Color wheel
  - Opacity control

---

## 8. Layout Section

### 8.1 Scale Control
- Điều chỉnh kích thước ảnh (scale factor)
- Slider hoặc input số
- Range: 0.1x - 5x

### 8.2 Padding Control
- Điều chỉnh khoảng cách giữa ảnh và background
- Slider hoặc input số
- Có thể điều chỉnh riêng từng phía (top, right, bottom, left) hoặc đồng nhất

### 8.3 Rounded Control
- Điều chỉnh bo góc ảnh (border radius)
- Slider hoặc input số
- Có thể điều chỉnh riêng từng góc hoặc đồng nhất

### 8.4 Shadow Control
- Shadow presets
- Custom shadow:
  - X offset
  - Y offset
  - Blur radius
  - Spread radius
  - Color
  - Opacity

---

## 9. Drawing Tools Section

**Lưu ý:** Các drawing tools được đặt ở **Top Bar - Middle Section** để dễ truy cập. Undo/Redo buttons cũng nằm trong cùng section này.

### 9.1 Pen Tool (Bút vẽ)
- Vẽ tự do trên canvas
- Tùy chỉnh:
  - Độ đậm nhạt (stroke width): 1px - 50px
  - Màu sắc: color picker đầy đủ
  - Opacity: 0% - 100%
- Có thể undo/redo

### 9.2 Shape Tool
- Vẽ các hình cơ bản (rectangle, circle, line, arrow)
- Tùy chỉnh:
  - Độ đậm nhạt (stroke width): 1px - 50px
  - Màu sắc: color picker đầy đủ
  - Fill color (tùy chọn)
  - Opacity: 0% - 100%
- Có thể resize và di chuyển sau khi vẽ

### 9.3 Zoom In Tool (Kính lúp)
- Khoanh vùng trên ảnh để tạo hiệu ứng zoom
- Vùng được chọn sẽ được phóng to như kính lúp
- Tùy chỉnh:
  - Scale zoom: 1.5x - 5x
  - Border style cho vùng zoom
  - Position của zoom lens

### 9.4 Mark Tool (Đánh dấu)
- Click vào bất cứ đâu trên ảnh để đánh dấu vị trí
- Tự động đánh số thứ tự (1, 2, 3, ...)
- Số thứ tự tăng dần sau mỗi lần đánh dấu
- Tùy chỉnh:
  - Màu icon mark: color picker
  - Kích thước icon
  - Style icon (circle, square, number badge)
- Có thể xóa từng mark hoặc xóa tất cả

### 9.5 Drawing Settings (Chung cho tất cả công cụ)
- Color picker: nhập mã màu, pick màu trên giao diện
- Stroke width control
- Opacity control
- Layer management (thứ tự hiển thị)

---

## 10. Frame Section

### 10.1 macOS Window Frame
- Frame cửa sổ macOS với 3 nút điều khiển:
  - Close (đỏ)
  - Minimize (vàng)
  - Fullscreen (xanh lá)
- 2 theme:
  - Dark mode (nền đen)
  - Light mode (nền trắng)
- Tùy chỉnh:
  - Show/hide frame
  - Frame color (nếu custom)
  - Title bar text (tùy chọn)

---

## 11. Image Manipulation Section

### 11.1 Crop Tool
- Crop ảnh theo vùng chọn
- Tỷ lệ khóa (aspect ratio lock) tùy chọn
- Free crop hoặc preset ratios (1:1, 16:9, 4:3, ...)
- Preview vùng crop realtime

### 11.2 Flip Tool
- Flip ngang (horizontal flip)
- Flip dọc (vertical flip)
- Có thể kết hợp cả hai

### 11.3 Position Control
- Điều chỉnh vị trí ảnh so với background
- 9 vị trí:
  - Top-left
  - Top-center
  - Top-right
  - Middle-left
  - Center
  - Middle-right
  - Bottom-left
  - Bottom-center
  - Bottom-right
- Hoặc điều chỉnh tự do bằng drag & drop
- Fine-tune bằng arrow keys hoặc input số (X, Y offset)

---

## 12. Effects Section
- Background blur (đã chuyển sang Background Section)
- Shadow (đã chuyển sang Layout Section)

---

## 13. Export Functionality

**Vị trí:** Export button nằm ở dưới cùng của Left Panel (cùng với Delete button).

**Tính năng:**
- PNG / JPEG format
- Scale 1x / 2x / 3x
- High-quality render
- Export bao gồm tất cả layers (drawing, marks, frame)
- Dropdown menu với các tùy chọn format và scale

### 13.1 Delete Functionality

**Vị trí:** Delete button nằm ở dưới cùng của Left Panel (cùng với Export button).

**Tính năng:**
- Xóa ảnh hiện tại khỏi canvas
- Reset về trạng thái ban đầu (chưa có ảnh)
- Có thể có confirmation dialog để tránh xóa nhầm

---

## 14. Performance Requirements
- Realtime preview
- Canvas up to 4K
- No memory leak
- Smooth drawing performance
- Efficient canvas rendering

---

## 15. Technical Constraints
- Frontend only
- No backend
- No user data storage
- All processing in browser

---

## 16. Roadmap
- Text beautify
- Code highlight
- OCR
- Smart presets
- Pattern background
- Cartoon / Illustration background
- More frame styles (Windows, Linux)
- Animation effects
- Batch processing

---

## 17. Product Positioning

> Beauty Screenshot helps turn plain screenshots into beautiful, shareable visuals — directly in the browser.
