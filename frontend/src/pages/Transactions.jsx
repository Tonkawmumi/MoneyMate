import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { forwardRef } from "react";
import { motion } from "framer-motion";

import { Pencil, Trash2 } from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

import {
  Plus,
  CalendarDays,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

registerLocale("th", th);

const MonthYearInput = forwardRef(({ value, onClick }, ref) => (
  <input
    ref={ref}
    value={value}
    onClick={onClick}
    readOnly
    className="
      w-full
      cursor-pointer
      rounded-xl
      border border-border
      bg-card
      px-4 py-3 pr-10

      outline-none
      ring-0

      transition-all duration-200

      hover:border-primary/40
      hover:bg-muted/20
      hover:shadow-sm

      focus:border-primary
      focus:ring-2
      focus:ring-primary/10
    "
  />
));

function Transactions() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const thaiMonthYear = `${format(selectedMonth, "MMMM", {
    locale: th,
  })} ${selectedMonth.getFullYear() + 543}`;

  const [transactionType, setTransactionType] = useState("all");

  const [openModal, setOpenModal] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState("expense");
  const [category, setCategory] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">รายการธุรกรรม</h1>

          <p className="mt-1 text-muted-foreground">
            ตรวจสอบและจัดการธุรกรรมทางการเงินล่าสุดของคุณ
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="
            flex items-center justify-center gap-2
            rounded-xl
            bg-primary
            px-6 py-3
            font-semibold
            text-white
            shadow-lg shadow-primary/20
            transition-all
            duration-200
            hover:bg-primary/90
            active:scale-95
          "
        >
          <Plus size={20} />
          เพิ่มรายการ
        </button>
      </div>

      {/* Search + Filters */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-end">
        {/* Search */}
        <div className="relative lg:col-span-4">
          <Search
            size={18}
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <input
            type="text"
            placeholder="ค้นหาชื่อรายการ..."
            className="
              w-full
              rounded-xl
              border border-border
              bg-card
              py-3 pl-12 pr-4
              outline-none
              cursor-text
              transition-all duration-200

              hover:border-primary/40
              hover:shadow-sm

              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
            "
          />
        </div>

        {/* Category */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            หมวดหมู่
          </label>

          <select
            className="
              w-full
              rounded-xl
              border border-border
              bg-card
              px-4 py-3

              cursor-pointer
              outline-none
              ring-0

              transition-all duration-200

              hover:border-primary/40
              hover:bg-muted/20
              hover:shadow-sm

              focus:outline-none
              focus:ring-2
              focus:ring-primary/10
              focus:border-primary
            "
          >
            <option>ทุกหมวดหมู่</option>
            <option>อาหารและเครื่องดื่ม</option>
            <option>เสื้อผ้า</option>
            <option>อิเล็กทรอนิกส์</option>
            <option>บันเทิง</option>
            <option>เดินทาง</option>
            <option>รายได้</option>
            <option>อื่นๆ</option>
          </select>
        </div>

        {/* Period */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            ช่วงเวลา
          </label>

          <div className="relative">
            <DatePicker
              selected={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              locale="th"
              showMonthYearPicker
              dateFormat="MMMM yyyy"
              customInput={<MonthYearInput />}
            />

            <CalendarDays
              size={18}
              className="
                pointer-events-none
                absolute right-3 top-1/2
                -translate-y-1/2
                text-muted-foreground
                transition-colors

                group-hover:text-primary
              "
            />
          </div>
        </div>

        {/* Type */}
        <div className="lg:col-span-4">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            ประเภท
          </label>

          <div
            className="
              flex gap-1
              rounded-xl
              bg-muted
              p-1
            "
          >
            <button
              onClick={() => setTransactionType("all")}
              className={`
                flex-1 rounded-lg px-2 py-2 text-sm transition-all
                ${
                  transactionType === "all"
                    ? "bg-card text-primary font-medium shadow-sm"
                    : "text-muted-foreground hover:text-primary"
                }
              `}
            >
              ทั้งหมด
            </button>

            <button
              onClick={() => setTransactionType("income")}
              className={`
                flex-1 rounded-lg px-2 py-2 text-sm transition-all
                ${
                  transactionType === "income"
                    ? "bg-card text-primary font-medium shadow-sm"
                    : "text-muted-foreground hover:text-primary"
                }
              `}
            >
              รายรับ
            </button>

            <button
              onClick={() => setTransactionType("expense")}
              className={`
                flex-1 rounded-lg px-2 py-2 text-sm transition-all
                ${
                  transactionType === "expense"
                    ? "bg-card text-primary font-medium shadow-sm"
                    : "text-muted-foreground hover:text-primary"
                }
              `}
            >
              รายจ่าย
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/70">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                  วันที่
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                  รายการ
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                  หมวดหมู่
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                  ประเภท
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">
                  จำนวนเงิน
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                  จัดการ
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {/* Row 1 */}
              <tr className="group transition-colors hover:bg-muted/20">
                <td className="px-6 py-4 text-muted-foreground">
                  24 มิ.ย. 2569
                </td>

                <td className="px-6 py-4">
                  <span className="font-medium">Netflix Premium</span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className="
                      rounded-full
                      bg-[var(--category-entertainment-bg)]
                      px-3 py-1
                      text-sm
                    "
                    style={{
                      color: "var(--category-entertainment)",
                    }}
                  >
                    บันเทิง
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="font-medium text-red-500">รายจ่าย</span>
                </td>

                <td className="px-6 py-4 text-right font-bold text-red-500">
                  -฿299
                </td>

                <td className="px-6 py-4">
                  <div
                    className="
                      flex justify-center gap-2
                    "
                  >
                    <button
                      className="
                        rounded-lg p-2
                        text-muted-foreground
                        hover:bg-primary/10
                        hover:text-primary
                      "
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="
                        rounded-lg p-2
                        text-muted-foreground
                        hover:bg-red-100
                        hover:text-red-500
                      "
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="group transition-colors hover:bg-muted/20">
                <td className="px-6 py-4 text-muted-foreground">
                  23 มิ.ย. 2569
                </td>

                <td className="px-6 py-4">
                  <span className="font-medium">เงินเดือน</span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className="
                      rounded-full
                      bg-[var(--category-income-bg)]
                      px-3 py-1
                      text-sm
                    "
                    style={{
                      color: "var(--category-income)",
                    }}
                  >
                    รายได้
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="font-medium text-green-600">รายรับ</span>
                </td>

                <td className="px-6 py-4 text-right font-bold text-green-600">
                  +฿25,000
                </td>

                <td className="px-6 py-4">
                  <div
                    className="
                      flex justify-center gap-2
                    "
                  >
                    <button
                      className="
                        rounded-lg p-2
                        text-muted-foreground
                        hover:bg-primary/10
                        hover:text-primary
                      "
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="
                        rounded-lg p-2
                        text-muted-foreground
                        hover:bg-red-100
                        hover:text-red-500
                      "
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          className="
            flex items-center
            justify-between
            border-t border-border
            bg-muted/10
            px-6 py-4
          "
        >
          <span className="text-sm text-muted-foreground">
            แสดง 1 - 10 จากทั้งหมด 42 รายการ
          </span>

          <div className="flex items-center gap-3">
            <button
              className="
                flex items-center gap-2
                rounded-xl
                border border-border
                bg-card
                px-5 py-2.5
                text-sm font-medium
                text-muted-foreground
                transition-all
                hover:bg-muted
              "
            >
              <ChevronLeft size={16} />
              ก่อนหน้า
            </button>

            <button
              className="
                flex items-center gap-2
                rounded-xl
                border border-border
                bg-card
                px-5 py-2.5
                text-sm font-medium
                text-foreground
                transition-all
                hover:bg-muted
              "
            >
              ถัดไป
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {openModal && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40
            backdrop-blur-sm
            p-4
          "
        >
          <div
            className="
              w-full max-w-2xl
              overflow-hidden
              rounded-3xl
              bg-card
              shadow-2xl
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-6">
              <div>
                <h2 className="text-2xl font-bold">เพิ่มรายการธุรกรรม</h2>

                <p className="text-sm text-muted-foreground">
                  บันทึกรายรับหรือรายจ่ายใหม่
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  text-muted-foreground
                  hover:bg-muted
                "
              >
                ✕
              </button>
            </div>

            <form className="space-y-6 p-6">
              {/* Type */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  ประเภทรายการ
                </label>

                <div className="grid grid-cols-2 gap-4">
                  {/* รายจ่าย */}
                  <button
                    type="button"
                    onClick={() => {
                      setNewTransactionType("expense");
                      setCategory("");
                    }}
                    className={`
                      flex items-center justify-center gap-2
                      rounded-2xl border-2 py-4
                      font-semibold transition-all

                      ${
                        newTransactionType === "expense"
                          ? "border-red-400 bg-red-50 text-red-500"
                          : "border-border bg-card text-muted-foreground hover:border-red-300"
                      }
                    `}
                  >
                    <ArrowDownRight size={20} />
                    รายจ่าย
                  </button>

                  {/* รายรับ */}
                  <button
                    type="button"
                    onClick={() => {
                      setNewTransactionType("income");
                      setCategory("รายได้");
                    }}
                    className={`
                      flex items-center justify-center gap-2
                      rounded-2xl border-2 py-4
                      font-semibold transition-all

                      ${
                        newTransactionType === "income"
                          ? "border-green-500 bg-green-50 text-green-600"
                          : "border-border bg-card text-muted-foreground hover:border-green-300"
                      }
                    `}
                  >
                    <ArrowUpRight size={20} />
                    รายรับ
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  ชื่อรายการ
                </label>

                <input
                  type="text"
                  placeholder="กาแฟ, โทรศัพท์"
                  className="
                    w-full
                    rounded-xl
                    border border-border
                    bg-card
                    py-3 pl-4 pr-4
                    outline-none
                    cursor-text
                    transition-all duration-200

                    hover:border-primary/40
                    hover:shadow-sm

                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>

              {/* Amount + Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    จำนวนเงิน
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">
                      ฿
                    </span>

                    <input
                      type="number"
                      placeholder="50"
                      className="
                        w-full
                        rounded-xl
                        border border-border
                        bg-card
                        py-3 pl-7 pr-4
                        outline-none
                        cursor-text
                        transition-all duration-200

                        hover:border-primary/40
                        hover:shadow-sm

                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    หมวดหมู่
                  </label>

                  {newTransactionType === "income" ? (
                    <input
                      value="เลือกหมวดหมู่"
                      readOnly
                      className="
                        w-full rounded-2xl
                        border border-border
                        bg-muted
                        px-4 py-3
                        text-muted-foreground
                        cursor-not-allowed
                      "
                    />
                  ) : (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="
                        w-full
                        rounded-xl
                        border border-border
                        bg-card
                        px-4 py-3

                        cursor-pointer
                        outline-none
                        ring-0

                        transition-all duration-200

                        hover:border-primary/40
                        hover:bg-muted/20
                        hover:shadow-sm

                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary/10
                        focus:border-primary
                      "
                    >
                      <option value="">เลือกหมวดหมู่</option>

                      <option value="อาหารและเครื่องดื่ม">
                        อาหารและเครื่องดื่ม
                      </option>
                      <option value="เสื้อผ้า">เสื้อผ้า</option>
                      <option value="อิเล็กทรอนิกส์">อิเล็กทรอนิกส์</option>
                      <option value="บันเทิง">บันเทิง</option>
                      <option value="เดินทาง">เดินทาง</option>
                      <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  วันที่ทำรายการ
                </label>

                <input
                  type="date"
                  className="
                    w-full
                    cursor-pointer
                    rounded-xl
                    border border-border
                    bg-card
                    px-4 py-3 pr-10

                    outline-none
                    ring-0

                    transition-all duration-200

                    hover:border-primary/40
                    hover:bg-muted/20
                    hover:shadow-sm

                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>

              {/* Footer */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="
                    flex-1 rounded-2xl
                    border border-border
                    py-3 font-medium
                    hover:bg-muted
                  "
                >
                  ยกเลิก
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowSuccess(true);
                    setOpenModal(false);
                  }}
                  className="
                    flex-1 rounded-2xl
                    bg-primary py-3
                    font-medium text-white
                    transition-all
                    hover:opacity-90
                  "
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-[60]
            flex items-center justify-center
            bg-black/40
            backdrop-blur-sm
            p-4
          "
        >
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
              y: 30,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 15,
            }}
            className="
              w-full max-w-md
              rounded-3xl
              bg-card
              p-8
              text-center
              shadow-2xl
            "
          >
            {/* Success Icon */}
            <motion.div
              initial={{
                scale: 0,
                rotate: -180,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="
                mx-auto
                flex h-24 w-24
                items-center justify-center
                rounded-full
              "
              style={{
                backgroundColor: "var(--category-income-bg)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.3,
                }}
                className="
                  flex h-16 w-16
                  items-center justify-center
                  rounded-full
                  border-2
                "
                style={{
                  borderColor: "var(--category-income)",
                  color: "var(--category-income)",
                }}
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Title */}
            <h3 className="mt-8 mb-10 text-2xl font-bold">
              บันทึกข้อมูลสำเร็จ
            </h3>

            {/* Button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="
                w-full
                rounded-2xl
                py-3
                font-semibold
                text-white
                transition-all
                hover:opacity-90
                active:scale-95
              "
              style={{
                backgroundColor: "var(--category-income)",
              }}
            >
              ตกลง
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Transactions;
