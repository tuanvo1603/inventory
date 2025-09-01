# Module Relationship Diagram

## Main Modules
1. **Tài khoản (Account Management)**
2. **Phân quyền (Role & Permission Management)**
3. **Kho (Warehouse Management)**
4. **Sản phẩm (Product Management)**
5. **Phân loại sản phẩm (Product Category Management)**
6. **Giá bán (Price Management)**
7. **Nhà cung cấp (Supplier Management)**
8. **Khách hàng (Customer Management)**
9. **Nhập hàng (Purchase Order Management)**
10. **Đơn hàng bán (Sales Order Management)**
11. **Thanh toán (Payment Management)**
12. **Điều chuyển kho (Warehouse Transfer Management)**
13. **Báo cáo thống kê (Reporting & Dashboard)**

## Relationships
- **Tài khoản** liên kết với **Phân quyền** để kiểm soát truy cập các module khác.
- **Kho** chứa **Sản phẩm** và liên kết với **Điều chuyển kho** để chuyển hàng giữa các kho.
- **Sản phẩm** thuộc **Phân loại sản phẩm** và có **Giá bán**.
- **Nhà cung cấp** liên kết với **Nhập hàng** để nhập sản phẩm vào **Kho**.
- **Khách hàng** liên kết với **Đơn hàng bán** để bán sản phẩm từ **Kho**.
- **Thanh toán** liên kết với **Đơn hàng bán** và **Nhập hàng** để quản lý giao dịch tài chính.
- **Báo cáo thống kê** tổng hợp dữ liệu từ tất cả các module để hiển thị dashboard và báo cáo.

## Diagram (Textual)

```
[Tài khoản] <-> [Phân quyền]
        |                |
        v                v
      [Kho] <------> [Điều chuyển kho]
        |                |
        v                v
   [Sản phẩm] <-> [Phân loại sản phẩm]
        |
        v
   [Giá bán]
        |
        v
[Nhà cung cấp] <-> [Nhập hàng] <-> [Kho]
        |
        v
   [Khách hàng] <-> [Đơn hàng bán] <-> [Kho]
        |
        v
   [Thanh toán]
        |
        v
[ Báo cáo thống kê ]
```

## Notes
- Các module có thể bật/tắt linh hoạt theo nhu cầu khách hàng.
- Mỗi module nên có API riêng, dễ mở rộng và bảo trì.
