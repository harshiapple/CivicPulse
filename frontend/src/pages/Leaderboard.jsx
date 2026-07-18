import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboardService";
import "../styles/leaderboard.css";



function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadLeaderboard() {
      const data = await getLeaderboard();
      setUsers(data);
 
    }

    loadLeaderboard();
  }, []);

if (!users.length) {

    return <h2>Loading Leaderboard...</h2>;

}

  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  const currentUser = users[0];

  const progress =
  currentUser.badge === "Gold"
    ? 100
    : currentUser.badge === "Silver"
      ? ((100 - currentUser.pointsToNextBadge) / 100) * 100
      : ((50 - currentUser.pointsToNextBadge) / 50) * 100;

  return (
    <div className="leaderboard-page">

      <h1>🏆 CivicPulse Leaderboard</h1>

      <p>Top citizens making a difference.</p>

     <div className="podium">

    {topThree[1] && (
        <div className="podium-card second">
            <div className="medal">🥈</div>

            <h2>{topThree[1].name}</h2>

            <p>⭐ {topThree[1].points} Points</p>

            <span className={`badge ${topThree[1].badge.toLowerCase()}`}>
                {topThree[1].badge}
            </span>
        </div>
    )}

    {topThree[0] && (
        <div className="podium-card first">
            <div className="medal">🥇</div>

            <h2>{topThree[0].name}</h2>

            <p>⭐ {topThree[0].points} Points</p>

            <span className={`badge ${topThree[0].badge.toLowerCase()}`}>
                {topThree[0].badge}
            </span>
        </div>
    )}

    {topThree[2] && (
        <div className="podium-card third">
            <div className="medal">🥉</div>

            <h2>{topThree[2].name}</h2>

            <p>⭐ {topThree[2].points} Points</p>

            <span className={`badge ${topThree[2].badge.toLowerCase()}`}>
                {topThree[2].badge}
            </span>
        </div>
    )}

</div>

      <div className="reward-card">

    <h2>🎁 Rewards</h2>

      <p>
          🏅 Current Badge:
          <strong> {currentUser.badge}</strong>
      </p>

      <p>
          ⭐ Total Points:
          <strong> {currentUser.points}</strong>
      </p>

    <progress
        value={progress}
        max="100"
    />
    <p>{Math.round(progress)}% Complete</p>

    <p>

        {currentUser.pointsToNextBadge===0
        ? "Maximum Badge Achieved 🎉"
        : `${currentUser.pointsToNextBadge} points to ${currentUser.nextBadge}`}

    </p>

</div>
    <div className="achievement-grid">

<div className="achievement-card">
📝 +10 pts for Reporting
</div>

<div className="achievement-card">
👍 +2 pts for Supporting
</div>

<div className="achievement-card">
🥉 Bronze : 0+
</div>

<div className="achievement-card">
🥈 Silver : 50+
</div>

<div className="achievement-card">
🥇 Gold : 100+
</div>

<div className="reward-note">

    <h3>How to Earn Points?</h3>

    <ul>
        <li>📝 Report a complaint → +10 points</li>
        <li>👍 Support an existing complaint → +2 points</li>
        <li>🏅 Earn badges as your points increase.</li>
    </ul>

</div>
</div>
{others.length > 0 && (
<>
    <h2 className="others-title">
        Other Citizens
    </h2>
      <div className="leaderboard-list">

        {others.map((user, index) => (

          <div
            className="leader-card"
            key={user.id}
          >

            <div className="rank">
              #{index + 4}
            </div>

            <div className="info">

              <h2>{user.name}</h2>

              <p>{user.reports} Reports</p>

            </div>

            <div className="points">

              <h2>{user.points}</h2>

              <span className={`badge ${user.badge.toLowerCase()}`}>
                {user.badge}
              </span>

            </div>

          </div>
        

        ))}

      </div>

</>
)}
    </div>

  );
}

export default Leaderboard;