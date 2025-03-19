const bookings = [
    { id: 1, customerName: "Nguyễn Văn A", date: "2025-03-20", time: "14:00", status: "Pending" },
    { id: 2, customerName: "Trần Thị B", date: "2025-03-21", time: "16:00", status: "Confirmed" }
];

// 📌 Hiển thị danh sách đặt chỗ
exports.getAllBookings = (req, res) => {
    res.render("index", { bookings, message: req.session.message });
    delete req.session.message; // Xóa thông báo sau khi hiển thị
};

// 📌 Hiển thị form đặt chỗ mới
exports.getNewBookingForm = (req, res) => {
    res.render("new-booking");
};

// 📌 Tạo đặt chỗ mới
exports.createBooking = (req, res) => {
    const { customerName, date, time } = req.body;
    const today = new Date().toISOString().split("T")[0];

    // Kiểm tra nếu ngày đặt < hôm nay
    if (date < today) {
        req.session.message = { type: "error", text: "Không thể đặt lịch vào ngày đã qua!" };
        return res.redirect("/");
    }

    // Kiểm tra lịch trùng
    const isDuplicate = bookings.some(b => b.date === date && b.time === time);
    if (isDuplicate) {
        req.session.message = { type: "error", text: "Thời gian này đã được đặt, vui lòng chọn giờ khác!" };
        return res.redirect("/");
    }

    const newBooking = {
        id: bookings.length + 1,
        customerName,
        date,
        time,
        status: "Pending"
    };

    bookings.push(newBooking);
    req.session.message = { type: "success", text: "Đặt chỗ thành công!" };
    res.redirect("/");
};

// 📌 Hiển thị form chỉnh sửa đặt chỗ
exports.getEditBookingForm = (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);
    res.render("edit-booking", { booking });
};

// 📌 Cập nhật đặt chỗ
exports.updateBooking = (req, res) => {
    let booking = bookings.find(b => b.id == req.params.id);
    const { customerName, date, time } = req.body;
    const today = new Date().toISOString().split("T")[0];

    if (date < today) {
        req.session.message = { type: "error", text: "Không thể cập nhật lịch vào ngày đã qua!" };
        return res.redirect("/");
    }

    const isDuplicate = bookings.some(b => b.id != booking.id && b.date === date && b.time === time);
    if (isDuplicate) {
        req.session.message = { type: "error", text: "Thời gian này đã được đặt, vui lòng chọn giờ khác!" };
        return res.redirect("/");
    }

    booking.customerName = customerName;
    booking.date = date;
    booking.time = time;

    req.session.message = { type: "success", text: "Cập nhật đặt chỗ thành công!" };
    res.redirect("/");
};

// 📌 Hủy đặt chỗ
exports.cancelBooking = (req, res) => {
    let booking = bookings.find(b => b.id == req.params.id);
    booking.status = "Cancelled";
    req.session.message = { type: "success", text: "Hủy đặt chỗ thành công!" };
    res.redirect("/");
};
