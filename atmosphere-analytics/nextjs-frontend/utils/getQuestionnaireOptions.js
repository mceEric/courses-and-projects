export function getQuestionnaireOptions() {
  return [
    {
      label: "ACT",
      value: [
        {
          question:
            "During the last 4 weeks, how much of the time has your asthma kept you from getting as much done at work, school or home?",
          answers: [
            "All of the time",
            "Most of the time",
            "Some of the time",
            "A little of the time",
            "None of the time",
          ],
        },
        {
          question:
            "During the last 4 weeks, how often have you had shortness of breath?",
          answers: [
            "More than once a day",
            "Once a day",
            "3 to 6 times a week",
            "Once or twice a week",
            "Not at all",
          ],
        },
        {
          question:
            "During the last 4 weeks, how often have your asthma symptoms (wheezing, coughing, shortness of breath, chest tightness or pain) woken you up at night or earlier than usual in the morning?",
          answers: [
            "4 or more nights a week",
            "2 to 3 nights a week",
            "Once a week",
            "Once or Twice",
            "Not at all",
          ],
        },
        {
          question:
            "During the last 4 weeks, how often have you used your rescue inhaler or nebuliser medication (such as Salbutamol)?",
          answers: [
            "3 or more times per day",
            "Once or twice per day",
            "2 or 3 times per week",
            "Once a week or less",
            "Not at all",
          ],
        },
        {
          question:
            "How would you rate your asthma control during the last 4 weeks?",
          answers: [
            "Not Controlled at all",
            "Poorly Controlled",
            "Somewhat Controlled",
            "Well Controlled",
            "None of the time",
          ],
        },
      ],
    },
    {
      label: "ACQ",
      value: [
        {
          question:
            "On average, during the past two weeks, how often were you woken by your asthma during the night?",
          answers: [
            "Unable to sleep because of asthma",
            "A great many times",
            "Many times",
            "Several times",
            "A few times",
            "Hardly ever",
            "Never",
          ],
        },
        {
          question:
            "On average, during the past two weeks, how bad were your asthma symptoms when you woke up in the morning?",
          answers: [
            "Very severe symptoms",
            "Severe symptoms",
            "Quite severe symptoms",
            "Moderate symptoms",
            "Mild symptoms",
            "Very mild symptoms",
            "No symptoms",
          ],
        },
        {
          question:
            "In general, during the past two weeks, how limited were you in your activities because of your asthma?",
          answers: [
            "Totally limited",
            "Extremely limited",
            "Very limited",
            "Moderately limited",
            "Slightly limited",
            "Very slightly limited",
            "Not limited at all",
          ],
        },
        {
          question:
            "In general, during the past two weeks, how much shortness of breath did you experience because of your asthma?",
          answers: [
            "A very great deal",
            "A great deal",
            "Quite a lot",
            "A moderate amount",
            "A little",
            "A very little",
            "None",
          ],
        },
        {
          question:
            "In general, during the past two weeks, how much of the time did you wheeze?",
          answers: [
            "All the time",
            "Most of the time",
            "A lot of the time",
            "A moderate amount of the time",
            "A little of the time",
            "Hardly any of the time",
            "Not at all",
          ],
        },
        {
          question:
            "On average, during the past two weeks, how many puffs of short-acting bronchodilator have you used each day?",
          answers: [
            "More than 16 puffs most days",
            "13-16 puffs most days",
            "9-12 puffs most days",
            "5-8 puffs most days",
            "3-4 puffs most days",
            "1-2 puffs most days",
            "None",
          ],
        },
      ],
    },
    {
      label: "AQLQ",
      value: [
        {
          question:
            "STRENUOUS ACTIVITIES (such as hurrying, exercising, running upstairs, sports)",
          answers: [
            "Totally Limited",
            "Extremely Limited",
            "Very Limited",
            "Moderately Limited",
            "Some Limitation",
            "A little Limitation",
            "Not at all Limited",
          ],
        },
        {
          question:
            "MODERATE ACTIVITIES(such as walking, housework, gardening, shopping,climbing stairs)",
          answers: [
            "Totally Limited",
            "Extremely Limited",
            "Very Limited",
            "Moderately Limited",
            "Some Limitation",
            "A little Limitation",
            "Not at all Limited",
          ],
        },
        {
          question:
            "SOCIAL ACTIVITIES (such as talking, playing with pets/children, visiting friends relatives)",
          answers: [
            "Totally Limited",
            "Extremely Limited",
            "Very Limited",
            "Moderately Limited",
            "Some Limitation",
            "A little Limitation",
            "Not at all Limited",
          ],
        },
        {
          question:
            "WORK RELATED ACTIVITES (tasks you have to do at work) *if you are not employed or selfemployed, these should be task",
          answers: [
            "Totally Limited",
            "Extremely Limited",
            "Very Limited",
            "Moderately Limited",
            "Some Limitation",
            "A little Limitation",
            "Not at all Limited",
          ],
        },
        {
          question: "SLEEPING",
          answers: [
            "Totally Limited",
            "Extremely Limited",
            "Very Limited",
            "Moderately Limited",
            "Some Limitation",
            "A little Limitation",
            "Not at all Limited",
          ],
        },
      ],
    },
  ];
}
