function DisplayGoals({ userGoals }) {
  return (
    <div>
      {userGoals.map((goal) => (
        <div>
          <li key={goal.id}>{goal.goal}</li>
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default DisplayGoals