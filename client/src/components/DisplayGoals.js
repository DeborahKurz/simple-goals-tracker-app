function DisplayGoals({ userGoals }) {
  console.log("Display Goals: ", userGoals);

  // Add a conditional check to handle undefined or null userGoals
  if (!userGoals) {
    return <div>Loading...</div>; // or handle as appropriate for your application
  }

  return (
    <div>
      <h2>Click on a goal to see its tasks.</h2>
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