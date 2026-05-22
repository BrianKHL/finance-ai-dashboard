import "./AIInsightsModal.css";

function AIInsightsModal({ isOpen, onClose }) {

  const handleQuestionClick = (question) => {
    alert(`AI Question Selected:\n\n${question}`);
  };

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
              handleQuestionClick(
                "Where am I spending the most money?"
              )
            }
          >
            Where am I spending the most money?
          </button>

          <button
            onClick={() =>
              handleQuestionClick(
                "What category should I reduce?"
              )
            }
          >
            What category should I reduce?
          </button>

          <button
            onClick={() =>
              handleQuestionClick(
                "Is my spending healthy?"
              )
            }
          >
            Is my spending healthy?
          </button>

          <button
            onClick={() =>
              handleQuestionClick(
                "What spending habits do you notice?"
              )
            }
          >
            What spending habits do you notice?
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIInsightsModal;