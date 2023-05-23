import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  async function addMeetupHandler(enterMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enterMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetup;
