import { useState } from "react";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8080/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await response.json();

      console.log("Signup response: ", data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-screen h-screen text-white flex">
        <div className="w-1/2  border border-blue-100 ">
          <div className="min-h-full  ">
            <div className="text-center mt-36 ">
              <h1 className=" font-bold text-3xl mb-4 text-pink-400">
                Welcome Back
              </h1>

              <p className="px-40 pl-56 text-base-content/70">
                Create your account to start solving coding challenges, track
                your progress, and join our developer community.
              </p>
            </div>

            <form
              className="flex flex-col items-center gap-5 h-8/12 pt-11 pl-20"
              onSubmit={handleSubmit}
            >
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>

              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  minlength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>

              <label className="input validator ">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  required
                  placeholder="Username"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minlength="3"
                  maxlength="30"
                  title="Only letters, numbers or dash"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              {loading ? (
                <button className="btn w-36">
                  <span className="loading loading-spinner"></span>
                  Signing Up...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-48 pb-2 pt-2 pr-1.5 bg-sky-500 cursor-pointer rounded-md hover:bg-sky-700"
                >
                  Signup
                </button>
              )}
            </form>
          </div>
        </div>
        <div>right</div>
      </div>
    </>
  );
}

export default SignUpPage;
