const Request = require("../models/Request");
const intercom = require("../config/intercom");

exports.createRequest = async (req, res) => {
  try {
    const { category, comments } = req.body;

    // Get the userId and email from the authenticated user's token
    const userId = req.user.id.toString();
    const userEmail = req.user.email;

    // Create the request in the database
    const newRequest = await Request.create({
      userId: userId,
      category,
      comments,
    });

    // Ensure the contact exists in Intercom
    // Use the email to identify the contact
    await intercom
      .post("/contacts", {
        email: userEmail,
        user_id: userId,
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          // Contact already exists, ignore this error.
        } else {
          throw err;
        }
      });

    // Create an event using the email to identify the user
    await intercom.post("/events", {
      event_name: "customer_service_request",
      created_at: Math.floor(Date.now() / 1000),
      email: userEmail,
      metadata: {
        category,
        comments,
      },
    });

    res.json(newRequest);
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ error: "Error creating request" });
  }
};

exports.getRequestsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const userId = req.user.id.toString();

   
    const requests = await Request.find({ category, userId });

    res.json(requests);
  } catch (err) {
    console.error("Error retrieving requests:", err);
    res.status(500).json({ error: "Error retrieving requests" });
  }
};
