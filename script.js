const countdown = document.getElementById("countdown");
if (countdown) {
  const target = new Date(countdown.dataset.target).getTime();
  const days = document.getElementById("cd-days");
  const hours = document.getElementById("cd-hours");
  const mins = document.getElementById("cd-mins");
  const secs = document.getElementById("cd-secs");

  const pad = (n) => String(n).padStart(2, "0");

  const tick = () => {
    const diff = target - Date.now();

    if (diff <= 0) {
      days.textContent = "00";
      hours.textContent = "00";
      mins.textContent = "00";
      secs.textContent = "00";
      clearInterval(timer);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    days.textContent = pad(Math.floor(totalSeconds / 86400));
    hours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
    mins.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
    secs.textContent = pad(totalSeconds % 60);
  };

  tick();
  const timer = setInterval(tick, 1000);
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = contactForm.querySelector(".form-status");
    const button = contactForm.querySelector("button");

    button.disabled = true;
    status.textContent = "Sending...";
    status.dataset.state = "";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm),
      });

      if (response.ok) {
        status.textContent = "Thanks — we got your message and will get back to you soon.";
        status.dataset.state = "success";
        contactForm.reset();
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
}

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
