
// export default HomePage;
import { useState, useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
// ---------------------------------------------
// Re-usable UI sub-components
// ---------------------------------------------
function LanguageChoice({ languages, value, onChange, onNext, locked }) {
  return (
    <div className="w-full flex flex-col items-center mt-8">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4 text-center">
        Repo Reaper found these languages in your repository.<br />
        <span className="font-medium text-zinc-400">
          Which language do you want to proceed with?
        </span>
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-2">
        {Object.keys(languages).map((lang) => (
          <label
            key={lang}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition select-none border
              ${
                value === lang
                  ? "bg-fuchsia-800/20 border-fuchsia-400 shadow-lg"
                  : "bg-zinc-900 border-zinc-700"
              }
              ${locked ? "opacity-60 pointer-events-none" : ""}
            `}
          >
            <input
              type="radio"
              name="language"
              value={lang}
              checked={value === lang}
              disabled={locked}
              onChange={() => onChange(lang)}
              className="accent-fuchsia-500"
            />
            <span className="text-zinc-100 font-medium">{lang}</span>
          </label>
        ))}
      </div>

      <button
        disabled={!value || locked}
        onClick={onNext}
        className="mt-7 px-6 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500
                   text-white font-semibold hover:scale-105 hover:shadow-lg transition
                   disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        Next Step
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-6 w-6 text-fuchsia-400 mx-2"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}

import "github-markdown-css/github-markdown-light.css"; // Use github-markdown-dark.css for dark mode

function MarkdownDoc({ source }) {
  return (
    <div className="markdown-body rounded-lg border border-gray-600 overflow-hidden" style={{ maxWidth: 800, margin: "20px auto", padding: "2rem" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
const markdownContent ="# 🚗 Car Management API Documentation\n\nWelcome to the **Car Management API**, where you can manage accounts, cars, and their relationships. This doc covers endpoints, models, and example requests only.\n\n---\n\n## Endpoints\n\n### 1. Get All Accounts\n**GET** `/api/accounts`\n**Description:** Retrieve a list of all accounts.\n\n**Example `curl`**\n```\ncurl -X GET \"https://api.example.com/api/accounts\"\n-H \"Accept: application/json\"\n```\n\n### 2. Get Account by ID\n**GET** `/api/accounts/{_id}`\n**Description:** Retrieve an account by its ID.\n\n**Path Parameter**\n| Name | Type   | Description          |\n|------|--------|----------------------|\n| _id  | string | Account identifier  |\n\n**Example `curl`**\n```\ncurl -X GET \"https://api.example.com/api/accounts/123\"\n-H \"Accept: application/json\"\n```\n\n### 3. Get All Cars for an Account\n**GET** `/api/accounts/{id}/cars`\n**Description:** Retrieve all cars for a specific account.\n\n**Path Parameter**\n| Name | Type   | Description          |\n|------|--------|----------------------|\n| id   | string | Account identifier  |\n\n**Example `curl`**\n```\ncurl -X GET \"https://api.example.com/api/accounts/123/cars\"\n-H \"Accept: application/json\"\n```\n\n### 4. Get a Specific Car for an Account\n**GET** `/api/accounts/{id}/cars/{_id}`\n**Description:** Retrieve a specific car for a specific account.\n\n**Path Parameters**\n| Name | Type   | Description          |\n|------|--------|----------------------|\n| id   | string | Account identifier   |\n| _id  | string | Car identifier       |\n\n**Example `curl`**\n```\ncurl -X GET \"https://api.example.com/api/accounts/123/cars/456\"\n-H \"Accept: application/json\"\n```\n\n### 5. Get All Cars\n**GET** `/api/cars`\n**Description:** Retrieve all cars.\n\n**Example `curl`**\n```\ncurl -X GET \"https://api.example.com/api/cars\"\n-H \"Accept: application/json\"\n```\n\n### 6. Get Car by ID\n**GET** `/api/cars/{_id}`\n**Description:** Retrieve a car by its ID.\n\n**Path Parameter**\n| Name | Type   | Description       |\n|------|--------|--------------------|\n| _id  | string | Car identifier    |\n\n**Example `curl`**\n```\ncurl -X GET \"https://api.example.com/api/cars/456\"\n-H \"Accept: application/json\"\n```\n\n### 7. Get Root\n**GET** `/`\n**Description:** Root endpoint that returns a welcome message.\n\n**Example `curl`**\n```\ncurl -X GET \"https://api.example.com/\"\n-H \"Accept: application/json\"\n```\n\n### 8. Get Health\n**GET** `/health`\n**Description:** Health check endpoint that returns system health information.\n\n**Example `curl`**\n```\ncurl -X GET \"https://api.example.com/health\"\n-H \"Accept: application/json\"\n```\n\n### 9. Swagger UI\n**GET** `/api-docs-ui`\n**Description:** Serves Swagger UI for API documentation.\n\n**Example `curl`**\n```\ncurl -X GET \"https://api.example.com/api-docs-ui\"\n-H \"Accept: application/json\"\n```\n\n### 10. Swagger JSON\n**GET** `/api-docs`\n**Description:** Serves Swagger JSON documentation.\n\n**Example `curl`**\n```\ncurl -X GET \"https://api.example.com/api-docs\"\n-H \"Accept: application/json\"\n```\n\n---\n\n## Models\n\n### Account\n> Model representing user information\n\n| Field    | Type   | Description                          |\n|----------|--------|--------------------------------------|\n| _id      | string | Unique identifier                    |\n| name     | object | User's full name                     |\n|          |        |                                      |\n|          | first  | string | First name                          |\n|          | last   | string | Last name                           |\n| email    | string | User's email address                 |\n| phone    | string | User's phone number                  |\n| address  | string | User's physical address             |\n\n### Car\n> Model representing vehicle information\n\n| Field               | Type   | Description                          |\n|---------------------|--------|--------------------------------------|\n| _id                 | number | Unique identifier                    |\n| Name                | string | Car model name                      |\n| Miles_per_Gallon    | number | Fuel efficiency                     |\n| Cylinders           | number | Number of cylinders                  |\n| Displacement        | number | Engine displacement                 |\n| Horsepower          | number | Engine horsepower                    |\n| Weight_in_lbs       | number | Vehicle weight                       |\n| Acceleration        | number | Acceleration time                   |\n| Year                | string | Manufacturing year                  |\n| Origin              | string | Country of origin                   |\n\n### AccountCar\n> Join model representing relationship between accounts and cars\n\n| Field       | Type   | Description                          |\n|-------------|--------|--------------------------------------|\n| _id         | number | Unique identifier                    |\n| Account_id  | number | Reference to Account                 |\n| Car_id      | number | Reference to Car                     |\n\n### Config\n> Configuration object for the application\n\n| Field       | Type   | Description                          |\n|-------------|--------|--------------------------------------|\n| https       | object | HTTPS configuration                  |\n|             |        |                                      |\n|             | key    | string | HTTPS private key                   |\n|             | cert   | string | HTTPS certificate                   |\n| port        | number | HTTP server port                     |\n| isHttps     | boolean| Flag indicating if HTTPS should be enabled |\n| serviceName | string | Name of the service                  |\n\n---\n\n## Services\n\n### buildConfig\n**Signature:** `buildConfig(argv)`\n**Description:** Builds configuration object from command line arguments\n\n**Inputs**\n| Name | Type   | Description                          |\n|------|--------|--------------------------------------|\n| argv | Object | Command line arguments               |\n\n**Outputs**\n| Name   | Type   | Description                          |\n|--------|--------|--------------------------------------|\n| config | Object | Configuration object                |\n\n**Calls**\n- `isHttps`\n- `loadCertificateFiles`\n\n### isHttps\n**Signature:** `isHttps(config)`\n**Description:** Checks if HTTPS configuration is provided\n\n**Inputs**\n| Name   | Type   | Description                          |\n|--------|--------|--------------------------------------|\n| config | Object | Configuration object                |\n\n**Outputs**\n| Name   | Type    | Description                          |\n|--------|---------|--------------------------------------|\n| isHttps| boolean | True if HTTPS configuration is provided |\n\n**Calls**\n- None\n\n### loadCertificateFiles\n**Signature:** `loadCertificateFiles(config)`\n**Description:** Loads certificate files for HTTPS configuration\n\n**Inputs**\n| Name   | Type   | Description                          |\n|--------|--------|--------------------------------------|\n| config | Object | Configuration object                |\n\n**Outputs**\n| Name   | Type   | Description                          |\n|--------|--------|--------------------------------------|\n| config | Object | Updated configuration object with certificate files |\n\n**Calls**\n- None\n\n### validateParams\n**Signature:** `validateParams(argv)`\n**Description:** Validates command line arguments\n\n**Inputs**\n| Name | Type   | Description                          |\n|------|--------|--------------------------------------|\n| argv | Object | Command line arguments               |\n\n**Outputs**\n| Name   | Type    | Description                          |\n|--------|---------|--------------------------------------|\n| isValid| boolean | True if arguments are valid         |\n\n**Calls**\n- None\n\n### setUpParams\n**Signature:** `setUpParams()`\n**Description:** Sets up command line parameters using yargs\n\n**Inputs**\n- None\n\n**Outputs**\n| Name | Type   | Description                          |\n|------|--------|--------------------------------------|\n| argv | Object | Parsed command line arguments       |\n\n**Calls**\n- `validateParams`\n\n### buildConfigFromParams\n**Signature:** `buildConfigFromParams()`\n**Description:** Builds configuration from command line parameters\n\n**Inputs**\n- None\n\n**Outputs**\n| Name   | Type   | Description                          |\n|--------|--------|--------------------------------------|\n| config | Object | Configuration object                |\n\n**Calls**\n- `setUpParams`\n- `buildConfig`\n\n---\n\n## Controllers\n\n### accountsCarsController\n**Description:** Controller for handling car-related operations for accounts\n\n### Methods\n\n#### getAll\n**Signature:** `getAll(req, res)`\n**Description:** Handler for retrieving all cars for an account\n\n**Inputs**\n| Name | Type     | Description                          |\n|------|----------|--------------------------------------|\n| req  | Request  | Express request object              |\n| res  | Response | Express response object             |\n\n**Outputs**\n- None\n\n#### get\n**Signature:** `get(req, res)`\n**Description:** Handler for retrieving a specific car for an account\n\n**Inputs**\n| Name | Type     | Description                          |\n|------|----------|--------------------------------------|\n| req  | Request  | Express request object              |\n| res  | Response | Express response object             |\n\n**Outputs**\n- None\n\n---\n\nThis documentation provides a comprehensive overview of the Car Management API, including all endpoints, models, services, and controllers. If you have any questions or need further clarification, please don't hesitate to ask."


// ---------------------------------------------
// Main Page Component
// ---------------------------------------------
function HomePage({ defaultWait = 200 }) {
  // Core state
  const [repo, setRepo] = useState("");
  const [repoName, setRepoName] = useState(""); // returned by /analyze-repo
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");

  // Flow control
  const [responseType, setResponseType] = useState(""); // "", "language_choice", "markdown"
  const [choiceLocked, setChoiceLocked] = useState(false);
  const [waiting, setWaiting] = useState(false);

  // Timer
  const [timer, setTimer] = useState(defaultWait);
  const intervalRef = useRef(null);

  // Final markdown
  const [apiDoc, setApiDoc] = useState(null);

  // -------------------------------------------
  // 1. Handle repo submission (/analyze-repo)
  // -------------------------------------------
  const submitRepo = async (e) => {
    e.preventDefault();

    if (!repo.trim()) {
      toast.error("Please enter a valid repository URL."); // early guard
      return;
    }

    try {
      toast.dismiss();
      toast.loading("Analyzing repo…", { id: "analyze" });

      const base = import.meta.env.VITE_API_BASE_URL;
      const { data } = await axios.post(`${base}/analyze-repo`, {
        repo_url: repo.trim(),
      });

      toast.dismiss("analyze");

      // Error from server
      if (data.responseType === "error" || data.status !== "true") {
        toast.error(data.message || "Failed to analyze repository.");
        return;
      }

      // Success: language selection
      if (data.responseType === "language_choice") {
        setRepoName(data.repo_name || "");
        setLanguages(data.data || {});
        setSelectedLang("");
        setResponseType("language_choice");
        setApiDoc(null);
      } else {
        toast.error("Unexpected server response.");
      }
    } catch (err) {
      toast.dismiss("analyze");
      toast.error(
        err?.response?.data?.message ??
          err.message ??
          "An error occurred while analyzing the repository."
      );
    }
  };

  // -------------------------------------------
  // 2. Handle language choice (/generate-doc)
  // -------------------------------------------
  const submitLanguageChoice = async () => {
    if (!selectedLang) return;

    setChoiceLocked(true);
    setWaiting(true);
    // startTimer(defaultWait);
    startTimer(parseInt(languages[selectedLang], 10) * 6 + 60);

    try {
      const base = import.meta.env.VITE_API_BASE_URL;
      const { data } = await axios.post(`${base}/generate-doc`, {
        repo_name: repoName,
        language: selectedLang,
      });

      // Stop spinner & timer
      stopTimer();
      setWaiting(false);

      if (data.responseType === "markdown" && data.status === "true") {
        setApiDoc(data.data);
        setResponseType("markdown");
      } else {
        toast.error(data.message || "Failed to generate documentation.");
        resetAfterFailure();
      }
    } catch (err) {
      stopTimer();
      setWaiting(false);
      toast.error(
        err?.response?.data?.message ??
          err.message ??
          "An error occurred while generating documentation."
      );
      resetAfterFailure();
    }
  };

  // -------------------------------------------
  // Timer helpers
  // -------------------------------------------
  const startTimer = (seconds) => {
    setTimer(seconds);
    intervalRef.current = setInterval(
      () => setTimer((s) => (s > 0 ? s - 1 : 0)),
      1_000
    );
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Stop spinner when timer finishes but no data yet
  useEffect(() => {
    if (waiting && timer === 0) {
      stopTimer();
      setWaiting(false);
      toast.error(
        "The request timed out. We are using a free version - you can either wait for 30 more seconds or just retry by reloading the page"
      );
      resetAfterFailure();
    }
  }, [timer, waiting]);

  // Cleanup on unmount
  useEffect(() => () => stopTimer(), []);

  // -------------------------------------------
  // Reset helper
  // -------------------------------------------
  const resetAfterFailure = () => {
    setChoiceLocked(false);
    setResponseType("language_choice");
    setApiDoc(null);
  };

  // -------------------------------------------
  // Render
  // -------------------------------------------
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col">
      {/* Toast container (can also be in App.jsx) */}
      <Toaster position="top-center" />

      {/* Header */}
<header className="w-full px-6 py-5 bg-zinc-950 flex items-center justify-between border-b border-zinc-800 shadow">
  <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-fuchsia-500 text-transparent bg-clip-text">
    Repo Reaper
  </h1>
  <div className="flex gap-6 items-center">
    <a
      href="mailto:sahillohan07@gmail.com"
      className="text-zinc-400 hover:text-fuchsia-400 transition text-sm"
    >
      video demo
    </a>
    <a
      href="mailto:support@reporeaper.com"
      className="text-zinc-400 hover:text-fuchsia-400 transition text-sm"
    >
      Support
    </a>
  </div>
</header>


      {/* Body */}
      <main className="flex flex-1 flex-col items-center justify-center pb-10">
        {/* Repo Input */}
        <form
          onSubmit={submitRepo}
          className="bg-zinc-800 rounded-2xl shadow-xl px-8 py-10 flex flex-col md:flex-row items-center gap-4 w-full max-w-xl"
        >
          <input
            type="text"
            placeholder="Paste your repository link here"
            className="flex-1 py-3 px-4 rounded-lg bg-zinc-900 text-zinc-100 placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            disabled={responseType === "language_choice"}
          />
          <button
            type="submit"
            disabled={responseType === "language_choice"}
            className="ml-0 md:ml-4 h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500
                       text-white flex items-center justify-center text-2xl hover:scale-105 hover:shadow-lg
                       disabled:opacity-50 transition"
            aria-label="Submit repository"
          >
            <FiArrowRight />
          </button>
        </form>

        {/* Language selection */}
        {responseType === "language_choice" && (
          <LanguageChoice
            languages={languages}
            value={selectedLang}
            onChange={setSelectedLang}
            onNext={submitLanguageChoice}
            locked={choiceLocked}
          />
        )}

        {/* Spinner & timer */}
        {waiting && (
  <div className="flex flex-col items-center mt-12 max-w-md w-full mx-auto px-4">
    <div className="flex items-center gap-3 mb-2">
      <Spinner />
      <span className="text-fuchsia-300 text-lg">
        Repo Reaper is working…
      </span>
    </div>
    <span className="text-zinc-400 text-sm">
      Expected wait:{" "}
      <span className="text-fuchsia-400 font-mono">{timer}s</span>
    </span>
    <span className="text-zinc-500 text-xs mt-1 italic">
      (It may finish sooner if the API is faster!)
    </span>
    <span className="text-zinc-400 text-xs mt-2 text-center">
      This repository has <span className="font-bold text-fuchsia-300">{languages[selectedLang]}</span> files to analyze.
      Each file may take more than <span className="font-bold text-fuchsia-300">4 seconds</span> to process.
      After reading all files, the system summarizes and generates documentation. Please be patient—even if the timer ends, generation will continue working in the background and you'll get your result if you wait!
    </span>
  </div>
)}

        {/* {waiting && (
          <div className="flex flex-col items-center mt-12">
            <div className="flex items-center gap-3 mb-2">
              <Spinner />
              <span className="text-fuchsia-300 text-lg">
                Repo Reaper is working…
              </span>
            </div>
            <span className="text-zinc-400 text-sm">
              Expected wait:{" "}
              <span className="text-fuchsia-400 font-mono">{timer}s</span>
            </span>
            <span className="text-zinc-500 text-xs mt-1 italic">
              (It may finish sooner if the API is faster!)
            </span>
                <span className="text-zinc-400 text-xs mt-2">
      This repository has <span className="font-bold text-fuchsia-300">{languages[selectedLang]}</span> files to analyze.
      Each file may take more than <span className="font-bold text-fuchsia-300">4 seconds</span> to process.
      After reading all files, the system summarizes and generates documentation. Please be patient—even if the timer ends, generation will continue working in the background and you'll get your result if you wait!
    </span>
          </div>
        )} */}

        {/* Markdown output */}
        {apiDoc && <MarkdownDoc source={apiDoc} />}


{/* <MarkdownViewer markdown={markdownContent} /> */}
      </main>
    </div>
  );
}

export default HomePage;
