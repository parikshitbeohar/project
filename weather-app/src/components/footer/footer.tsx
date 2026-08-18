export const Footer = () => {
  return (
    <footer className="mt-8 border-t border-gray-200 bg-white/60 px-4 py-8 text-gray-700">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
            About Sky Check
          </h2>
          <p className="text-sm text-gray-600">
            Sky Check gives you fast, accurate weather for any city or UK postcode — built with
            real-time data and a clean, simple interface designed to get you the forecast without
            the clutter.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">FAQ</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <span className="font-medium text-gray-800">Is Sky Check free to use?</span>
              <br />
              Yes, completely free, no account required.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
            Contact
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Email: hello@skycheck.example</li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Sky Check. Built as a technical demonstration project.
      </div>
    </footer>
  );
};
