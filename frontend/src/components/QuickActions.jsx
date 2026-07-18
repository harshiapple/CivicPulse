import {
    FaPlusCircle,
    FaClipboardList,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function QuickActions() {

    const navigate = useNavigate();

    return (

        <div className="quick-actions">

            <h2>Quick Actions</h2>

            <div className="action-buttons">

                <button
                    onClick={() =>
                        navigate("/workspace/report")
                    }
                >

                    <FaPlusCircle />

                    Report Issue

                </button>

                <button
                    onClick={() =>
                        navigate("/workspace/reports")
                    }
                >

                    <FaClipboardList />

                    My Reports

                </button>

            </div>

        </div>

    );

}

export default QuickActions;