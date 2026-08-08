import { useEffect, useState } from "react";
import { FaRobot, FaLightbulb, FaRedo } from "react-icons/fa";

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

      /*
        Our axios instance returns the normal Axios response.

        Expected backend response:

        {
          success: true,
          summary: {...},
          insights: [...]
        }
      */

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
    <section className="w-full bg-[#1b2027] border border-[#2b313a] rounded-2xl overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 p-5 border-b border-[#2b313a]">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 shrink-0 rounded-xl bg-[#4b91e2] flex items-center justify-center text-white shadow-lg">

            <FaRobot className="text-xl" />

          </div>

          <div>

            <h2 className="text-xl font-semibold text-[#f5f5f2]">
              AI Financial Insights
            </h2>

            <p className="text-sm text-[#7f8997] mt-1">
              Personalized insights based on your finances
            </p>

          </div>

        </div>

        {!loading && (
          <button
            onClick={fetchInsights}
            className="
              shrink-0
              w-9
              h-9
              rounded-lg
              bg-[#252b33]
              hover:bg-[#303741]
              text-[#8fa0b5]
              hover:text-white
              flex
              items-center
              justify-center
              transition
            "
            title="Refresh insights"
          >
            <FaRedo className="text-sm" />
          </button>
        )}

      </div>

      {/* LOADING */}
      {loading && (
        <div className="p-8 flex flex-col items-center justify-center">

          <div className="w-8 h-8 border-2 border-[#4b91e2] border-t-transparent rounded-full animate-spin mb-4" />

          <p className="text-sm text-[#7f8997]">
            Generating your financial insights...
          </p>

        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="p-5">

          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4">

            <p className="text-sm text-red-400">
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
                bg-[#252b33]
                hover:bg-[#303741]
                text-sm
                text-white
                transition
              "
            >
              <FaRedo className="text-xs" />
              Try Again
            </button>

          </div>

        </div>
      )}

      {/* INSIGHTS */}
      {!loading && !error && insights.length > 0 && (
        <div className="p-5 space-y-3">

          {insights.map((insight, index) => (

            <div
              key={index}
              className="
                flex
                items-start
                gap-4
                p-4
                rounded-xl
                bg-[#15191e]
                border
                border-[#292f37]
                hover:border-[#3b4654]
                transition
              "
            >

              <div className="
                shrink-0
                w-9
                h-9
                rounded-lg
                bg-[#4b91e2]
                flex
                items-center
                justify-center
                text-white
                font-semibold
                text-sm
              ">
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">

                <div className="flex items-start gap-3">

                  <FaLightbulb className="text-[#6ea8ed] mt-1 shrink-0" />

                  <p className="text-sm leading-6 text-[#e5e7eb]">
                    {typeof insight === "string"
                      ? insight
                      : insight?.message ||
                        insight?.text ||
                        insight?.insight ||
                        JSON.stringify(insight)}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* NO INSIGHTS */}
      {!loading && !error && insights.length === 0 && (
        <div className="p-8 text-center">

          <FaRobot className="mx-auto text-3xl text-[#4b91e2] mb-3" />

          <p className="text-sm text-[#7f8997]">
            No AI insights are available yet.
          </p>

          <button
            onClick={fetchInsights}
            className="
              mt-4
              px-4
              py-2
              rounded-lg
              bg-[#4b91e2]
              hover:bg-[#3f82cf]
              text-white
              text-sm
              font-medium
              transition
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