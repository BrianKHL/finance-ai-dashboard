import "./AIInsightsModal.css";

function AIInsightsModal({ isOpen, onClose, onQuestionClick, insight, loading, error }) {

  // If modal closed → render nothing
  if (!isOpen) return null;

  return (

    <div className="modal-overlay">

      <div className="modal-content">

        {/* Modal Header */}
        <div className="modal-header">

          <h2>AI Financial Insights</h2>

          <button
            className="close-button"
            onClick={onClose}
          >
            X
          </button>

        </div>

        {/* Question Buttons */}
        <div className="question-list">

          <button
            onClick={() =>
              onQuestionClick(
                "Where am I spending the most money?"
              )
            }
          >
            Where am I spending the most money?
          </button>

          <button
            onClick={() =>
              onQuestionClick(
                "What category should I reduce?"
              )
            }
          >
            What category should I reduce?
          </button>

          <button
            onClick={() =>
              onQuestionClick(
                "Is my spending healthy?"
              )
            }
          >
            Is my spending healthy?
          </button>

          <button
            onClick={() =>
              onQuestionClick(
                "What spending habits do you notice?"
              )
            }
          >
            What spending habits do you notice?
          </button>

        </div>

        <div className="ai-response-box">
          {loading ? <p>Loading insight...</p> : null}
          {error ? <p className="ai-error">{error}</p> : null}
          {!loading && !error && insight ? <p>{insight}</p> : null}
          {!loading && !error && !insight ? (
            <p>Select a question to get an AI response.</p>
          ) : null}
        </div>

      </div>

    </div>
  );
}

export default AIInsightsModal;
