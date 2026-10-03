# TV data story — ghi chú trình bày khoảng 3 phút

Mở `televisions.html`. Chỉ scroll các phần 01–04 khi trình bày; mở phần workflow nếu thầy hỏi. Nói tự nhiên, không cần đọc toàn bộ chữ trên trang.

## 0:00–0:25 — Câu hỏi

“Khi mua TV, em muốn biết: một chiếc nhiều sao hơn có chắc dùng ít điện hơn không? Câu trả lời là không nếu mình đang so hai kích thước khác nhau. Sao phản ánh hiệu suất có tính đến kích thước, còn kWh/năm mới là lượng điện được ghi trên nhãn.”

## 0:25–1:10 — Biểu đồ 1: bằng chứng không chỉ là một mẫu

“Em dùng riêng dataset ngày 3 tháng 10. Sau lọc thị trường Australia, trạng thái Available, Approved, ngày hết hạn và kiểm tra dữ liệu, em giữ một dòng cho mỗi đăng ký.

Nhóm 55 inch, 3 sao có 11 đăng ký, dùng từ 499 đến 532 kWh/năm. Nhóm 75 inch, 5 sao có 65 đăng ký, dùng từ 550 đến 612. Hai khoảng không chồng lên nhau. Vì 532 nhỏ hơn 550, ta biết cả 11 nhân 65, tức 715 cặp *có thể tạo*, đều có kWh cao hơn ở nhóm TV lớn. Không cần chạy phép nối từng cặp để chứng minh điều này. Median là 514 và 598, chênh khoảng 16%.

715 cặp không có nghĩa là 715 mẫu độc lập, vì các cặp dùng lại cùng 76 đăng ký.”

## 1:10–1:50 — Biểu đồ 2: lý do

“Biểu đồ đường tách kích thước khỏi số sao. Đi dọc một đường, số sao không đổi nhưng màn hình lớn hơn thì median kWh tăng. Chẳng hạn cùng 5 sao, 55 inch có median 332, còn 85 inch là 750.

Đọc theo chiều dọc tại một kích thước thì nhóm nhiều sao hơn có median thấp hơn. Trục ngang là kích thước, không phải thời gian. Bảng bên dưới có số đăng ký cho từng điểm.”

## 1:50–2:20 — Biểu đồ 3: sao vẫn hữu ích

“Em không kết luận số sao vô dụng. Giữ cùng cỡ 65 inch, nhóm 3 sao có median 696,5 còn nhóm 7 sao là 250,5 kWh/năm, thấp hơn khoảng 64%. Mỗi nhóm chỉ có sáu đăng ký nên em không khái quát thành mức tiết kiệm chắc chắn cho mọi TV, và các tính năng chưa được ghép giống nhau.”

## 2:20–2:45 — Tác động đến người mua

“Thông điệp là đừng nâng kích thước chỉ vì chiếc lớn có nhiều sao hơn. Hãy chọn cỡ phù hợp nhu cầu. Nếu so khác cỡ thì đọc kWh/năm, nếu so cùng cỡ và tính năng tương tự thì dùng thêm sao.

Chênh lệch 84 kWh giữa hai median tương đương khoảng 25 đô một năm nếu giả sử 30 cent/kWh. Đây là ví dụ theo nhãn, không phải lời hứa giảm hóa đơn.”

## 2:45–3:00 — Workflow và giới hạn

“Workflow KNIME em đã đơn giản hoá: lọc dữ liệu, giữ một dòng cho mỗi đăng ký, đổi cm sang inch, tạo nhóm kích thước × sao, rồi tính median và hiển thị ba Bar Chart. Ba ảnh từ KNIME nằm ngay dưới biểu đồ trình bày tương ứng. Một phép kiểm tra CSV độc lập cho min–max và thử giữ lại các dòng biến thể; hướng kết quả vẫn như cũ. Bản KNIME này không có nhánh nối từng cặp hay CSV Writer.”

## Nếu thầy hỏi

- **Mới ở đâu so với Exercise 2?** Exercise 2 đã gợi ý nghiên cứu Star2. Phần mở rộng là câu hỏi quyết định mua hàng cụ thể, bằng chứng toàn bộ cohort, suy luận từ hai khoảng không chồng nhau, kiểm soát kích thước và sensitivity, không phải phát minh mới về nhãn.
- **Tại sao median?** Để mô tả điểm giữa của cohort, không để một cực trị quyết định trung bình. Biểu đồ 1 vẫn giữ toàn bộ min–max nên không che cực trị.
- **Tại sao không đếm từng Model_No?** Một Submit_ID có nhiều tên biến thể nhưng các trường phân tích nhất quán. Giữ một dòng mỗi đăng ký tránh biến thể có nhiều tên được tính nặng hơn.
- **Tại sao không đưa Uniden 0 sao?** Không có đăng ký 0 sao trong phạm vi đã lọc. Đưa vào sẽ trộn mẫu ngoài phạm vi với mẫu chính.
- **Có phải TV lớn luôn dùng nhiều hơn dù nhiều sao?** Không. Kết luận toàn bộ chỉ áp dụng hai cohort đã chỉ rõ. Thông điệp chung là nhiều sao không *đảm bảo* ít kWh khi đổi kích thước.
- **AI đã làm gì?** AI hỗ trợ mã web, phân tích, copy, tài liệu và bản workflow ban đầu. Em tự đơn giản hoá workflow và chụp ba chart từ KNIME. Không nên nói bản workflow đóng gói đã được chạy lại sau khi import.
