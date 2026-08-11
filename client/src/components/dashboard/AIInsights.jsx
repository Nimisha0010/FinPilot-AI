import { useEffect, useState } from "react";
import {
  FaRobot,
  FaLightbulb,
  FaRedo,
} from "react-icons/fa";

import API from "../../api/axios";

function AllInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/ai/insights");

      console.log("AI Insights Response:", response);

      const data = response?.data || response;

      if (data?.success === false) {
        throw new Error(
          data?.message || "Unable to generate AI insights"
        );
      }

      const receivedInsights = Array.isArray(data?.insights)
        ? data.insights
        : [];

      setInsights(receivedInsights);

    } catch (err) {
      console.error("AI Insights Error:", err);

      setInsights([]);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to generate AI insights."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <section
      className="
        w-full
        mt-6
        rounded-2xl
        overflow-hidden
        bg-gradient-to-br
        from-[#172b4d]
        via-[#1b3156]
        to-[#182b49]
        border
        border-[#285a9e]
        shadow-[0_0_25px_rgba(59,130,246,0.08)]
      "
    >

      {/* ================= HEADER ================= */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          p-5
          md:p-6
          border-b
          border-[#31537d]
        "
      >

        <div className="flex items-center gap-4">

          {/* ROBOT ICON */}
          <div
            className="
              w-12
              h-12
              md:w-14
              md:h-14
              shrink-0
              rounded-2xl
              bg-[#29466f]
              border
              border-[#416894]
              flex
              items-center
              justify-center
              text-[#72aef5]
              shadow-[0_0_15px_rgba(59,130,246,0.12)]
            "
          >
            <FaRobot className="text-xl md:text-2xl" />
          </div>

          {/* TITLE */}
          <div>

            <h2
              className="
                text-lg
                md:text-xl
                font-semibold
                text-[#f5f7fb]
              "
            >
              AI Financial Insights
            </h2>

            <p
              className="
                text-xs
                md:text-sm
                text-[#9bb2cf]
                mt-1
              "
            >
              Personalized insights based on your finances
            </p>

          </div>

        </div>


        {/* REFRESH BUTTON */}
        <button
          onClick={fetchInsights}
          disabled={loading}
          title="Refresh AI insights"
          className="
            shrink-0
            w-10
            h-10
            rounded-xl
            bg-[#233e64]
            border
            border-[#3975b9]
            flex
            items-center
            justify-center
            text-[#8ec0ff]
            hover:bg-[#2b4c78]
            hover:text-white
            hover:border-[#5594df]
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <FaRedo
            className={`text-sm ${
              loading ? "animate-spin" : ""
            }`}
          />
        </button>

      </div>


      {/* ================= LOADING ================= */}
      {loading && (
        <div
          className="
            p-10
            flex
            flex-col
            items-center
            justify-center
          "
        >

          <div
            className="
              w-9
              h-9
              border-2
              border-[#355b89]
              border-t-[#65a5f5]
              rounded-full
              animate-spin
              mb-4
            "
          />

          <p className="text-sm text-[#b1c5df]">
            Generating your financial insights...
          </p>

          <p className="text-xs text-[#7894b5] mt-2">
            FinPilot AI is analyzing your financial activity
          </p>

        </div>
      )}


      {/* ================= ERROR ================= */}
      {!loading && error && (
        <div className="p-5 md:p-6">

          <div
            className="
              rounded-xl
              border
              border-red-500/30
              bg-red-500/10
              p-5
            "
          >

            <div className="flex items-start gap-4">

              <div
                className="
                  w-10
                  h-10
                  shrink-0
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
                <FaRobot />
              </div>

              <div>

                <p className="text-sm font-medium text-red-400">
                  Unable to generate insights
                </p>

                <p className="text-xs text-[#9a9fa8] mt-1">
                  {error}
                </p>

                <button
                  onClick={fetchInsights}
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-lg
                    bg-[#253b5c]
                    hover:bg-[#304b70]
                    border
                    border-[#3c6594]
                    text-white
                    text-xs
                    transition
                  "
                >
                  <FaRedo className="text-xs" />
                  Try Again
                </button>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* ================= INSIGHTS ================= */}
      {!loading &&
        !error &&
        insights.length > 0 && (

          <div className="p-5 md:p-6">

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              "
            >

              {insights.map((insight, index) => (

                <div
                  key={index}
                  className="
                    group
                    min-w-0
                    flex
                    items-start
                    gap-4
                    p-5
                    rounded-2xl
                    bg-[#29466f]
                    border
                    border-[#426895]
                    hover:bg-[#31547f]
                    hover:border-[#5590d5]
                    shadow-[0_4px_15px_rgba(0,0,0,0.08)]
                    transition-all
                    duration-200
                  "
                >

                  {/* LIGHTBULB */}
                  <div
                    className="
                      w-11
                      h-11
                      shrink-0
                      rounded-xl
                      bg-[#315b91]
                      border
                      border-[#4b82c2]
                      flex
                      items-center
                      justify-center
                      text-[#8dc3ff]
                      group-hover:bg-[#386aa5]
                      transition
                    "
                  >
                    <FaLightbulb className="text-base" />
                  </div>


                  {/* INSIGHT CONTENT */}
                  <div className="min-w-0 flex-1">

                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.12em]
                        font-medium
                        text-[#91b7df]
                        mb-2
                      "
                    >
                      Insight {index + 1}
                    </p>

                    <p
                      className="
                        text-sm
                        md:text-base
                        leading-6
                        text-[#f0f5fb]
                      "
                    >
                      {typeof insight === "string"
                        ? insight
                        : insight?.message ||
                          insight?.text ||
                          insight?.insight ||
                          JSON.stringify(insight)}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}


      {/* ================= EMPTY STATE ================= */}
      {!loading &&
        !error &&
        insights.length === 0 && (

          <div className="p-10 text-center">

            <div
              className="
                w-14
                h-14
                mx-auto
                rounded-2xl
                bg-[#29466f]
                border
                border-[#426895]
                flex
                items-center
                justify-center
                text-[#72aef5]
                mb-4
              "
            >
              <FaRobot className="text-xl" />
            </div>

            <p className="text-sm text-[#e5edf7]">
              No AI insights are available yet.
            </p>

            <p className="text-xs text-[#91a6c0] mt-2">
              Add some income or expenses and generate your insights.
            </p>

            <button
              onClick={fetchInsights}
              className="
                mt-5
                px-5
                py-2.5
                rounded-xl
                bg-[#4b91e2]
                hover:bg-[#5b9deb]
                text-white
                text-xs
                font-medium
                transition
                shadow-[0_4px_12px_rgba(59,130,246,0.2)]
              "
            >
              Generate Insights
            </button>

          </div>

        )}

    </section>
  );
}

export default AllInsights;