window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calculateButton").addEventListener("click", calculateGPA);
  });
  
  function gradeToGPV(grade) {
    switch (grade) {
      case "A+":
      case "A":
        return 4.0;
      case "A-":
        return 3.70;
      case "B+":
        return 3.30;
      case "B":
        return 3.00;
      case "B-":
        return 2.70;
      case "C+":
        return 2.30;
      case "C":
        return 2.00;
      case "C-":
        return 1.70;
      case "D":
        return 1.00;
      case "E":
        return 0.00;
      default:
        return null;
    }
  }
  
  function calculateGPA() {
    // Process only rows that have the "course" class
    const courseRows = document.querySelectorAll("#coursesTable tbody tr.course");
    let totalPoints = 0;
    let totalCredits = 0;
    
    courseRows.forEach(row => {
      const cells = row.getElementsByTagName("td");
      const credits = parseFloat(cells[2].textContent.trim());
      const grade = cells[3].getElementsByTagName("select")[0].value;
      const gpv = gradeToGPV(grade);
      if (gpv !== null) {
        totalPoints += (gpv * credits);
        totalCredits += credits;
      }
    });
  
    let currentGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
  
    // For demonstration, assume the full 4-year program equals 120 credits.
    // Calculate total possible credits from course rows.
    let totalPossibleCredits = 0;
    courseRows.forEach(row => {
      const cells = row.getElementsByTagName("td");
      const credits = parseFloat(cells[2].textContent.trim());
      totalPossibleCredits += credits;
    });
    const totalProgramCredits = 120; // Update as needed for your curriculum
    const upcomingCredits = totalProgramCredits - totalPossibleCredits;
  
    // Calculate the average GPA required in upcoming courses for an overall 3.0 GPA.
    const neededPoints = 3.0 * (totalCredits + upcomingCredits) - totalPoints;
    let neededAvgGP = upcomingCredits > 0 ? neededPoints / upcomingCredits : 0;
  
    let msg = "Your current GPA (from the courses entered) is: " + currentGPA.toFixed(2) + "<br/>";
  
    if (neededAvgGP <= 0) {
      msg += "You are already at or above a 3.0 GPA (or there are no remaining credits).";
    } else if (neededAvgGP > 4.0) {
      msg += "To reach a final GPA of 3.0, you would need an average GPA of " + neededAvgGP.toFixed(2) +
             " in upcoming credits, which is above 4.0. This is not possible.";
    } else {
      msg += "To reach a final GPA of 3.0, you need an average GPA of at least " + neededAvgGP.toFixed(2) +
             " in the remaining " + upcomingCredits + " credits.";
      msg += "<br/>In letter grade terms, that's roughly <strong>" + gpvToLetter(neededAvgGP) + "</strong> or above.";
    }
  
    document.getElementById("results").innerHTML = msg;
  }
  
  function gpvToLetter(gpv) {
    // Approximate mapping from GPA value to a letter grade requirement.
    if (gpv >= 3.85) return "A or A+";
    else if (gpv >= 3.70) return "A-";
    else if (gpv >= 3.30) return "B+";
    else if (gpv >= 3.00) return "B";
    else if (gpv >= 2.70) return "B-";
    else if (gpv >= 2.30) return "C+";
    else if (gpv >= 2.00) return "C";
    else if (gpv >= 1.70) return "C-";
    else if (gpv >= 1.00) return "D";
    else return "E";
  }
  