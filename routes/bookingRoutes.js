const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Hiển thị danh sách đặt chỗ
router.get("/", bookingController.getAllBookings);

// Hiển thị form tạo đặt chỗ mới
router.get("/new", bookingController.getNewBookingForm);
router.post("/new", bookingController.createBooking);

// Hiển thị form chỉnh sửa đặt chỗ
router.get("/edit/:id", bookingController.getEditBookingForm);
router.post("/edit/:id", bookingController.updateBooking);

// Hủy đặt chỗ
router.post("/cancel/:id", bookingController.cancelBooking);

module.exports = router;
