const db = require("../config/db");

// ---------- Validation Function ----------
const validateSubscription = (data) => {

  const { user_email, plan_name, start_date, end_date, monthly_cost, status } = data;

  if (!user_email || !/\S+@\S+\.\S+/.test(user_email))
    return "Valid email required";

  if (!plan_name)
    return "Plan name required";

  if (!start_date)
    return "Start date required";

  if (!end_date)
    return "End date required";

  if (new Date(end_date) < new Date(start_date))
    return "End date must be after start date";

  if (monthly_cost < 0)
    return "Monthly cost must be non-negative";

  const validStatus = ["Active", "Expired", "Cancelled"];

  if (!validStatus.includes(status))
    return "Invalid status value";

  return null;
};

// ---------- GET ALL ----------
exports.getAllSubscriptions = (req, res) => {

  const sql = "SELECT * FROM subscriptions";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ---------- GET SINGLE ----------
exports.getSingleSubscription = (req, res) => {

  const id = req.params.id;

  const sql = "SELECT * FROM subscriptions WHERE subscription_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0)
      return res.status(404).json({ message: "Not found" });

    res.json(result[0]);
  });
};

// ---------- CREATE ----------
exports.createSubscription = (req, res) => {

  const error = validateSubscription(req.body);

  if (error)
    return res.status(400).json({ message: error });

  const {
    user_email,
    plan_name,
    start_date,
    end_date,
    monthly_cost,
    status
  } = req.body;

  const sql = `
    INSERT INTO subscriptions 
    (user_email, plan_name, start_date, end_date, monthly_cost, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql,
    [user_email, plan_name, start_date, end_date, monthly_cost, status],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Subscription created", id: result.insertId });
    }
  );
};

// ---------- UPDATE ----------
exports.updateSubscription = (req, res) => {

  const id = req.params.id;

  const error = validateSubscription(req.body);

  if (error)
    return res.status(400).json({ message: error });

  const {
    user_email,
    plan_name,
    start_date,
    end_date,
    monthly_cost,
    status
  } = req.body;

  const sql = `
    UPDATE subscriptions
    SET user_email=?, plan_name=?, start_date=?, end_date=?, monthly_cost=?, status=?
    WHERE subscription_id=?
  `;

  db.query(sql,
    [user_email, plan_name, start_date, end_date, monthly_cost, status, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Subscription updated" });
    }
  );
};

// ---------- DELETE ----------
exports.deleteSubscription = (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM subscriptions WHERE subscription_id=?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Subscription deleted" });
  });
};
