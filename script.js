document.querySelectorAll(".waitlist-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = form.querySelector(".form-status");
    const button = form.querySelector("button");
    const email = form.querySelector("input[type=email]").value;

    if (form.action.includes("YOUR_FORM_ID")) {
      status.textContent = "Waitlist isn't connected yet — add your Formspree endpoint in index.html.";
      status.dataset.state = "error";
      return;
    }

    button.disabled = true;
    status.textContent = "Submitting...";
    status.dataset.state = "";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        status.textContent = `You're on the list! We'll email ${email} when Crilo launches.`;
        status.dataset.state = "success";
        form.reset();
      } else {
        status.textContent = "Something went wrong. Please try again.";
        status.dataset.state = "error";
      }
    } catch (err) {
      status.textContent = "Something went wrong. Please check your connection and try again.";
      status.dataset.state = "error";
    } finally {
      button.disabled = false;
    }
  });
});
