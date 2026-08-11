import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiTrendingDown,
  FiArrowLeft,
  FiShoppingBag,
  FiCalendar,
  FiTag,
  FiCreditCard,
  FiFileText,
  FiFilter,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { transactionService } from "../services/transactionService";
import toast from "react-hot-toast";

/* =========================================================
   LOCAL HELPERS
   ========================================================= */

const formatCurrency = (value) => {
  const amount = Number(value || 0);

  return `₹${amount.toLocaleString("en-IN")}`;
};

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


/* =========================================================
   EXPENSE CATEGORIES
   ========================================================= */

const EXPENSE_CATEGORIES = [
  "Housing & Rent",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Healthcare",
  "Education",
  "Travel",
  "Other",
];


/* =========================================================
   EMPTY FORM
   ========================================================= */

const EMPTY_FORM = {
  description: "",
  amount: "",
  category: "",
  date: new Date().toISOString().slice(0, 10),
  notes: "",
};


/* =========================================================
   EXPENSE PAGE
   ========================================================= */

export default function Expense() {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);

  const [confirm, setConfirm] = useState({
    open: false,
    id: null,
  });

  const [form, setForm] = useState(EMPTY_FORM);

  const [editId, setEditId] = useState(null);

  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [filter, setFilter] = useState("All");


  /* =========================================================
     FETCH EXPENSES
     ========================================================= */

  const fetchItems = async () => {

    try {

      setLoading(true);

      const res = await transactionService.getAll({
        type: "expense",
      });

      setItems(
        res?.transactions ||
        res ||
        []
      );

    } catch (error) {

      console.error("Expense fetch error:", error);

      /*
       * We don't replace the user's real data with fake
       * transactions if the API fails.
       */

      setItems([]);

      toast.error(
        error?.response?.data?.message ||
        "Unable to load expenses"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchItems();

  }, []);


  /* =========================================================
     TOTAL EXPENSE
     ========================================================= */

  const totalExpense = items.reduce(
    (sum, item) =>
      sum + Number(item.amount || 0),
    0
  );


  /* =========================================================
     FILTER
     ========================================================= */

  const filteredItems =
    filter === "All"
      ? items
      : items.filter(
          (item) =>
            item.category === filter
        );


  /* =========================================================
     ADD
     ========================================================= */

  const openAdd = () => {

    setForm({
      ...EMPTY_FORM,
      date: new Date()
        .toISOString()
        .slice(0, 10),
    });

    setEditId(null);

    setModal(true);

  };


  /* =========================================================
     EDIT
     ========================================================= */

  const openEdit = (item) => {

    setForm({

      description:
        item.description ||
        item.title ||
        "",

      amount:
        item.amount ||
        "",

      category:
        item.category ||
        "",

      date:
        item.date
          ? item.date.slice(0, 10)
          : new Date()
              .toISOString()
              .slice(0, 10),

      notes:
        item.notes ||
        "",
    });

    setEditId(item._id);

    setModal(true);

  };


  /* =========================================================
     SAVE
     ========================================================= */

  const handleSave = async (e) => {

    e.preventDefault();


    if (
      !form.description ||
      !form.amount ||
      !form.category
    ) {

      toast.error(
        "Description, amount and category are required"
      );

      return;
    }


    if (Number(form.amount) <= 0) {

      toast.error(
        "Amount must be greater than zero"
      );

      return;
    }


    setSaving(true);


    try {

      const payload = {

        description:
          form.description,

        amount:
          Number(form.amount),

        category:
          form.category,

        date:
          form.date,

        notes:
          form.notes,

        type:
          "expense",
      };


      if (editId) {

        await transactionService.update(
          editId,
          payload
        );

        toast.success(
          "Expense updated successfully"
        );

      } else {

        await transactionService.create(
          payload
        );

        toast.success(
          "Expense added successfully"
        );

      }


      setModal(false);

      setEditId(null);

      setForm(EMPTY_FORM);

      await fetchItems();


    } catch (error) {

      console.error(
        "Expense save error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Unable to save expense"
      );

    } finally {

      setSaving(false);

    }
  };


  /* =========================================================
     DELETE
     ========================================================= */

  const handleDelete = async () => {

    if (!confirm.id) return;

    setDeleting(true);


    try {

      await transactionService.delete(
        confirm.id
      );

      toast.success(
        "Expense deleted successfully"
      );


      setConfirm({
        open: false,
        id: null,
      });


      await fetchItems();


    } catch (error) {

      console.error(
        "Expense delete error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Unable to delete expense"
      );

    } finally {

      setDeleting(false);

    }
  };


  /* =========================================================
     CLOSE MODAL
     ========================================================= */

  const closeModal = () => {

    if (saving) return;

    setModal(false);

    setEditId(null);

    setForm(EMPTY_FORM);

  };


  /* =========================================================
     UI
     ========================================================= */

  return (

    <div className="min-h-full px-4 md:px-6 lg:px-8 py-6">

      <div className="max-w-6xl mx-auto">


        {/* =================================================
            BACK TO DASHBOARD
            ================================================= */}

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="
            flex
            items-center
            gap-2
            text-sm
            text-[#7f8ea3]
            hover:text-white
            transition
            mb-5
          "
        >

          <FiArrowLeft size={15} />

          Back to Dashboard

        </button>


        {/* =================================================
            HEADER
            ================================================= */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-[#493343]
                to-[#302531]
                border
                border-[#704b60]
                flex
                items-center
                justify-center
                text-[#ee8da9]
                shadow-lg
              "
            >

              <FiTrendingDown
                size={24}
              />

            </div>


            <div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.15em]
                  text-[#71829a]
                "
              >
                Spending Management
              </p>


              <h1
                className="
                  text-2xl
                  md:text-3xl
                  font-bold
                  text-white
                  mt-1
                "
              >
                Expenses
              </h1>


              <p
                className="
                  text-sm
                  text-[#8190a3]
                  mt-1
                "
              >
                Manage and track where your money goes.
              </p>

            </div>

          </div>


          {/* ADD BUTTON */}

          <button
            onClick={openAdd}
            className="
              h-11
              px-5
              rounded-xl
              bg-gradient-to-r
              from-[#e25c7d]
              to-[#ef708e]
              text-white
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-[0_6px_20px_rgba(226,92,125,0.18)]
              hover:from-[#ef708e]
              hover:to-[#f27f9b]
              transition
            "
          >

            <FiPlus size={17} />

            Add Expense

          </button>

        </div>


        {/* =================================================
            TOTAL EXPENSE CARD
            ================================================= */}

        <div
          className="
            mt-7
            rounded-3xl
            border
            border-red-500/20
            bg-gradient-to-br
            from-red-500/10
            via-[#211f29]
            to-[#1b222c]
            p-6
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-5
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  flex
                  items-center
                  justify-center
                  text-red-400
                "
              >

                <FiTrendingDown
                  size={22}
                />

              </div>


              <div>

                <p
                  className="
                    text-xs
                    text-[#7d8998]
                  "
                >
                  Total Expenses
                </p>


                <p
                  className="
                    text-3xl
                    font-bold
                    text-red-400
                    mt-1
                  "
                >
                  {formatCurrency(
                    totalExpense
                  )}
                </p>

              </div>

            </div>


            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                text-[#768396]
              "
            >

              <FiCreditCard />

              {items.length}

              {" "}

              {items.length === 1
                ? "transaction"
                : "transactions"}

            </div>

          </div>

        </div>


        {/* =================================================
            FILTER
            ================================================= */}

        <div className="mt-7">

          <div
            className="
              flex
              items-center
              gap-2
              mb-3
            "
          >

            <FiFilter
              className="text-[#718096]"
              size={14}
            />

            <span
              className="
                text-xs
                font-medium
                text-[#8794a5]
              "
            >
              Filter by category
            </span>

          </div>


          <div
            className="
              flex
              gap-2
              overflow-x-auto
              pb-2
            "
          >

            {[
              "All",
              ...EXPENSE_CATEGORIES,
            ].map((category) => (

              <button
                key={category}
                onClick={() =>
                  setFilter(category)
                }
                className={`
                  px-4
                  py-2
                  rounded-xl
                  text-xs
                  font-semibold
                  whitespace-nowrap
                  border
                  transition

                  ${
                    filter === category
                      ? `
                        bg-[#385c83]
                        border-[#4c78a8]
                        text-white
                      `
                      : `
                        bg-[#1b222c]
                        border-[#303b4b]
                        text-[#7f8c9d]
                        hover:text-white
                        hover:border-[#425266]
                      `
                  }
                `}
              >

                {category}

              </button>

            ))}

          </div>

        </div>


        {/* =================================================
            RECENT EXPENSES
            ================================================= */}

        <div className="mt-5">

          <div
            className="
              flex
              items-center
              justify-between
              mb-4
            "
          >

            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Recent Expenses
              </h2>


              <p
                className="
                  text-xs
                  text-[#718096]
                  mt-1
                "
              >
                Your recorded spending transactions.
              </p>

            </div>


            <span
              className="
                text-xs
                text-[#657386]
              "
            >
              {filteredItems.length} shown
            </span>

          </div>


          {/* LOADING */}

          {loading ? (

            <div
              className="
                rounded-3xl
                border
                border-[#303b4b]
                bg-[#1b222c]
                p-12
                text-center
                text-[#718096]
              "
            >

              Loading expenses...

            </div>

          ) : filteredItems.length === 0 ? (

            /* EMPTY */

            <div
              className="
                rounded-3xl
                border
                border-[#303b4b]
                bg-[#1b222c]
                p-12
                text-center
              "
            >

              <FiShoppingBag
                size={30}
                className="
                  mx-auto
                  text-[#566a80]
                  mb-4
                "
              />


              <h3
                className="
                  text-white
                  font-semibold
                "
              >
                No expenses found
              </h3>


              <p
                className="
                  text-sm
                  text-[#718096]
                  mt-2
                  mb-5
                "
              >
                Add your first expense to start tracking your spending.
              </p>


              <button
                onClick={openAdd}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  bg-[#e25c7d]
                  text-white
                  text-sm
                  font-semibold
                  inline-flex
                  items-center
                  gap-2
                "
              >

                <FiPlus size={15} />

                Add Expense

              </button>

            </div>

          ) : (

            /* EXPENSE LIST */

            <div
              className="
                space-y-3
              "
            >

              {filteredItems.map(
                (item) => (

                  <div
                    key={item._id}
                    className="
                      group
                      rounded-2xl
                      border
                      border-[#303b4b]
                      bg-gradient-to-r
                      from-[#1d2631]
                      to-[#1a212b]
                      p-4
                      md:p-5
                      hover:border-[#41536a]
                      transition
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >

                      {/* ICON */}

                      <div
                        className="
                          hidden
                          sm:flex
                          w-11
                          h-11
                          rounded-xl
                          bg-[#2b2934]
                          border
                          border-[#453846]
                          items-center
                          justify-center
                          text-[#df809b]
                          flex-shrink-0
                        "
                      >

                        <FiShoppingBag
                          size={18}
                        />

                      </div>


                      {/* DETAILS */}

                      <div
                        className="
                          flex-1
                          min-w-0
                        "
                      >

                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-white
                            truncate
                          "
                        >
                          {item.description ||
                            item.title ||
                            "Expense"}
                        </h3>


                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-2
                            mt-2
                          "
                        >

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              px-2.5
                              py-1
                              rounded-lg
                              bg-[#293443]
                              text-[#94b5d8]
                              text-[10px]
                              font-semibold
                            "
                          >

                            <FiTag
                              size={10}
                            />

                            {item.category ||
                              "Other"}

                          </span>


                          <span
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              text-[11px]
                              text-[#718096]
                            "
                          >

                            <FiCalendar
                              size={11}
                            />

                            {formatDate(
                              item.date
                            )}

                          </span>

                        </div>

                      </div>


                      {/* AMOUNT + ACTIONS */}

                      <div
                        className="
                          text-right
                          flex-shrink-0
                        "
                      >

                        <p
                          className="
                            text-sm
                            md:text-base
                            font-bold
                            text-red-400
                          "
                        >
                          - {formatCurrency(
                            item.amount
                          )}
                        </p>


                        <div
                          className="
                            flex
                            items-center
                            justify-end
                            gap-1
                            mt-2
                          "
                        >

                          <button
                            onClick={() =>
                              openEdit(item)
                            }
                            className="
                              w-8
                              h-8
                              rounded-lg
                              flex
                              items-center
                              justify-center
                              text-[#718096]
                              hover:text-[#7db8f5]
                              hover:bg-[#293748]
                              transition
                            "
                            title="Edit"
                          >

                            <FiEdit2
                              size={14}
                            />

                          </button>


                          <button
                            onClick={() =>
                              setConfirm({
                                open: true,
                                id: item._id,
                              })
                            }
                            className="
                              w-8
                              h-8
                              rounded-lg
                              flex
                              items-center
                              justify-center
                              text-[#718096]
                              hover:text-red-400
                              hover:bg-red-500/10
                              transition
                            "
                            title="Delete"
                          >

                            <FiTrash2
                              size={14}
                            />

                          </button>

                        </div>

                      </div>

                    </div>


                    {/* NOTES */}

                    {item.notes && (

                      <div
                        className="
                          mt-4
                          pt-3
                          border-t
                          border-[#2b3542]
                          flex
                          items-start
                          gap-2
                          text-xs
                          text-[#718096]
                        "
                      >

                        <FiFileText
                          className="
                            mt-0.5
                            flex-shrink-0
                          "
                        />

                        <span>
                          {item.notes}
                        </span>

                      </div>

                    )}

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>


      {/* =================================================
          ADD / EDIT MODAL
          ================================================= */}

      {modal && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-lg
              max-h-[90vh]
              overflow-y-auto
              rounded-3xl
              bg-[#1d2530]
              border
              border-[#344254]
              shadow-2xl
            "
          >

            {/* MODAL HEADER */}

            <div
              className="
                px-6
                py-5
                border-b
                border-[#303b4b]
                sticky
                top-0
                bg-[#1d2530]
                z-10
              "
            >

              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                {editId
                  ? "Edit Expense"
                  : "Add Expense"}
              </h2>


              <p
                className="
                  text-xs
                  text-[#718096]
                  mt-1
                "
              >
                Record your spending details.
              </p>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSave}
              className="
                p-6
                space-y-5
              "
            >

              {/* DESCRIPTION */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    text-[#9ba9ba]
                    mb-2
                  "
                >
                  Description
                </label>


                <input
                  type="text"
                  placeholder="e.g. Grocery shopping"
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-[#151b23]
                    border
                    border-[#303b4b]
                    text-white
                    text-sm
                    placeholder:text-[#596677]
                    outline-none
                    focus:border-[#4b91e2]
                  "
                  required
                />

              </div>


              {/* AMOUNT */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    text-[#9ba9ba]
                    mb-2
                  "
                >
                  Amount
                </label>


                <input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      amount:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-[#151b23]
                    border
                    border-[#303b4b]
                    text-white
                    text-sm
                    placeholder:text-[#596677]
                    outline-none
                    focus:border-[#4b91e2]
                  "
                  required
                />

              </div>


              {/* CATEGORY */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    text-[#9ba9ba]
                    mb-2
                  "
                >
                  Category
                </label>


                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-[#151b23]
                    border
                    border-[#303b4b]
                    text-white
                    text-sm
                    outline-none
                    focus:border-[#4b91e2]
                  "
                  required
                >

                  <option value="">
                    Select category
                  </option>


                  {EXPENSE_CATEGORIES.map(
                    (category) => (

                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* DATE */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    text-[#9ba9ba]
                    mb-2
                  "
                >
                  Date
                </label>


                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      date:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-[#151b23]
                    border
                    border-[#303b4b]
                    text-white
                    text-sm
                    outline-none
                    focus:border-[#4b91e2]
                  "
                  required
                />

              </div>


              {/* NOTES */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    text-[#9ba9ba]
                    mb-2
                  "
                >
                  Notes
                </label>


                <textarea
                  rows="3"
                  placeholder="Optional notes..."
                  value={form.notes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notes:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    resize-none
                    px-4
                    py-3
                    rounded-xl
                    bg-[#151b23]
                    border
                    border-[#303b4b]
                    text-white
                    text-sm
                    placeholder:text-[#596677]
                    outline-none
                    focus:border-[#4b91e2]
                  "
                />

              </div>


              {/* BUTTONS */}

              <div
                className="
                  flex
                  gap-3
                  pt-2
                "
              >

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    flex-1
                    h-11
                    rounded-xl
                    bg-[#29323e]
                    text-[#a5b1bf]
                    text-sm
                    font-semibold
                    hover:bg-[#323d4b]
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="
                    flex-1
                    h-11
                    rounded-xl
                    bg-gradient-to-r
                    from-[#e25c7d]
                    to-[#ef708e]
                    text-white
                    text-sm
                    font-semibold
                    disabled:opacity-50
                  "
                >

                  {saving
                    ? "Saving..."
                    : editId
                    ? "Update Expense"
                    : "Add Expense"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =================================================
          DELETE CONFIRMATION
          ================================================= */}

      {confirm.open && (

        <div
          className="
            fixed
            inset-0
            z-[60]
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-sm
              rounded-3xl
              bg-[#1d2530]
              border
              border-[#344254]
              p-6
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                mb-4
              "
            >

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-red-500/10
                  flex
                  items-center
                  justify-center
                  text-red-400
                "
              >

                <FiTrash2 />

              </div>


              <h3
                className="
                  font-semibold
                  text-white
                "
              >
                Delete Expense?
              </h3>

            </div>


            <p
              className="
                text-sm
                text-[#8492a4]
                leading-6
              "
            >
              Are you sure you want to delete
              this expense? This action cannot
              be undone.
            </p>


            <div
              className="
                flex
                gap-3
                mt-6
              "
            >

              <button
                onClick={() =>
                  setConfirm({
                    open: false,
                    id: null,
                  })
                }
                disabled={deleting}
                className="
                  flex-1
                  h-11
                  rounded-xl
                  bg-[#29323e]
                  text-[#a5b1bf]
                  text-sm
                  font-semibold
                  disabled:opacity-50
                "
              >
                Cancel
              </button>


              <button
                onClick={handleDelete}
                disabled={deleting}
                className="
                  flex-1
                  h-11
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  text-sm
                  font-semibold
                  disabled:opacity-50
                "
              >

                {deleting
                  ? "Deleting..."
                  : "Delete"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}